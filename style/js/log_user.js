$(document).on('ready',function(){   
    //evento para formato rut del modal
    $('#user_rut').Rut({   
        on_error: function () {
            alert('Rut incorrecto');
            $('#user_rut').val("");
            $('#user_rut').focus();
        },format_on: 'keyup'
    });    
});
