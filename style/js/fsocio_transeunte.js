$(document).on('ready',function(){ 
    $('#st_rut').Rut({   
        on_error: function () {
            alert('Rut incorrecto');
            $('#st_rut').val("");
            $('#st_rut').focus();
        },format_on: 'keyup'
    });
    //evento click para el boton st_buscar que llena la tabla y muestra modal_sa_busca
    $('#st_buscar').click(function(){
        llenar_sa_tabla();        
        $('#modal_sa_busca').modal('show');
        //$('#sa_tabla').DataTable();
    });
    //evento click en boton editar de modal_transeunte
    $('#st_editar').on('click',function() {
        var ress = confirm('¿Desea Guardar los Cambios?');
        if (ress === true) 
        {
            update();   
        }
    }); 
    
    $('#st_reset_pass').on('click',function() {
        var ress = confirm('¿Desea Restablecer la Clave del Socio "'+$('#st_nombres').val()+'" ?');
        if (ress === true) 
        {
            reset_pass();   
        }
    });
    
    $('#st_agregar').on('click',function() {
       $('#modal_transeunte').modal('show');
       $('#st_rut').removeAttr('disabled');
       $('#st_guardar').removeClass('invi');
       $('#st_editar').addClass('invi');
       $('#st_reset_pass').addClass('invi');
    });
    
    //evento para selecionar un familiar socio transeunte de la tabla
    $('#st_tabla').on('click','.filast',function(){
        var frut;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    frut = $(this).text(); 
                    ver_transeunte(frut);
                break;                    
            }            
        });
        //pasar_datos(rut,nombres);
    });

    //evento para selecionar un socio activo de la tabla modal_sa_busca
    $('#sa_tabla').on('click','.filasm',function(){
        var rut,nombres;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    rut = $(this).text();                    
                break;
                case 1:
                    nombres = $(this).text();                    
                break;                
            }
            pasar_datos(rut,nombres);
        });        
    });
    
});
//function para pasar el nombre y el rut selecionado al fomulario socio transeunte
function pasar_datos( rut,nombres)
{
    $('#sa_rut').val(rut);
    $('#sa_nombres').val(nombres);
    $('#modal_sa_busca').modal('hide');
    buscar_familiares(rut);
}
//funcion busca familiares segun el rut del socio activo, y los muestra en la tabla st_tabla
function buscar_familiares(rut)
{        
    var accion = 'busca_familiar';
    //$('#modal_sa_titulo').html('Buscar Socio Activo');
    $.post("core/controller/ConsultasStController.php",{accion:accion,sa_rut:rut,rut:'',nombres:'',sexo:'',nacimiento:'',f_inicio:'',f_fin:'',celular:'',email:'',estado:''},
    function (data)
    {        
        if(data !== 'false')
        {            
            $('#st_tbody').remove();        
            var num = data.length;
            var fila = '<tbody id="st_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="filast"><td>'+data[i]['st_rut']+'</td><td>'+data[i]['st_nombre']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#st_tabla').append(fila);    
        }                
            datatable_socio_transeunte();
    },'json');    
}

function ver_transeunte(rut)
{        
    var accion = 'ver_transeunte';
    //$('#modal_sa_titulo').html('Buscar Socio Activo');
    $.post("core/controller/ConsultasStController.php",{accion:accion,sa_rut:'',rut:rut,nombres:'',sexo:'',nacimiento:'',f_inicio:'',f_fin:'',celular:'',email:'',estado:''},
    function (data)
    {        
        if(data['RES'] === 'OK')
        {            
            $('#modaltranseunte_titulo').html('Editar Socio Transeunte');
            $('#st_rut').val(data['RUT']);
            $('#st_nombres').val(data['NOMBRE']);
            $('#st_estado').val(data['ESTADO']);
            $('#st_nacimiento').val(data['NACIMIENTO']);
            $('#sel_sexo').val(data['SEXO']);
            $('#st_cel').val(data['CEL']);
            $('#st_email').val(data['EMAIL']);
            $('#st_inicio').val(data['FINICIO']);
            $('#st_fin').val(data['FTERMINO']);
            $('#st_reset_pass').removeClass('invi');
            $('#st_editar').removeClass('invi');
            $('#st_guardar').addClass('invi');
            $('#modal_transeunte').modal('show');
            $('#st_rut').attr('disabled','disabled');
        }           
    },'json');    
}

//function para llenar la tabla del modal_sa_busca con los socios activos.
function llenar_sa_tabla()
{
    var accion = 'Busca_sa';    
    $('#modal_sa_titulo').html('Buscar Socio Activo');
    $.post("core/controller/ConsultasStController.php",{accion:accion,sa_rut:'',rut:'',nombres:'',sexo:'',nacimiento:'',f_inicio:'',f_fin:'',celular:'',email:'',estado:''},
    function (data)
    {
        $('#sa_tbody').remove();
                                             
            var num = data.length;            
            var fila = '<tbody id="sa_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="filasm"><td>'+data[i]['sa_rut']+'</td><td>'+data[i]['sa_nombre']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#sa_tabla').append(fila);            
            datatable_sa_buscar();
    },'json');    
}

