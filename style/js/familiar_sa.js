$(document).on('ready',function(){   
    //evento para formato rut del modal
    $('#agregar_rut').Rut({   
        on_error: function () {
            alert('Rut incorrecto');
            $('#agregar_rut').val("");
            $('#agregar_rut').focus();
        },format_on: 'keyup'
    });
    $('#fsa_buscar').click(function(){
        llenar_sa_tabla();        
        $('#modal_sa_busca').modal('show');
        //$('#sa_tabla').DataTable();
    });
    $('#fsa_agregar').on('click',function(){
        limpiar();
        $('#modalagregar_titulo').html('Agregar Familiar Socio Activo');
        $('#modal_agregar').modal('show');
    });
    
    $('#agregar_editar').on('click',function() {
        var ress = confirm('¿Desea Guardar los Cambios?');
        if (ress === true) 
        {
            update();   
        }
    });    
    $('#agregar_reset_pass').on('click',function() {
        var ress = confirm('¿Desea Restablecer la Clave del Socio '+$('#agregar_nombres').val()+' ?');
        if (ress === true) 
        {
            reset_pass();   
        }
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
        });
        pasar_datos(rut,nombres);
    });
    
    //evento para selecionar un socio activo de la tabla modal_sa_busca
    $('#fsa_tabla').on('click','.filafsa',function(){
        var frut;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    frut = $(this).text(); 
                    ver_familiar(frut);
                break;                    
            }            
        });
        //pasar_datos(rut,nombres);
    });
    
    datatable_sa_familiar();
});
//function para pasar el nombre y el rut selecionado al fomulario socio transeunte
function pasar_datos( rut,nombres)
{
    $('#sa_rut').val(rut);
    $('#sa_nombres').val(nombres);
    $('#modal_sa_busca').modal('hide');
    buscar_familiares(rut);
}

function buscar_familiares(rut)
{        
    var accion = 'busca_familiar';
    //$('#modal_sa_titulo').html('Buscar Socio Activo');
    $.post("core/controller/ConsultasFSaController.php",{accion:accion,sa_rut:rut,nombres:'',rut:'',parentesco:'',sexo:'',fecha:'',estado:''},
    function (data)
    {        
        if(data !== 'false')
        {            
            $('#fsa_tbody').remove();        
            var num = data.length;
            var fila = '<tbody id="fsa_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="filafsa"><td>'+data[i]['saf_rut']+'</td><td>'+data[i]['saf_nombre']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#fsa_tabla').append(fila);    
        }                
            datatable_sa_familiar();
    },'json');    
}

// funcion que busca el falimiar selecionado de la tabla familiares y lo muestra en el modal.
function ver_familiar(rut)
{        
    var accion = 'ver_familiar';
    //$('#modal_sa_titulo').html('Buscar Socio Activo');
    $.post("core/controller/ConsultasFSaController.php",{accion:accion,sa_rut:'',nombres:'',rut:rut,parentesco:'',sexo:'',fecha:'',estado:''},
    function (data)
    {        
        if(data['RES'] === 'OK')
        {            
            $('#modalagregar_titulo').html('Editar Familiar Socio Activo');
            $('#agregar_rut').val(data['RUT']);
            $('#agregar_nombres').val(data['NOMBRE']);
            $('#agregar_estado').val(data['ESTADO']);
            $('#agregar_fecha').val(data['NACIMIENTO']);
            $('#sel_sexo').val(data['SEXO']);
            $('#sel_parentesco').val(data['PARENTESCO']);
            $('#agregar_reset_pass').removeClass('invi');
            $('#agregar_editar').removeClass('invi');
            $('#agregar_guardar').addClass('invi');
            $('#modal_agregar').modal('show');
            $('#agregar_rut').attr('disabled','disabled');
        }           
    },'json');    
}

