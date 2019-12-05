let namespace = 'exchangerates.' + instance,
    namespaceLen = namespace.length;
let lang = 'en';
let options = {};

function load(settings, onChange){
    //console.log('************** ' + JSON.stringify(settings));
    lang = systemLang;
    getOptions(function (){
        $('.value').each(function (){
            const $key = $(this);
            const id = $key.attr('id');
            if ($key.attr('type') === 'checkbox'){
                $key.prop('checked', settings[id]).change(function (){
                    onChange();
                });
            } else {
                $key.val(settings[id]).change(function (){
                    onChange();
                }).keyup(function (){
                    onChange();
                });
            }
        });
        onChange(false);
        $(document).ready(function (){
            sockets();
            $('#source').val(settings.source).select();
            $('#source').on('change', selectSource);
            selectSource();
            M.updateTextFields();
        });
    });
}

function getOptions(cb){
    sendTo(namespace, 'getOptions', {}, function (msg){
        if (msg){
            if (msg.error){
                showMessage(_(msg.error), _('Error'), 'error_outline');
            } else {
                options = msg;
                appendSelect(cb);
            }
        }
    });
}

function appendSelect(cb){
    for (let i = 0; i < 3; i++) {
        let div = '<div id="curlist-' + i + '" class="col" style="display:none" >';
        for (const key in options) {
            let img = key;
            if (~options[key].source.indexOf(i)){
                if (~key.indexOf('_')) img = key.substring(key.indexOf('_') + 1, key.length);
                div += '<span style="padding-right:20px;"><img style="height:24px;width:24px;vertical-align:sub;" src="img/' + img + '.png" alt="' + key + '" title="' + key + '" ></span>' +
                    '<label for="' + i + '_' + key + '">' +
                    '<input id="' + i + '_' + key + '" type="checkbox" class="value"/>' +
                    '<span class="translate" data-lang="' + options[key].desc[lang] + '">' + options[key].desc[lang] + '</span>' +
                    '</label></br>';
            }
        }
        div += '</div>';
        $('#lists').append(div);
    }
    cb && cb();
}

function selectSource(){
    const val = $('select#source option:checked').val();
    let selector = '#curlist-' + val;
    $('#lists').children().hide();
    $(selector).show();
}

function save(callback){
    let obj = {};
    $('.value').each(function (){
        var $this = $(this);
        if ($this.attr('type') === 'checkbox'){
            obj[$this.attr('id')] = $this.prop('checked');
        } else {
            obj[$this.attr('id')] = $this.val();
        }
    });

    sendTo(namespace, 'delObject', obj, function (msg){
        if (msg){
            if (msg.error){
                showMessage(_(msg.error), _('Error'), 'error_outline');
            } else {
                callback(obj);
            }
        }
    });
}

function sockets(){
    socket.emit('subscribe', namespace + '.info.*');
    socket.emit('subscribeObjects', namespace + '.*');
    socket.on('stateChange', function (id, state){
        if (id.substring(0, namespaceLen) !== namespace) return;
        if (state){

        }
    });
    socket.on('objectChange', function (id, obj){
        if (id.substring(0, namespaceLen) !== namespace) return;
        if (obj && obj.type == 'device' && obj.common.type !== 'group'){

        }
    });
    socket.emit('getObject', 'system.config', function (err, res){
        if (!err && res && res.common){
            systemLang = res.common.language || systemLang;
            systemConfig = res;
        }
    });
}
