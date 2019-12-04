
module.exports.words = function (s, l){
    const dictionary = {
        'Current':       {
            'en':    'Current exchange rate',
            'de':    'Current exchange rate',
            'ru':    'Текущий курс',
            'pt':    'Current exchange rate',
            'nl':    'Current exchange rate',
            'fr':    'Current exchange rate',
            'it':    'Current exchange rate',
            'es':    'Current exchange rate',
            'pl':    'Current exchange rate',
            'zh-cn': 'Current exchange rate'
        },
        'Previous':      {
            'en':    'Previous exchange rate',
            'de':    'Previous exchange rate',
            'ru':    'Предыдущий курс',
            'pt':    'Previous exchange rate',
            'nl':    'Previous exchange rate',
            'fr':    'Previous exchange rate',
            'it':    'Previous exchange rate',
            'es':    'Previous exchange rate',
            'pl':    'Previous exchange rate',
            'zh-cn': 'Previous exchange rate'
        },
        'Difference':    {
            'en':    'Difference in exchange rates',
            'de':    'Difference in exchange rates',
            'ru':    'Разница в курсах',
            'pt':    'Difference in exchange rates',
            'nl':    'Difference in exchange rates',
            'fr':    'Difference in exchange rates',
            'it':    'Difference in exchange rates',
            'es':    'Difference in exchange rates',
            'pl':    'Difference in exchange rates',
            'zh-cn': 'Difference in exchange rates'
        },
        'Date':          {
            'en':    'Date Data',
            'de':    'Date Data',
            'ru':    'Данные на дату',
            'pt':    'Date Data',
            'nl':    'Date Data',
            'fr':    'Date Data',
            'it':    'Date Data',
            'es':    'Date Data',
            'pl':    'Date Data',
            'zh-cn': 'Date Data'
        },
        'percentChange': {
            'en':    'Percent Change',
            'de':    'Percent Change',
            'ru':    'Процент изменения',
            'pt':    'Percent Change',
            'nl':    'Percent Change',
            'fr':    'Percent Change',
            'it':    'Percent Change',
            'es':    'Percent Change',
            'pl':    'Percent Change',
            'zh-cn': 'Percent Change'
        }
    };
    return dictionary[s][l];
};

