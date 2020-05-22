'use strict';
const utils = require('@iobroker/adapter-core');
const https = require('https');
const xml2js = require('xml2js');
const opt = require('./lib/currencies.js');
let adapter, interval = null;
let lang = 'ru';

const source = [
    {name: 'CBR', parser: parseCBR, url: 'www.cbr-xml-daily.ru/daily_json.js'},
    {name: 'ECB', parser: parseECB, url: 'www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'},
    {name: 'POL', parser: parsePOL, url: 'www.poloniex.com/public?command=returnTicker'}
];

function startAdapter(options){
    return adapter = utils.adapter(Object.assign({}, options, {
        name:         'exchangerates',
        systemConfig: true,
        ready:        main,
        unload:       (callback) => {
            clearInterval(interval);
            try {
                adapter.log.info('cleaned everything up...');
                callback();
            } catch (e) {
                callback();
            }
        },
        message:      obj => {
            if (typeof obj === 'object' && obj.command){
                adapter.log.debug(`message ******* ${JSON.stringify(obj)}`);
                if (obj.command === 'getOptions'){
                    obj.callback && adapter.sendTo(obj.from, obj.command, opt.currencies, obj.callback);
                }
                if (obj.command === 'delObject'){
                    delObjects(obj.message, function (){
                        obj.callback && adapter.sendTo(obj.from, obj.command, {}, obj.callback);
                    });
                }
            } else {
                adapter.log.debug(`message x ${obj.command}`);
            }
        }
    }));
}

function setStates(obj){
    adapter.getObject(obj.name, function (err, state){
        //adapter.log.error('getState - ' + obj.name + ' err = ' + JSON.stringify(err) + ' state = ' + JSON.stringify(state));
        if (err || !state){
            let type = 'number';
            if (obj.name === 'Date') type = 'string';
            adapter.setObject(obj.name, {
                type:   'state',
                common: {
                    name:  obj.desc,
                    desc:  obj.desc,
                    type:  type,
                    role:  'state',
                    read:  true,
                    write: false
                },
                native: {}
            });
            adapter.setState(obj.name, {val: obj.val, ack: true});
        } else {
            //adapter.log.error('state.val = ' + state.val + ' / val = ' + obj.val);
            if (state.val !== obj.val){
                adapter.setState(obj.name, {val: obj.val, ack: true});
            }
        }
    });
}

function setDev(obj, cb){
    const ch = obj.name.split('.');
    let icon = 'img/' + ch[1] + '.png';
    if (~ch[1].indexOf('_')) icon = 'img/' + ch[1].substring(ch[1].indexOf('_') + 1, ch[1].length) + '.png';

    adapter.setObjectNotExists(ch[0], {
        type:   'device',
        common: {name: '', type: 'state'/*, icon: icon*/},
        native: {/*id: obj.code*/}
    }, () => {
        adapter.setObjectNotExists(obj.name, {
            type:   'channel',
            common: {name: obj.desc, type: 'state', icon: icon},
            native: {id: obj.code}
        }, () => {
            adapter.extendObject(obj.name, {common: {name: obj.desc, type: 'state', icon: icon}});
            cb && cb();
        });
    });
}

function delObjects(obj, cb){
    let count = 0;
    Object.keys(obj).forEach(key => {
        const srcNum = key.substring(0, key.indexOf('_'));
        const cur = key.substring(key.indexOf('_') + 1, key.length);
        //adapter.log.error('isFinite(srcNum) - ' +  isFinite(srcNum));

        if (!obj[key] && isFinite(srcNum)){
            const src = source[srcNum].name;
            count++;
            adapter.log.error('src - ' + src + ' cur - ' + cur);
            adapter.delState(src + '.' + cur + '.Current', () =>
                adapter.delState(src + '.' + cur + '.Previous', () =>
                    adapter.delState(src + '.' + cur + '.Difference', () =>
                        adapter.delState(src + '.' + cur + '.percentChange', () =>
                            // Delete channel
                            adapter.delObject(src + '.' + cur, () => !--count && cb && cb())))));
        }
    });
    !count && cb && cb();
}

function parseCBR(body){
    adapter.log.debug('parseCBR');
    try {
        let obj = JSON.parse(body);
        if (!obj.Valute.USD.Value || !obj.Valute.EUR.Value){
            adapter.log.error('parseCBR Error data');
        } else {
            const d = obj.Date.split('T');
            const src = source[0].name;
            obj = obj.Valute;
            for (const key in obj) {
                if (!Object.hasOwnProperty.call(obj, key)) continue;
                if (adapter.config['0_' + key]){
                    obj[key].Value = parseFloat(obj[key].Value / parseInt(obj[key].Nominal)).toFixed(4);
                    obj[key].Previous = parseFloat(obj[key].Previous / parseInt(obj[key].Nominal)).toFixed(4);
                    setDev({name: src + '.' + key, desc: obj[key].Name, code: obj[key].NumCode}, function (){
                        setStates({name: src + '.Date', desc: opt.words('Date', lang), val: d[0]});
                        setStates({
                            name: src + '.' + key + '.Current',
                            desc: opt.words('Current', lang),
                            val:  obj[key].Value
                        });
                        setStates({
                            name: src + '.' + key + '.Previous',
                            desc: opt.words('Previous', lang),
                            val:  obj[key].Previous
                        });
                        setStates({
                            name: src + '.' + key + '.Difference',
                            desc: opt.words('Difference', lang),
                            val:  parseFloat(obj[key].Value - obj[key].Previous).toFixed(4)
                        });
                    });
                }
            }
            adapter.log.debug('Exchange Rates Updated');
        }
    } catch (err) {
        adapter.log.error('Parsing error! - ' + JSON.stringify(err));
    }
}

