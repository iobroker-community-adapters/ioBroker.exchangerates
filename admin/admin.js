let namespace = 'exchangerates.' + instance,
    namespaceLen = namespace.length;
let lang;
let options = {}, setting;

function load(settings, onChange){
    //if (!settings) return;
    setting = settings;
    lang = systemLang || 'en';
    console.log('///// settings ////// ' + JSON.stringify(settings));
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
    getOptions();
    onChange(false);
    console.log('systemLang - ' + systemLang);
}

$(document).ready(function (){
    sockets();
    //$('.modal').modal();
    $('#source').on('change', selectSource);
    //$('#source').val(setting.source).select();
    M.updateTextFields();
});

function getOptions(){
    sendTo(namespace, 'getOptions', {}, function (msg){
        if (msg){
            if (msg.error){
                showMessage(_(msg.error), _('Error'), 'error_outline');
            } else {
                options = msg;
                $('#source').trigger('change');
            }
        }
    });
}

function selectSource(){
    const val = $('select#source option:checked').val();
    $('#curlist').empty();
    let div = '';
    for (const key in options) {
        if (~options[key].source.indexOf(val)){
            div += '<span style="padding-right: 20px;"><img style="height:24px;vertical-align:sub;" src="img/' + key + '.png" alt="' + key + '" title="' + key + '" ></span>' +
                '<label for="' + val + '_' + key + '">' +
                '<input id="' + val + '_' + key + '" type="checkbox" class="value input-field"/>' +
                '<span class="translate" data-lang="' + options[key].desc[lang] + '">' + options[key].desc[lang] + '</span>' +
                '</label></br>';
        }
    }
    $('#curlist').html(div);

    $('.value').each(function (){
        const $key = $(this);
        const id = $key.attr('id');
        if ($key.attr('type') === 'checkbox'){
            $key.prop('checked', setting[id]).change(function (){
                $('input').click(function() {
                    if($(this).is(':checked')){
                        $(this).attr('checked', true);
                    } else {
                        $(this).removeAttr('checked');
                    }
                    $('a.btn-save').removeClass('disabled');
                    $('a.btn-save-close').removeClass('disabled');
                });
            });
        }
    });
    
    //M.updateTextFields();
}

function save(callback){
    // example: select elements with class=value and build settings object
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