module.exports.currencies = {
    AUD:      {
        code:   '036',
        source: '0,1',
        desc:   {
            'ru':    'Австралийский доллар',
            'en':    'Australian dollar',
            'de':    'Australian dollar',
            'pt':    'Australian dollar',
            'nl':    'Australian dollar',
            'fr':    'Australian dollar',
            'it':    'Australian dollar',
            'es':    'Australian dollar',
            'pl':    'Australian dollar',
            'zh-cn': 'Australian dollar'
        }
    },
    AZN:      {
        code:   '944',
        source: '0',
        desc:   {
            'ru':    'Азербайджанский манат',
            'en':    'Azerbaijani manat',
            'de':    'Azerbaijani manat',
            'pt':    'Azerbaijani manat',
            'nl':    'Azerbaijani manat',
            'fr':    'Azerbaijani manat',
            'it':    'Azerbaijani manat',
            'es':    'Azerbaijani manat',
            'pl':    'Azerbaijani manat',
            'zh-cn': 'Azerbaijani manat'
        }
    },
    AMD:      {
        code:   '051',
        source: '0',
        desc:   {
            'ru':    'Армянских драмов',
            'en':    'Armenian drams',
            'de':    'Armenian drams',
            'pt':    'Armenian drams',
            'nl':    'Armenian drams',
            'fr':    'Armenian drams',
            'it':    'Armenian drams',
            'es':    'Armenian drams',
            'pl':    'Armenian drams',
            'zh-cn': 'Armenian drams'
        }
    },
    BYN:      {
        code:   '933',
        source: '0',
        desc:   {
            'ru':    'Белорусский рубль',
            'en':    'Belarusian ruble',
            'de':    'Belarusian ruble',
            'pt':    'Belarusian ruble',
            'nl':    'Belarusian ruble',
            'fr':    'Belarusian ruble',
            'it':    'Belarusian ruble',
            'es':    'Belarusian ruble',
            'pl':    'Belarusian ruble',
            'zh-cn': 'Belarusian ruble'
        }
    },
    EUR:      {
        code:   '978',
        source: '0',
        desc:   {
            'ru':    'Евро',
            'en':    'Euro',
            'de':    'Euro',
            'pt':    'Euro',
            'nl':    'Euro',
            'fr':    'Euro',
            'it':    'Euro',
            'es':    'Euro',
            'pl':    'Euro',
            'zh-cn': 'Euro'
        }
    },
    KZT:      {
        code:   '398',
        source: '0',
        desc:   {
            'ru':    'Казахстанских тенге',
            'en':    'Kazakhstan tenge',
            'de':    'Kazakhstan tenge',
            'pt':    'Kazakhstan tenge',
            'nl':    'Kazakhstan tenge',
            'fr':    'Kazakhstan tenge',
            'it':    'Kazakhstan tenge',
            'es':    'Kazakhstan tenge',
            'pl':    'Kazakhstan tenge',
            'zh-cn': 'Kazakhstan tenge'
        }
    },
    KGS:      {
        code:   '417',
        source: '0',
        desc:   {
            'ru':    'Киргизских сомов',
            'en':    'Kyrgyz soms',
            'de':    'Kyrgyz soms',
            'pt':    'Kyrgyz soms',
            'nl':    'Kyrgyz soms',
            'fr':    'Kyrgyz soms',
            'it':    'Kyrgyz soms',
            'es':    'Kyrgyz soms',
            'pl':    'Kyrgyz soms',
            'zh-cn': 'Kyrgyz soms'
        }
    },
    MDL:      {
        code:   '498',
        source: '0',
        desc:   {
            'ru':    'Молдавских леев',
            'en':    'Moldovan Lei',
            'de':    'Moldovan Lei',
            'pt':    'Moldovan Lei',
            'nl':    'Moldovan Lei',
            'fr':    'Moldovan Lei',
            'it':    'Moldovan Lei',
            'es':    'Moldovan Lei',
            'pl':    'Moldovan Lei',
            'zh-cn': 'Moldovan Lei'
        }
    },
    XDR:      {
        code:   '960',
        source: '0',
        desc:   {
            'ru':    'СДР (специальные права заимствования)',
            'en':    'SDR (Special Drawing Rights)',
            'de':    'SDR (Special Drawing Rights)',
            'pt':    'SDR (Special Drawing Rights)',
            'nl':    'SDR (Special Drawing Rights)',
            'fr':    'SDR (Special Drawing Rights)',
            'it':    'SDR (Special Drawing Rights)',
            'es':    'SDR (Special Drawing Rights)',
            'pl':    'SDR (Special Drawing Rights)',
            'zh-cn': 'SDR (Special Drawing Rights)'
        }
    },
    TJS:      {
        code:   '972',
        source: '0',
        desc:   {
            'ru':    'Таджикских сомони',
            'en':    'Tajik somoni',
            'de':    'Tajik somoni',
            'pt':    'Tajik somoni',
            'nl':    'Tajik somoni',
            'fr':    'Tajik somoni',
            'it':    'Tajik somoni',
            'es':    'Tajik somoni',
            'pl':    'Tajik somoni',
            'zh-cn': 'Tajik somoni'
        }
    },
    TMT:      {
        code:   '934',
        source: '0',
        desc:   {
            'ru':    'Новый туркменский манат',
            'en':    'New Turkmen manat',
            'de':    'New Turkmen manat',
            'pt':    'New Turkmen manat',
            'nl':    'New Turkmen manat',
            'fr':    'New Turkmen manat',
            'it':    'New Turkmen manat',
            'es':    'New Turkmen manat',
            'pl':    'New Turkmen manat',
            'zh-cn': 'New Turkmen manat'
        }
    },
    UZS:      {
        code:   '860',
        source: '0',
        desc:   {
            'ru':    'Узбекских сумов',
            'en':    'Uzbek soums',
            'de':    'Uzbek soums',
            'pt':    'Uzbek soums',
            'nl':    'Uzbek soums',
            'fr':    'Uzbek soums',
            'it':    'Uzbek soums',
            'es':    'Uzbek soums',
            'pl':    'Uzbek soums',
            'zh-cn': 'Uzbek soums'
        }
    },
    UAH:      {
        code:   '980',
        source: '0',
        desc:   {
            'ru':    'Украинских гривен',
            'en':    'Ukrainian hryvnia',
            'de':    'Ukrainian hryvnia',
            'pt':    'Ukrainian hryvnia',
            'nl':    'Ukrainian hryvnia',
            'fr':    'Ukrainian hryvnia',
            'it':    'Ukrainian hryvnia',
            'es':    'Ukrainian hryvnia',
            'pl':    'Ukrainian hryvnia',
            'zh-cn': 'Ukrainian hryvnia'
        }
    },
    USD:      {
        code:   '840',
        source: '0,1',
        desc:   {
            'ru':    'Доллар США',
            'en':    'U.S. dollar',
            'de':    'U.S. dollar',
            'pt':    'U.S. dollar',
            'nl':    'U.S. dollar',
            'fr':    'U.S. dollar',
            'it':    'U.S. dollar',
            'es':    'U.S. dollar',
            'pl':    'U.S. dollar',
            'zh-cn': 'U.S. dollar'
        }
    },
    JPY:      {
        code:   '392',
        source: '0,1',
        desc:   {
            'ru':    'Японских иен',
            'en':    'Japanese yen',
            'de':    'Japanese yen',
            'pt':    'Japanese yen',
            'nl':    'Japanese yen',
            'fr':    'Japanese yen',
            'it':    'Japanese yen',
            'es':    'Japanese yen',
            'pl':    'Japanese yen',
            'zh-cn': 'Japanese yen'
        }
    },
    BGN:      {
        code:   '975',
        source: '0,1',
        desc:   {
            'ru':    'Болгарский лев',
            'en':    'Bulgarian lion',
            'de':    'Bulgarian lion',
            'pt':    'Bulgarian lion',
            'nl':    'Bulgarian lion',
            'fr':    'Bulgarian lion',
            'it':    'Bulgarian lion',
            'es':    'Bulgarian lion',
            'pl':    'Bulgarian lion',
            'zh-cn': 'Bulgarian lion'
        }
    },
    CZK:      {
        code:   '203',
        source: '0,1',
        desc:   {
            'ru':    'Чешских крон',
            'en':    'Czech crowns',
            'de':    'Czech crowns',
            'pt':    'Czech crowns',
            'nl':    'Czech crowns',
            'fr':    'Czech crowns',
            'it':    'Czech crowns',
            'es':    'Czech crowns',
            'pl':    'Czech crowns',
            'zh-cn': 'Czech crowns'
        }
    },
    DKK:      {
        code:   '208',
        source: '0,1',
        desc:   {
            'ru':    'Датских крон',
            'en':    'Danish kroner',
            'de':    'Danish kroner',
            'pt':    'Danish kroner',
            'nl':    'Danish kroner',
            'fr':    'Danish kroner',
            'it':    'Danish kroner',
            'es':    'Danish kroner',
            'pl':    'Danish kroner',
            'zh-cn': 'Danish kroner'
        }
    },
    GBP:      {
        code:   '826',
        source: '0,1',
        desc:   {
            'ru':    'Фунт стерлингов Соединенного королевства',
            'en':    'Pound sterling',
            'de':    'Pound sterling',
            'pt':    'Pound sterling',
            'nl':    'Pound sterling',
            'fr':    'Pound sterling',
            'it':    'Pound sterling',
            'es':    'Pound sterling',
            'pl':    'Pound sterling',
            'zh-cn': 'Pound sterling'
        }
    },
    HUF:      {
        code:   '348',
        source: '0,1',
        desc:   {
            'ru':    'Венгерских форинтов',
            'en':    'Hungarian Forints',
            'de':    'Hungarian Forints',
            'pt':    'Hungarian Forints',
            'nl':    'Hungarian Forints',
            'fr':    'Hungarian Forints',
            'it':    'Hungarian Forints',
            'es':    'Hungarian Forints',
            'pl':    'Hungarian Forints',
            'zh-cn': 'Hungarian Forints'
        }
    },
    PLN:      {
        code:   '985',
        source: '0,1',
        desc:   {
            'ru':    'Польский злотый',
            'en':    'Polish zloty',
            'de':    'Polish zloty',
            'pt':    'Polish zloty',
            'nl':    'Polish zloty',
            'fr':    'Polish zloty',
            'it':    'Polish zloty',
            'es':    'Polish zloty',
            'pl':    'Polish zloty',
            'zh-cn': 'Polish zloty'
        }
    },
    RON:      {
        code:   '946',
        source: '0,1',
        desc:   {
            'ru':    'Румынский лей',
            'en':    'Romanian Leu',
            'de':    'Romanian Leu',
            'pt':    'Romanian Leu',
            'nl':    'Romanian Leu',
            'fr':    'Romanian Leu',
            'it':    'Romanian Leu',
            'es':    'Romanian Leu',
            'pl':    'Romanian Leu',
            'zh-cn': 'Romanian Leu'
        }
    },
    SEK:      {
        code:   '752',
        source: '0,1',
        desc:   {
            'ru':    'Шведских крон',
            'en':    'Swedish kronor',
            'de':    'Swedish kronor',
            'pt':    'Swedish kronor',
            'nl':    'Swedish kronor',
            'fr':    'Swedish kronor',
            'it':    'Swedish kronor',
            'es':    'Swedish kronor',
            'pl':    'Swedish kronor',
            'zh-cn': 'Swedish kronor'
        }
    },
    CHF:      {
        code:   '756',
        source: '0,1',
        desc:   {
            'ru':    'Швейцарский франк',
            'en':    'Swiss frank',
            'de':    'Swiss frank',
            'pt':    'Swiss frank',
            'nl':    'Swiss frank',
            'fr':    'Swiss frank',
            'it':    'Swiss frank',
            'es':    'Swiss frank',
            'pl':    'Swiss frank',
            'zh-cn': 'Swiss frank'
        }
    },
    ISK:      {
        code:   '352',
        source: '1',
        desc:   {
            'ru':    'Исландская крона',
            'en':    'Icelandic Krone',
            'de':    'Icelandic Krone',
            'pt':    'Icelandic Krone',
            'nl':    'Icelandic Krone',
            'fr':    'Icelandic Krone',
            'it':    'Icelandic Krone',
            'es':    'Icelandic Krone',
            'pl':    'Icelandic Krone',
            'zh-cn': 'Icelandic Krone'
        }
    },
    NOK:      {
        code:   '578',
        source: '0,1',
        desc:   {
            'ru':    'Норвежских крон',
            'en':    'Norwegian kroner',
            'de':    'Norwegian kroner',
            'pt':    'Norwegian kroner',
            'nl':    'Norwegian kroner',
            'fr':    'Norwegian kroner',
            'it':    'Norwegian kroner',
            'es':    'Norwegian kroner',
            'pl':    'Norwegian kroner',
            'zh-cn': 'Norwegian kroner'
        }
    },
    HRK:      {
        code:   '191',
        source: '1',
        desc:   {
            'ru':    'Хорватская куна',
            'en':    'Croatian Kuna',
            'de':    'Croatian Kuna',
            'pt':    'Croatian Kuna',
            'nl':    'Croatian Kuna',
            'fr':    'Croatian Kuna',
            'it':    'Croatian Kuna',
            'es':    'Croatian Kuna',
            'pl':    'Croatian Kuna',
            'zh-cn': 'Croatian Kuna'
        }
    },
    RUB:      {
        code:   '643',
        source: '1',
        desc:   {
            'ru':    'Российский рубль',
            'en':    'Russian ruble',
            'de':    'Russian ruble',
            'pt':    'Russian ruble',
            'nl':    'Russian ruble',
            'fr':    'Russian ruble',
            'it':    'Russian ruble',
            'es':    'Russian ruble',
            'pl':    'Russian ruble',
            'zh-cn': 'Russian ruble'
        }
    },
    TRY:      {
        code:   '949',
        source: '0,1',
        desc:   {
            'ru':    'Турецкая лира',
            'en':    'Turkish lira',
            'de':    'Turkish lira',
            'pt':    'Turkish lira',
            'nl':    'Turkish lira',
            'fr':    'Turkish lira',
            'it':    'Turkish lira',
            'es':    'Turkish lira',
            'pl':    'Turkish lira',
            'zh-cn': 'Turkish lira'
        }
    },
    BRL:      {
        code:   '986',
        source: '0,1',
        desc:   {
            'ru':    'Бразильский реал',
            'en':    'Brazilian real',
            'de':    'Brazilian real',
            'pt':    'Brazilian real',
            'nl':    'Brazilian real',
            'fr':    'Brazilian real',
            'it':    'Brazilian real',
            'es':    'Brazilian real',
            'pl':    'Brazilian real',
            'zh-cn': 'Brazilian real'
        }
    },
    CAD:      {
        code:   '124',
        source: '0,1',
        desc:   {
            'ru':    'Канадский доллар',
            'en':    'Canadian dollar',
            'de':    'Canadian dollar',
            'pt':    'Canadian dollar',
            'nl':    'Canadian dollar',
            'fr':    'Canadian dollar',
            'it':    'Canadian dollar',
            'es':    'Canadian dollar',
            'pl':    'Canadian dollar',
            'zh-cn': 'Canadian dollar'
        }
    },
    CNY:      {
        code:   '156',
        source: '0,1',
        desc:   {
            'ru':    'Китайских юаней',
            'en':    'Chinese yuan',
            'de':    'Chinese yuan',
            'pt':    'Chinese yuan',
            'nl':    'Chinese yuan',
            'fr':    'Chinese yuan',
            'it':    'Chinese yuan',
            'es':    'Chinese yuan',
            'pl':    'Chinese yuan',
            'zh-cn': 'Chinese yuan'
        }
    },
    HKD:      {
        code:   '344',
        source: '0,1',
        desc:   {
            'ru':    'Гонконгских долларов',
            'en':    'Hong kong dollars',
            'de':    'Hong kong dollars',
            'pt':    'Hong kong dollars',
            'nl':    'Hong kong dollars',
            'fr':    'Hong kong dollars',
            'it':    'Hong kong dollars',
            'es':    'Hong kong dollars',
            'pl':    'Hong kong dollars',
            'zh-cn': 'Hong kong dollars'
        }
    },
    IDR:      {
        code:   '360',
        source: '1',
        desc:   {
            'ru':    'Индонезийская рупия',
            'en':    'Indonesian Rupiah',
            'de':    'Indonesian Rupiah',
            'pt':    'Indonesian Rupiah',
            'nl':    'Indonesian Rupiah',
            'fr':    'Indonesian Rupiah',
            'it':    'Indonesian Rupiah',
            'es':    'Indonesian Rupiah',
            'pl':    'Indonesian Rupiah',
            'zh-cn': 'Indonesian Rupiah'
        }
    },
    ILS:      {
        code:   '376',
        source: '1',
        desc:   {
            'ru':    'Израильский шекель',
            'en':    'Israeli shekel',
            'de':    'Israeli shekel',
            'pt':    'Israeli shekel',
            'nl':    'Israeli shekel',
            'fr':    'Israeli shekel',
            'it':    'Israeli shekel',
            'es':    'Israeli shekel',
            'pl':    'Israeli shekel',
            'zh-cn': 'Israeli shekel'
        }
    },
    INR:      {
        code:   '356',
        source: '0,1',
        desc:   {
            'ru':    'Индийских рупий',
            'en':    'Indian rupees',
            'de':    'Indian rupees',
            'pt':    'Indian rupees',
            'nl':    'Indian rupees',
            'fr':    'Indian rupees',
            'it':    'Indian rupees',
            'es':    'Indian rupees',
            'pl':    'Indian rupees',
            'zh-cn': 'Indian rupees'
        }
    },
    KRW:      {
        code:   '410',
        source: '0,1',
        desc:   {
            'ru':    'Вон Республики Корея',
            'en':    'Won the Republic of Korea',
            'de':    'Won the Republic of Korea',
            'pt':    'Won the Republic of Korea',
            'nl':    'Won the Republic of Korea',
            'fr':    'Won the Republic of Korea',
            'it':    'Won the Republic of Korea',
            'es':    'Won the Republic of Korea',
            'pl':    'Won the Republic of Korea',
            'zh-cn': 'Won the Republic of Korea'
        }
    },
    MXN:      {
        code:   '484',
        source: '1',
        desc:   {
            'ru':    'Мексиканское песо',
            'en':    'Mexican peso',
            'de':    'Mexican peso',
            'pt':    'Mexican peso',
            'nl':    'Mexican peso',
            'fr':    'Mexican peso',
            'it':    'Mexican peso',
            'es':    'Mexican peso',
            'pl':    'Mexican peso',
            'zh-cn': 'Mexican peso'
        }
    },
    MYR:      {
        code:   '458',
        source: '1',
        desc:   {
            'ru':    'Малайзийский ринггит',
            'en':    'Malaysian Ringgit',
            'de':    'Malaysian Ringgit',
            'pt':    'Malaysian Ringgit',
            'nl':    'Malaysian Ringgit',
            'fr':    'Malaysian Ringgit',
            'it':    'Malaysian Ringgit',
            'es':    'Malaysian Ringgit',
            'pl':    'Malaysian Ringgit',
            'zh-cn': 'Malaysian Ringgit'
        }
    },
    NZD:      {
        code:   '554',
        source: '1',
        desc:   {
            'ru':    'Новозеландский доллар',
            'en':    'New Zealand Dollar',
            'de':    'New Zealand Dollar',
            'pt':    'New Zealand Dollar',
            'nl':    'New Zealand Dollar',
            'fr':    'New Zealand Dollar',
            'it':    'New Zealand Dollar',
            'es':    'New Zealand Dollar',
            'pl':    'New Zealand Dollar',
            'zh-cn': 'New Zealand Dollar'
        }
    },
    PHP:      {
        code:   '608',
        source: '1',
        desc:   {
            'ru':    'Филлипинское Песо',
            'en':    'Philippine peso',
            'de':    'Philippine peso',
            'pt':    'Philippine peso',
            'nl':    'Philippine peso',
            'fr':    'Philippine peso',
            'it':    'Philippine peso',
            'es':    'Philippine peso',
            'pl':    'Philippine peso',
            'zh-cn': 'Philippine peso'
        }
    },
    SGD:      {
        code:   '702',
        source: '0,1',
        desc:   {
            'ru':    'Сингапурский доллар',
            'en':    'Singapore dollar',
            'de':    'Singapore dollar',
            'pt':    'Singapore dollar',
            'nl':    'Singapore dollar',
            'fr':    'Singapore dollar',
            'it':    'Singapore dollar',
            'es':    'Singapore dollar',
            'pl':    'Singapore dollar',
            'zh-cn': 'Singapore dollar'
        }
    },
    THB:      {
        code:   '764',
        source: '1',
        desc:   {
            'ru':    'Тайский бат',
            'en':    'Thai baht',
            'de':    'Thai baht',
            'pt':    'Thai baht',
            'nl':    'Thai baht',
            'fr':    'Thai baht',
            'it':    'Thai baht',
            'es':    'Thai baht',
            'pl':    'Thai baht',
            'zh-cn': 'Thai baht'
        }
    },
    ZAR:      {
        code:   '710',
        source: '0,1',
        desc:   {
            'ru':    'Южноафриканских рэндов',
            'en':    'South African rand',
            'de':    'South African rand',
            'pt':    'South African rand',
            'nl':    'South African rand',
            'fr':    'South African rand',
            'it':    'South African rand',
            'es':    'South African rand',
            'pl':    'South African rand',
            'zh-cn': 'South African rand'
        }
    },
    USDT_BTC: {
        code:   '0',
        source: '2',
        desc:   {
            'ru':    'Биткойн',
            'en':    'Bitcoin',
            'de':    'Bitcoin',
            'pt':    'Bitcoin',
            'nl':    'Bitcoin',
            'fr':    'Bitcoin',
            'it':    'Bitcoin',
            'es':    'Bitcoin',
            'pl':    'Bitcoin',
            'zh-cn': 'Bitcoin'
        }
    },
    USDT_LTC: {
        code:   '0',
        source: '2',
        desc:   {
            'ru':    'Лайткоин',
            'en':    'Litecoin',
            'de':    'Litecoin',
            'pt':    'Litecoin',
            'nl':    'Litecoin',
            'fr':    'Litecoin',
            'it':    'Litecoin',
            'es':    'Litecoin',
            'pl':    'Litecoin',
            'zh-cn': 'Litecoin'
        }
    },
    USDT_ETH: {
        code:   '0',
        source: '2',
        desc:   {
            'ru':    'Эфириум',
            'en':    'Ethereum',
            'de':    'Ethereum',
            'pt':    'Ethereum',
            'nl':    'Ethereum',
            'fr':    'Ethereum',
            'it':    'Ethereum',
            'es':    'Ethereum',
            'pl':    'Ethereum',
            'zh-cn': 'Ethereum'
        }
    }
};