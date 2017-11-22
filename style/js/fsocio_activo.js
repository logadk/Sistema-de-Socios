$(document).on('ready',function(){
    $('#sa_rut').Rut({   
        on_error: function () {
            alert('Rut incorrecto');
            $('#sa_rut').val("");
            $('#sa_rut').focus();
        },format_on: 'keyup'
    });
    
    $('#agregar_rut').Rut({   
        on_error: function () {
            alert('Rut incorrecto');
            $('#agregar_rut').val("");
            $('#agregar_rut').focus();
        },format_on: 'keyup'
    });
    //evento para insertar cliente
//    $('#sa_guardar').on('click',function(){
//    
//       add_sactivo(); 
//    });
    //evento para buscar el cliente
//    $('#sa_buscar').on('click',function(){
//        busca_sactivo();
//    });
    //evento click para resetear la contraseña
    $('#sa_reset_pass').on('click',function(){
        var res = confirm('Desea Resetear la clave');
        if(res === true)
        {
            reset_pass();
        }
    });
    //evento click para el boton editar
    $('#sa_editar').on('click',function(){
        update_sactivo();
    });
});


//funcion para guardar el cliente
function add_sactivo()
{
    if($('#sa_rut').val() === "")
    {
        alert('Debes Llenar el campo Rut');
        $('#sa_rut').focus();
        return false;
    }    
    if($('#sa_nombres').val() === "")
    {
        alert('Debes Llenar el campo Nombres');
        $('#sa_nombres').focus();
        return false;
    }
    if($('#sa_nacimiento').val() === "")
    {
        alert('Debes Llenar el campo Nacimiento');
        $('#sa_nacimiento').focus();
        return false;
    }
    if($('#sa_titulo').val() === "")
    {
        alert('Debes Llenar el campo Titulo');
        $('#sa_titulo').focus();
        return false;
    }
    if($('#sa_dpto').val() === "")
    {
        alert('Debes Llenar el campo Dpto/Casa');
        $('#sa_dpto').focus();
        return false;
    }
    if($('#sa_email').val() !== "") 
    {
        if($("#sa_email").val().indexOf('@', 0) === -1 || $("#sa_email").val().indexOf('.', 0) === -1) {
            alert('El correo electrónico introducido no es correcto.');
            $("#sa_email").focus();
            return false;
        }
    }
    var accion = 'insertar';
    var rut = $('#sa_rut').val();
    var nombres = $('#sa_nombres').val();
    var sexo = $('#sel_sexo').val();
    var fnacimiento = $('#sa_nacimiento').val();
    var titulo = $('#sa_titulo').val();
    var dpto = $('#sa_dpto').val();
    var celular = $('#sa_celu').val();
    var email = $('#sa_email').val();
    $.post('core/controller/ConsultasSaController.php',{accion:accion,rut:rut,nombres:nombres,sexo:sexo,nacimiento:fnacimiento,titulo:titulo,dpto:dpto,celular:celular,email:email},
    function(data)
    {
        if(data === 'OK')
        {
            alert('El Socio Activo '+nombres+' Fue Ingresado de forma correcta.');
            limpia_form_sa();
        }
        else
        {
            alert(data);
        }
    });
}

function busca_sactivo()
{
    if($('#sa_rut').val() === "")
    {
        alert('Debes Llenar el campo Rut');
        $('#sa_rut').focus();
        return false;
    }
    
    var accion = 'buscar';
    var rut = $('#sa_rut').val();    
    $.post('core/controller/ConsultasSaController.php',{accion:accion,rut:rut,nombres:'',sexo:'',nacimiento:'',titulo:'',dpto:'',celular:'',email:''},
    function(data)
    {
        if(data === 'false')
        {
            
        }
        else
        {
            $('#msa_rut').val(data[0]['sa_rut']);
            $('#msa_nombres').val(data[0]['sa_nombre']);
            $('#msa_sexo').val(data[0]['sa_sexo']);
            $('#msa_nacimiento').val(data[0]['sa_nacimiento']);
            $('#msa_titulo').val(data[0]['sa_titulo']);
            $('#msa_dpto').val(data[0]['sa_depto_casa']);
            $('#msa_celu').val(data[0]['sa_cel']);
            $('#msa_email').val(data[0]['sa_email']);
            $('#msa_estado').val(data[0]['sa_estado']);
            $('#modal_socio_activo').modal('show');
        }
    });
}

//funcion para guardar el cliente
function update_sactivo()
{
    if($('#msa_nombres').val() === "")
    {
        alert('Error al Editar, El campo nombres no puede ir vacio');
        $('#msa_nombres').focus();
        return false;
    }
    if($('#msa_titulo').val() === "")
    {
        alert('Error al Editar, Debes Llenar el campo Titulo');
        $('#msa_titulo').focus();
        return false;
    }
    if($('#msa_dpto').val() === "")
    {
        alert('Debes Llenar el campo Dpto/Casa');
        $('#msa_dpto').focus();
        return false;
    }
    if($('#msa_email').val() !== "") 
    {
        if($("#msa_email").val().indexOf('@', 0) === -1 || $("#msa_email").val().indexOf('.', 0) === -1) {
            alert('El correo electrónico introducido no es correcto.');
            $("#msa_email").focus();
            return false;
        }
    }
    var accion = 'update';
    var rut = $('#msa_rut').val();
    var nombres = $('#msa_nombres').val();
    var sexo = $('#msa_sexo').val();
    var fnacimiento = $('#msa_nacimiento').val();
    var titulo = $('#msa_titulo').val();
    var dpto = $('#msa_dpto').val();
    var celular = $('#msa_celu').val();
    var email = $('#msa_email').val();
    var estado = $('#msa_estado').val();
    $.post('core/controller/ConsultasSaController.php',{accion:accion,rut:rut,nombres:nombres,sexo:sexo,nacimiento:fnacimiento,titulo:titulo,dpto:dpto,celular:celular,email:email,estado:estado},
    function(data)
    {
        if(data === 'OK')
        {
            $('#modal_socio_activo').modal('hide');
            alert('El Socio Activo '+nombres+' Fue Editado de forma correcta.');
        }
        else
        {
            alert(data);
        }
    });
}

function reset_pass()
{   
    var accion = 'reset_pass';
    var rut = $('#msa_rut').val();    
    $.post('core/controller/ConsultasSaController.php',{accion:accion,rut:rut,nombres:'',sexo:'',nacimiento:'',titulo:'',dpto:'',celular:'',email:'',estado:''},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La clave del Socio Activo '+$('#msa_nombres').val()+' Fue Cambia da con exito');
        }
        else
        {
            alert('No se pudo Cambiar la clave');
        }
    });
}

function limpia_form_sa()
{
    $('#sa_rut').val('');
    $('#sa_nombres').val('');
    $('#sa_titulo').val('');
    $('#sa_dpto').val('');
    $('#sa_celu').val('');
    $('#sa_email').val('');
}