//funcion para añadir socio transeunte a la base de datos
function add_transeunte()
{    
    if($('#sa_rut').val() === "")
    {
        alert('Debes selecionar un socio Activo');
        $('#st_buscar').focus();
        return false;
    }
    if($('#st_rut').val() === "")
    {
        alert('Debes Llenar el campo Rut');
        $('#st_rut').focus();
        return false;
    }    
    if($('#st_nombres').val() === "")
    {
        alert('Debes Llenar el campo Nombres');
        $('#st_nombres').focus();
        return false;
    } 
    
    if($('#st_nacimiento').val() === "")
    {
        alert('Debes Llenar el campo Fecha Nacimiento');
        $('#st_nacimiento').focus();
        return false;
    } 
    
    if($('#st_email').val() !== "") 
    {
        if($("#st_email").val().indexOf('@', 0) === -1 || $("#st_email").val().indexOf('.', 0) === -1) {
            alert('El correo electrónico introducido no es correcto.');
            $("#st_email").focus();
            return false;
        }
    }
//    alert('aqui');
    if($('#st_inicio').val() === "")
    {
        alert('Debes Llenar el campo Dpto/Casa');
        $('#st_inicio').focus();
        return false;
    }
    if($('#st_fin').val() === "")
    {
        alert('Debes Llenar el campo Dpto/Casa');
        $('#st_fin').focus();
        return false;
    }
    
    var accion = 'insertar';
    var sa_rut = $('#sa_rut').val();    
    var rut = $('#st_rut').val();
    var nombres = $('#st_nombres').val();
    var sexo = $('#sel_sexo').val();
    var nacimiento = $('#st_nacimiento').val();
    var f_inicio = $('#st_inicio').val();
    var f_fin = $('#st_fin').val();
    var celular = $('#st_cel').val();
    var email = $('#st_email').val();
    if($('#st_cel').val() === "")
    {
        celular = 0;
    }
    //alert('aqui voy ');
    $.post('core/controller/ConsultasStController.php',{accion:accion,sa_rut:sa_rut,rut:rut,nombres:nombres,sexo:sexo,nacimiento:nacimiento,f_inicio:f_inicio,f_fin:f_fin,celular:celular,email:email,estado:'activo'},
    function(data)
    {
        if(data === 'OK')
        {
            alert('El Socio Transeunte '+nombres+' Fue Ingresado de forma correcta.');
            limpia_form_st();
        }
        else
        {
            alert(data);
        }
    });
}
function limpia_form_st()
{
    $('#sa_nombres').val();
    $('#sa_rut').val();    
    $('#st_rut').val();
    $('#st_nombres').val();
    $('#st_nacimiento').val();
    $('#st_inicio').val();
    $('#st_fin').val();
    $('#st_cel').val();
    $('#st_email').val();
    $('#modal_transeunte').modal('hide');
}

function limpia_st()
{
    $('#sa_nombres').val();
    $('#sa_rut').val();    
    $('#st_rut').val();
    $('#st_nombres').val();
    $('#st_nacimiento').val();
    $('#st_inicio').val();
    $('#st_fin').val();
    $('#st_cel').val();
    $('#st_email').val();
    $('#modal_transeunte').modal('hide');
    
}

function datatable_sa_buscar()
{
    $('#sa_tabla').DataTable(
        {            
            "destroy": true,
            "language": {                                
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                },
                "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }                                
            }
        });
}

function datatable_socio_transeunte()
{
    $('#st_tabla').DataTable(
    {            
        "destroy": true,
        "language": {                                
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
            },
            "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }                                
        }
    });
}

//funcion para editar el familiar socio activo
function update()
{      
    if($('#st_nombres').val() === "")
    {
        alert('Debes Llenar el campo Nombres');
        $('#st_nombres').focus();
        return false;
    }    
    if($('#st_nacimiento').val() === "") 
    {
        alert($('#st_nacimiento').val());
        alert('Debes Llenar el campo ingresar una fecha');
        $('#st_nacimiento').focus();
        return false;
    }
    var accion = 'update';
    var sa_rut = $('#sa_rut').val();    
    var rut = $('#st_rut').val();
    var nombres = $('#st_nombres').val();
    var sexo = $('#sel_sexo').val();
    var nacimiento = $('#st_nacimiento').val();
    var f_inicio = $('#st_inicio').val();
    var f_fin = $('#st_fin').val();
    var celular = $('#st_cel').val();
    var email = $('#st_email').val();
    var estado = $('#sel_estado').val();
    
    $.post('core/controller/ConsultasStController.php',{accion:accion,sa_rut:sa_rut,rut:rut,nombres:nombres,sexo:sexo,nacimiento:nacimiento,f_inicio:f_inicio,f_fin:f_fin,celular:celular,email:email,estado:estado},
    function(data)
    {
        if(data === 'OK')
        {
            alert('El Socio  "'+nombres+'"  Fue Editado de forma correcta.');  
            $('#modal_transeunte').modal('hide');
        }
        else
        {
            alert(data);
            $('#modal_transeunte').modal('hide');
        }
    });    
}

function reset_pass()
{   
    var accion = 'reset_pass';
    var rut = $('#st_rut').val();    
    $.post('core/controller/ConsultasStController.php',{accion:accion,sa_rut:'',rut:rut,nombres:'',sexo:'',nacimiento:'',f_inicio:'',f_fin:'',celular:'',email:'',estado:''},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La clave del Socio Activo '+$('#st_nombres').val()+' Fue Cambia da con exito');
        }
        else
        {
            alert('No se pudo Cambiar la clave');
        }
    });
}