function parseECB(body){
    adapter.log.debug('parseECB');
    xml2js.parseString(body, {
        explicitArray:     false,
        trim:              true,
        tagNameProcessors: [item => ((item = item.split(':')), item.length === 2 ? item[1] :item[0])],
        valueProcessors:   [str => !isNaN(str) ? (str % 1 === 0 ? parseInt(str) :parseFloat(str)) :str]
    }, function (err, result){
        const date = result.Envelope.Cube.Cube.$.time;
        const src = source[1].name;
        adapter.log.debug('parseECB ' + JSON.stringify(result.Envelope.Cube.Cube.Cube));
        const arr = result.Envelope.Cube.Cube.Cube;
        arr.forEach(function (item){
            const cur = item.$.currency;
            const val = parseFloat(item.$.rate).toFixed(4);
            if (adapter.config['1_' + cur]){
                setDev({
                    name: src + '.' + cur,
                    desc: opt.currencies[cur].desc[lang],
                    code: opt.currencies[cur].code
                }, function (){
                    setStates({name: src + '.Date', desc: opt.words('Date', lang), val: date});
                    setStates({name: src + '.' + cur + '.Current', desc: opt.words('Current', lang), val: val});
                    adapter.getState(src + '.' + cur + '.Date', function (err, oldDate){
                        if (!err && oldDate){
                            if (oldDate.val !== date){
                                adapter.getState(src + '.' + cur + '.Date', function (err, state){
                                    if (!err && oldDate){
                                        setStates({
                                            name: src + '.' + cur + '.Previous',
                                            desc: opt.words('Previous', lang),
                                            val:  state.val
                                        });
                                        setStates({
                                            name: src + '.' + cur + '.Difference',
                                            desc: opt.words('Difference', lang),
                                            val:  parseFloat(val - state.val).toFixed(4)
                                        });
                                    }
                                });
                            }
                        }
                    });
                });
            }
        });
    });
}

function parsePOL(body){
    adapter.log.debug('parsePOL');
    try {
        const obj = JSON.parse(body);
        if (!obj.BTC_ETH){
            adapter.log.error('parsePOL Error data');
        } else {
            const src = source[2].name;
            for (const key in obj) {
                if (!Object.hasOwnProperty.call(obj, key)) continue;
                if (adapter.config['2_' + key]){
                    const val = parseFloat(obj[key].last).toFixed(8);
                    setDev({
                        name: src + '.' + key,
                        desc: opt.currencies[key].desc[lang],
                        code: obj[key].id
                    }, function (){
                        setStates({name: src + '.Date', desc: opt.words('Date', lang), val: nowTime()});
                        setStates({name: src + '.' + key + '.Current', desc: opt.words('Current', lang), val: val});
                        setStates({
                            name: src + '.' + key + '.percentChange',
                            desc: opt.words('percentChange', lang),
                            val:  parseFloat(obj[key].percentChange).toFixed(8)
                        });
                    });
                }
            }
            adapter.log.debug('Exchange Rates Updated');
        }
    } catch (err) {
        adapter.log.error('Parsing error! - ' + JSON.stringify(err));
    }
}

function getCourses(){
    adapter.log.info('Get exchange rates');
    source.forEach(function (obj, src){
        const options = {
            hostname: obj.url.substring(0, obj.url.indexOf('/')),
            path:     obj.url.substring(obj.url.indexOf('/'), obj.url.length),
            port:     443,
            timeout:  5000,
            method:   'GET'
        };
        const req = https.request(options, (res) => {
            if (res.statusCode !== 200){
                adapter.log.error('getCourses response statusCode' + res.statusCode);
                res.resume();
                return;
            }
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                adapter.log.debug('Response ' + JSON.stringify(body));
                source[src].parser(body);
            });
        });
        req.on('error', (e) => {
            adapter.log.error(e);
        });
        req.on('timeout', () => {
            adapter.log.error('request timeout');
        });
        req.end();
    });
}

function main(){
    if (!adapter.systemConfig) return;
    adapter.setState('info.connection', true, true);
    adapter.getForeignObject('system.config', (err, obj) => {
        lang = obj.common.language;
        //adapter.log.error(lang);
    });
    getCourses();
    interval = setInterval(function (){
        getCourses();
    }, 1800000);
}

const nowTime = function (){
    const now = new Date();
    const day = (now.getDate() < 10 ? '0' :'') + now.getDate();
    const month = ((now.getMonth() + 1) < 10 ? '0' :'') + (now.getMonth() + 1);
    const year = now.getFullYear();
    return year + '-' + month + '-' + day;
};

if (module.parent){
    module.exports = startAdapter;
} else {
    startAdapter();
}