function llenar_sa_tabla()
{
    var accion = 'Busca_sa';
    $('#modal_sa_titulo').html('Buscar Socio Activo');
    $.post("core/controller/ConsultasFSaController.php",{accion:accion,sa_rut:'',nombres:'',rut:'',parentesco:'',sexo:'',fecha:'',estado:''},
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
//funcion que activa plugin datatable en taba fsa_tabla
function datatable_sa_familiar()
{
    $('#fsa_tabla').DataTable(
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

//funcion que activa plugin datatable en taba sa_tabla
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

//funcion para guardar el cliente
function agregar()
{
    if($('#sa_rut').val() === "")
    {
        alert('Debes Seleccionar un Socio Activo');
        $('#modal_agregar').modal('hide');
        $('#fsa_buscar').focus();
        return false;
    }    
    if($('#agregar_rut').val() === "")
    {
        alert('Debes Llenar el campo Rut');
        $('#agregar_rut').focus();
        return false;
    }
    if($('#agregar_nombres').val() === "")
    {
        alert('Debes Llenar el campo Nombres');
        $('#agregar_nombres').focus();
        return false;
    }    
    if($('#agregar_fecha').val() === "") 
    {
        alert($('#agregar_fecha').val());
        alert('Debes Llenar el campo ingresar una fecha');
        $('#agregar_fecha').focus();
        return false;
    }
    var accion = 'insertar';
    var sa_rut = $('#sa_rut').val();
    var rut = $('#agregar_rut').val();
    var nombres = $('#agregar_nombres').val();
    var sexo = $('#sel_sexo').val();
    var parentesco = $('#sel_parentesco').val();
    var fecha = $('#agregar_fecha').val();    
    $.post('core/controller/ConsultasFSaController.php',{accion:accion,rut:rut,nombres:nombres,sa_rut:sa_rut,parentesco:parentesco,sexo:sexo,fecha:fecha,estado:''},
    function(data)
    {
        if(data === 'OK')
        {
            alert('El Familiar Socio Activo '+nombres+' Fue Ingresado de forma correcta.');  
            $('#modal_agregar').modal('hide');
        }
        else
        {
            alert(data);
            $('#modal_agregar').modal('hide');
        }
    });
    limpiar_afregar();
}

//funcion para editar el familiar socio activo
function update()
{      
    if($('#agregar_nombres').val() === "")
    {
        alert('Debes Llenar el campo Nombres');
        $('#agregar_nombres').focus();
        return false;
    }    
    if($('#agregar_fecha').val() === "") 
    {
        alert($('#agregar_fecha').val());
        alert('Debes Llenar el campo ingresar una fecha');
        $('#agregar_fecha').focus();
        return false;
    }
    var accion = 'update';
    var sa_rut = $('#sa_rut').val();
    var rut = $('#agregar_rut').val();
    var nombres = $('#agregar_nombres').val();
    var sexo = $('#sel_sexo').val();
    var parentesco = $('#sel_parentesco').val();
    var fecha = $('#agregar_fecha').val(); 
    var estado = $('#agregar_estado').val();
    $.post('core/controller/ConsultasFSaController.php',{accion:accion,rut:rut,nombres:nombres,sa_rut:sa_rut,parentesco:parentesco,sexo:sexo,fecha:fecha,estado:estado},
    function(data)
    {
        if(data === 'OK')
        {
            alert('El Socio '+nombres+' Fue Editado de forma correcta.');  
            $('#modal_agregar').modal('hide');
        }
        else
        {
            alert(data);
            $('#modal_agregar').modal('hide');
        }
    });    
}

//funcion para resetear la clade del fammiliar socio activo
function reset_pass()
{   
    var accion = 'reset_pass';
    var rut = $('#agregar_rut').val();    
    $.post("core/controller/ConsultasFSaController.php",{accion:accion,sa_rut:'',nombres:'',rut:rut,parentesco:'',sexo:'',fecha:'',estado:''},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La clave del Socio '+$('#agregar_nombres').val()+' Fue Cambia da con exito');
            $('#modal_agregar').modal('hide');
        }
        else
        {
            alert('No se pudo Cambiar la clave');
        }
    });
}

function limpiar_afregar()
{
    $('#sa_rut').val('');
    $('#sa_nombres').val('');
    $('#agregar_rut').val('');
    $('#agregar_nombres').val('');    
    $('#agregar_fecha').val('');
//    $('#agregar_editar').addClass('invi');
//    $('#agregar_reset_pass').addClass('invi');
//    $('#agregar_rut').removeAttr('requiered');
//    $('#agregar_guardar').removeClass('invi');
}

function limpiar() {
    $('#agregar_rut').val('');
    $('#agregar_nombres').val('');    
    $('#agregar_fecha').val('');
    $('#agregar_editar').addClass('invi');
    $('#agregar_reset_pass').addClass('invi');
    $('#agregar_rut').removeAttr('disabled');
    $('#agregar_guardar').removeClass('invi');
}