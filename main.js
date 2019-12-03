'use strict';
const utils = require('@iobroker/adapter-core');
const https = require('https');
const xml2js = require('xml2js');
let adapter, interval = null;

const urls = {
    1: 'https://www.cbr-xml-daily.ru/daily_json.js',
    2: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'
};

function startAdapter(options){
    return adapter = utils.adapter(Object.assign({}, options, {
        name:         'exchangerates',
        systemConfig: true,
        ready:        main,
        unload:       (callback) => {
            try {
                adapter.log.info('cleaned everything up...');
                callback();
            } catch (e) {
                callback();
            }
        },
        /*objectChange: (id, obj) => {
        },
        stateChange:  (id, state) => {
        },*/
        message:      obj => {
            if (typeof obj === 'object' && obj.command){
                adapter.log.debug(`message ******* ${JSON.stringify(obj)}`);
                if (obj.command === 'getOptions'){
                    obj.callback && adapter.sendTo(obj.from, obj.command, curOpt, obj.callback);
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
    adapter.getState(obj.name, function (err, state){
        if (err || !state){
            let type = 'number';
            if (obj.name === 'Date' || obj.name === 'Timestamp') type = 'string';
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
        type:   'channel',
        common: {name: obj.desc, type: 'counter', icon: icon},
        native: {id: obj.code}
    }, () => {
        adapter.extendObject(obj.name, {common: {name: obj.desc, type: 'counter', icon: icon}});
    });
    cb && cb();
}


function delObjects(obj, cb){
    let source;
    for (let key in obj) {
        let cur = key.split('_');
        source = cur[0];
        if (!obj[key]){
            adapter.deleteChannel(cur[1]);
        }
    }
    for (let key2 in curOpt) {
        if (!~curOpt[key2].source.indexOf(source.toString())){
            adapter.deleteChannel(key2);
        }
    }
    cb && cb();
}

const words = function (s){
    const dictionary = {
        'Current':    {
            'en':    'myColor',
            'de':    'meineColor',
            'ru':    'Текущий курс',
            'pt':    'minhaCor',
            'nl':    'mijnKleur',
            'fr':    'maCouleur',
            'it':    'mioColore',
            'es':    'miColor',
            'pl':    'mójKolor',
            'zh-cn': '我的颜色'
        },
        'Previous':   {
            'en':    'myColor',
            'de':    'meineColor',
            'ru':    'Предыдущий курс',
            'pt':    'minhaCor',
            'nl':    'mijnKleur',
            'fr':    'maCouleur',
            'it':    'mioColore',
            'es':    'miColor',
            'pl':    'mójKolor',
            'zh-cn': '我的颜色'
        },
        'Difference': {
            'en':    'myColor',
            'de':    'meineColor',
            'ru':    'Разница в курсах',
            'pt':    'minhaCor',
            'nl':    'mijnKleur',
            'fr':    'maCouleur',
            'it':    'mioColore',
            'es':    'miColor',
            'pl':    'mójKolor',
            'zh-cn': '我的颜色'
        }
    };
    return dictionary[s]['ru'];
};

const curOpt = {
    AUD: {
        code:   '036',
        source: '1,2',
        desc:   {
            ru:      'Австралийский доллар',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    AZN: {
        code:   '944',
        source: '1',
        desc:   {
            ru:      'Азербайджанский манат',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    AMD: {
        code:   '051',
        source: '1',
        desc:   {
            ru:      'Армянских драмов',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    BYN: {
        code:   '933',
        source: '1',
        desc:   {
            ru:      'Белорусский рубль',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    EUR: {
        code:   '978',
        source: '1',
        desc:   {
            ru:      'Евро',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    KZT: {
        code:   '398',
        source: '1',
        desc:   {
            ru:      'Казахстанских тенге',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    KGS: {
        code:   '417',
        source: '1',
        desc:   {
            ru:      'Киргизских сомов',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    MDL: {
        code:   '498',
        source: '1',
        desc:   {
            ru:      'Молдавских леев',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    XDR: {
        code:   '960',
        source: '1',
        desc:   {
            ru:      'СДР (специальные права заимствования)',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    TJS: {
        code:   '972',
        source: '1',
        desc:   {
            ru:      'Таджикских сомони',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    TMT: {
        code:   '934',
        source: '1',
        desc:   {
            ru:      'Новый туркменский манат',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    UZS: {
        code:   '860',
        source: '1',
        desc:   {
            ru:      'Узбекских сумов',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    UAH: {
        code:   '980',
        source: '1',
        desc:   {
            ru:      'Украинских гривен',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    USD: {
        code:   '840',
        source: '1,2',
        desc:   {
            ru:      'Доллар США',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    JPY: {
        code:   '392',
        source: '1,2',
        desc:   {
            ru:      'Японских иен',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    BGN: {
        code:   '975',
        source: '1,2',
        desc:   {
            ru:      'Болгарский лев',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    CZK: {
        code:   '203',
        source: '1,2',
        desc:   {
            ru:      'Чешских крон',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    DKK: {
        code:   '208',
        source: '1,2',
        desc:   {
            ru:      'Датских крон',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    GBP: {
        code:   '826',
        source: '1,2',
        desc:   {
            ru:      'Фунт стерлингов Соединенного королевства',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    HUF: {
        code:   '348',
        source: '1,2',
        desc:   {
            ru:      'Венгерских форинтов',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    PLN: {
        code:   '985',
        source: '1,2',
        desc:   {
            ru:      'Польский злотый',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    RON: {
        code:   '946',
        source: '1,2',
        desc:   {
            ru:      'Румынский лей',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    SEK: {
        code:   '752',
        source: '1,2',
        desc:   {
            ru:      'Шведских крон',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    CHF: {
        code:   '756',
        source: '1,2',
        desc:   {
            ru:      'Швейцарский франк',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    ISK: {
        code:   '352',
        source: '2',
        desc:   {
            ru:      'Исландская крона',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    NOK: {
        code:   '578',
        source: '1,2',
        desc:   {
            ru:      'Норвежских крон',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    HRK: {
        code:   '191',
        source: '2',
        desc:   {
            ru:      'Хорватская куна',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    RUB: {
        code:   '643',
        source: '2',
        desc:   {
            ru:      'Российский рубль',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    TRY: {
        code:   '949',
        source: '1,2',
        desc:   {
            ru:      'Турецкая лира',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    BRL: {
        code:   '986',
        source: '1,2',
        desc:   {
            ru:      'Бразильский реал',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    CAD: {
        code:   '124',
        source: '1,2',
        desc:   {
            ru:      'Канадский доллар',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    CNY: {
        code:   '156',
        source: '1,2',
        desc:   {
            ru:      'Китайских юаней',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    HKD: {
        code:   '344',
        source: '1,2',
        desc:   {
            ru:      'Гонконгских долларов',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    IDR: {
        code:   '360',
        source: '2',
        desc:   {
            ru:      'Индонезийская рупия',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    ILS: {
        code:   '376',
        source: '2',
        desc:   {
            ru:      'Израильский шекель',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    INR: {
        code:   '356',
        source: '1,2',
        desc:   {
            ru:      'Индийских рупий',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    KRW: {
        code:   '410',
        source: '1,2',
        desc:   {
            ru:      'Вон Республики Корея',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    MXN: {
        code:   '484',
        source: '2',
        desc:   {
            ru:      'Мексиканское песо',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    MYR: {
        code:   '458',
        source: '2',
        desc:   {
            ru:      'Малайзийский ринггит',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    NZD: {
        code:   '554',
        source: '2',
        desc:   {
            ru:      'Новозеландский доллар',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    PHP: {
        code:   '608',
        source: '2',
        desc:   {
            ru:      'Филлипинское Песо',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    SGD: {
        code:   '702',
        source: '1,2',
        desc:   {
            ru:      'Сингапурский доллар',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    THB: {
        code:   '764',
        source: '2',
        desc:   {
            ru:      'Тайский бат',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    },
    ZAR: {
        code:   '710',
        source: '1,2',
        desc:   {
            ru:      'Южноафриканских рэндов',
            'en':    'name',
            'de':    'name',
            'pt':    'name',
            'nl':    'name',
            'fr':    'name',
            'it':    'name',
            'es':    'name',
            'pl':    'name',
            'zh-cn': 'name'
        }
    }
};

function parseCBR(body){
    adapter.log.debug('parseCBR');
    try {
        let obj = JSON.parse(body);
        if (!obj.Valute.USD.Value || !obj.Valute.EUR.Value){
            adapter.log.error('Error data');
        } else {
            setStates({name: 'Date', desc: 'Данные на дату', val: obj.Date});
            obj = obj.Valute;
            for (const key in obj) {
                if (!Object.hasOwnProperty.call(obj, key)) continue;
                if (adapter.config['1_' + key]){
                    obj[key].Value = parseFloat(obj[key].Value / parseInt(obj[key].Nominal)).toFixed(4);
                    obj[key].Previous = parseFloat(obj[key].Previous / parseInt(obj[key].Nominal)).toFixed(4);
                    setDev({name: key, desc: obj[key].Name, code: obj[key].NumCode}, function (){
                        setStates({name: key + '.Current', desc: words('Current'), val: obj[key].Value});
                        setStates({name: key + '.Previous', desc: words('Previous'), val: obj[key].Previous});
                        setStates({
                            name: key + '.Difference',
                            desc: words('Difference'),
                            val:  parseFloat(obj[key].Value - obj[key].Previous).toFixed(4)
                        });
                    });
                }
            }
            adapter.log.debug('Exchange Rates Updated');
            adapter.setState('info.connection', false, true);
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
        tagNameProcessors: [item => ((item = item.split(':')), item.length == 2 ? item[1] :item[0])],
        valueProcessors:   [str => !isNaN(str) ? (str % 1 === 0 ? parseInt(str) :parseFloat(str)) :str]
    }, function (err, result){
        const date = result.Envelope.Cube.Cube.$.time;
        setStates({name: 'Date', desc: 'Данные на дату', val: date});
        adapter.log.debug('parseECB ' + JSON.stringify(result.Envelope.Cube.Cube.Cube));
        const arr = result.Envelope.Cube.Cube.Cube;
        arr.forEach(function (item, i){
            const cur = item.$.currency;
            const val = parseFloat(item.$.rate).toFixed(4);
            if (adapter.config['2_' + cur]){
                setDev({name: cur, desc: curOpt[cur].desc.ru, code: curOpt[cur].code}, function (){
                    setStates({name: cur + '.Current', desc: words('Current'), val: val});
                    adapter.getState(cur + '.Date', function (err, oldDate){
                        if (!err && oldDate){
                            if (oldDate.val !== date){
                                adapter.getState(cur + '.Date', function (err, state){
                                    if (!err && oldDate){
                                        setStates({name: cur + '.Previous', desc: words('Previous'), val: state.val});
                                        setStates({
                                            name: cur + '.Difference',
                                            desc: words('Difference'),
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

function getCourses(source){
    adapter.log.info('Get exchange rates');
    const url = urls[source];
    https.get(url, (res) => {
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
            if (source === 1){
                parseCBR(body);
            } else if (source === 2){
                parseECB(body);
            }
        });
    }).on('error', (e) => {
        adapter.log.error('ERROR ' + e);
    });
}


function main(){
    if (!adapter.config.source) return;
    adapter.setState('info.connection', false, true);
    adapter.log.error('adapter.config.source = ' + adapter.config.source);
    getCourses(parseInt(adapter.config.source));
    interval = setInterval(function (){
        adapter.setState('info.connection', true, true);
        getCourses(parseInt(adapter.config.source));
    }, 1800000);
}

if (module.parent){
    module.exports = startAdapter;
} else {
    startAdapter();
}