'use strict';
const utils = require('@iobroker/adapter-core');
const request = require('request');
let adapter, interval;
const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

function startAdapter(options){
    return adapter = utils.adapter(Object.assign({}, options, {
        name:         'exchangerates',
        ready:        main, // Main method defined below for readability
        unload:       (callback) => {
            try {
                adapter.log.info('cleaned everything up...');
                callback();
            } catch (e) {
                callback();
            }
        },
        objectChange: (id, obj) => {
            if (obj){
                //adapter.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
            } else {
                //adapter.log.info(`object ${id} deleted`);
            }
        },
        stateChange:  (id, state) => {
            if (state){
                //adapter.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
            } else {
                //adapter.log.info(`state ${id} deleted`);
            }
        },
    }));
}

function setStates(obj){
    adapter.getState(obj.name, function (err, state){
        if (err || !state){
            let type = 'number';
            if(obj.name === 'Date' || obj.name === 'Timestamp') type = 'string';
            adapter.setObject(obj.name, {
                type:   'state',
                common: {
                    name: obj.desc,
                    desc: obj.desc,
                    type: type,
                    read:  true,
                    write: false
                },
                native: {}
            });
            adapter.setState(obj.name, {val: obj.val, ack: true});
        } else {
            adapter.log.debug('state.val = ' + state.val + '/ val = ' + obj.val);
            if (state.val !== obj.val){
                adapter.setState(obj.name, {val: obj.val, ack: true});
            }
        }
    });
}

function setDev(obj, cb){
    const icon = 'img/' + obj.name + '.png';
    adapter.setObjectNotExists(obj.name, {
        type:   'device',
        common: {name: obj.desc, type: 'counter', icon: icon},
        native: {id: obj.code}
    }, () => {
        adapter.extendObject(obj.name, {common: {name: obj.desc, type: 'counter', icon: icon}});
    });
    cb && cb();
}

function getCourses(){
    adapter.log.info('Get exchange rates CBR');
    adapter.setState('info.connection', true, true);
    const options = {
        url: url
    };
    request(options, function (error, response, body){
        adapter.log.debug('Response statusCode of CBR ' + response.statusCode);
        if (!error && response.statusCode === 200){
            try {
                let obj = JSON.parse(body);
                if (!obj.Valute.USD.Value || !obj.Valute.EUR.Value){
                    adapter.log.error('Error data');
                } else {
                    setStates({name: 'Date', desc: 'Данные на дату', val: obj.Date});
                    setStates({name: 'Timestamp', desc: 'Обновлено', val: obj.Timestamp});
                    obj = obj.Valute;
                    for (let key in obj) {
                        if (!Object.hasOwnProperty.call(obj, key)) continue;
                        obj[key].Value = parseFloat(obj[key].Value / parseInt(obj[key].Nominal)).toFixed(2);
                        obj[key].Previous = parseFloat(obj[key].Previous / parseInt(obj[key].Nominal)).toFixed(2);
                        setDev({name: key, desc: obj[key].Name, code: obj[key].NumCode}, function (){
                            setStates({name: key + '.Current', desc: 'Текущий курс', val: obj[key].Value});
                            setStates({name: key + '.Previous', desc: 'Предыдущий курс', val: obj[key].Previous});
                            setStates({name: key + '.Difference', desc: 'Разница в курсах', val: parseFloat(obj[key].Value - obj[key].Previous).toFixed(2)});
                        });
                    }
                    adapter.log.debug('Exchange Rates Updated');
                    adapter.setState('info.connection', false, true);
                }
            } catch (err) {
                adapter.log.error('Parsing error! - ' + JSON.stringify(err));
            }
        }
    });
}

function main(){
    if (!adapter.config) return;
    adapter.setState('info.connection', false, true);
    getCourses();
    interval = setInterval(function (){
        getCourses();
    }, 600000);
}

if (module.parent){
    module.exports = startAdapter;
} else {
    startAdapter();
}