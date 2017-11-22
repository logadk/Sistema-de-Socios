$(document).on('ready',function(){     
    $('#rc_buscar').on('click',function(){
        tabla_socio();
        $('#modal_so_titulo').html('Buscar Socio');
        $('#modal_so_busca').modal('show');
    });
    $('#sel_socio').on('change',function(){
        tabla_socio(); 
    });
    //evento para selecionar un socio activo de la tabla modal_sa_busca
    $('#so_tabla').on('click','.filasm',function(){
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
    //evento para ver las competencias creadeas
    $('#rc_tabla').on('click','.rc_fila',function(){
        var id,descr,seguir;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;
                case 1:
                    descr = $(this).text();
                break;
                case 2:
                    if( $(this).text() <= 0)
                    {
                        var alert_resp=confirm('¿La clase ya no tiene cupos disponibles, ¿Desea Continuar?');
                        if(alert_resp)
                        {
                            seguir = 'si';
                        }
                        else
                        {
                            seguir = 'no';
                        }
                    }
                    else
                    {
                        seguir = 'si';
                    }                    
                break;                
            }            
        });
        if(seguir === 'si')
        {
            if($('#rc_nombres').val() !== '')
            {
                $('#rc_id').val(id);                
                $('#mrc_rut').val($('#rc_rut').val());
                $('#rc_descripcion').val(descr);
                $('#mrc_competencias').val(id);
                $('#mrc_nombres').val($('#rc_nombres').val());
                //funcion para llenar el modal reserva canchas 
                $('#modal_reserva_competencia').modal('show');
                
            }else{
                alert('Debes Seleccionar unsocio antes de continuar');
                $('#rc_buscar').focus();
                return false;
            }            
        }     
        ver_participantes(id);
    });
    //evento click boton guardar en modal guardar
//    $('#mrc_guardar').on('click',function(){
//        reserva_cancha();
//    });
    //evento click boton eliminar en modal guardar
    $('#mrc_eliminar').on('click',function(){
        var alert_resp = confirm('¿Desea Borrar Este Registro?');
        if(alert_resp)
        {
            eliminar_participantes();
        }
    });
    $('#mrc_editar').on('click',function() {
        editar_inscripcion();
    });
    //evento click en el periodo de la tabla
    $('#mrc_tabla').on('click','.mrc_fila',function(){
        var id;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;                               
            }            
        });
        ver_inscripcion(id);
    });
    //funcion para llenar tabla
    llenar_rc_tabla();
});
//function para pasar el nombre y el rut selecionado al fomulario socio transeunte
function pasar_datos( rut,nombres)
{
    $('#rc_rut').val(rut);
    $('#rc_nombres').val(nombres);
    $('#modal_so_busca').modal('hide');    
}

//funcion para llenar la tabla socios segun el socio selecionado
function tabla_socio()
{
    var accion = 'Busca_socio';
    var tipo = $('#sel_socio').val();
    $.post("core/controller/ConsultasRCanchasController.php",{accion:accion,tipo_socio:tipo,cancha:'',periodo:'',rut:'',fecha:'',valor:''},
    function (data)
    {
        $('#so_tbody').remove();        
        var num = data.length;            
        var fila = '<tbody id="so_tbody">';
        for(var i = 0; i < num; i++)
        {
            fila+='<tr style="cursor:pointer" class="filasm"><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td></tr>';
        }
        fila+='</tbody>';
        $('#so_tabla').append(fila);            
        datatable_tabla_socios();
    },'json');    
}

//funcion que llena la tabla con las canchas creadas
function llenar_rc_tabla()
{
    var accion = 'ver_competencias';    
    $.post("core/controller/ConsultasICompetencias.php",{accion:accion,codigo:'',descrip:'',cupos:'',edad_minima:'',edad_maxima:'',fecha:''},
    function (data)
    {
        $('#rc_tbody').remove();        
        var num = data.length;            
        var fila = '<tbody id="rc_tbody">';
        for(var i = 0; i < num; i++)
        {
            fila+='<tr style="cursor:pointer" class="rc_fila"><td>'+data[i]['cp_codigo']+'</td><td>'+data[i]['cp_descripcion']+'</td><td>'+data[i]['cp_cupos']+'</td></tr>';
        }
        fila+='</tbody>';
        $('#rc_tabla').append(fila);            
        datatable_rc_tabla();
    },'json');    
}
//funcion que activa plugin datatable en taba fsa_tabla
function datatable_rc_tabla()
{
    $('#rc_tabla').DataTable(
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

function datatable_modal()
{
    $('#mrc_tabla').DataTable(
    {            
        "destroy": true,
        "language": {                                
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Registros del 0 al 0 de un total de 0 registros",
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

function datatable_tabla_socios()
{
    $('#so_tabla').DataTable(
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
//funcion para inscribir la competencia
function inscribe_competencia()
{    
    var accion = 'inscribir';
    var competencia = $('#mrc_competencias').val();
    var rut = $('#mrc_rut').val();
    var nombres = $('#mrc_nombres').val();
    var sexo = $('#sel_sexo').val();
    var edad = $('#mrc_edad').val();
    var lugar = $('#mrc_lugar').val();
    if(lugar === '')
    {
        lugar = 0;
    }
    var valor = $('#mrc_valor').val();
    if(valor === '')
    {
        valor = 0;
    }
    $.post('core/controller/ConsultasRCompetencias.php',{accion:accion,id:'',competencia:competencia,rut:rut,nombres:nombres,sexo:sexo,edad:edad,lugar:lugar,valor:valor},
    function(data)
    {        
        alert(data);
    });
    ver_participantes(competencia);
    limpiar_modal_inscripcion();
}
//funcion para inscribir la competencia
function editar_inscripcion()
{    
    var accion = 'editar';
    var id = $('#mrc_editar').val();
    var competencia = $('#mrc_competencias').val();
    var rut = $('#mrc_rut').val();
    var nombres = $('#mrc_nombres').val();
    var sexo = $('#sel_sexo').val();
    var edad = $('#mrc_edad').val();
    if(edad === '')
    {
        alert('Debes llenar el campo edad');
        $('#mrc_edad').focus();
        return false;
    }
    var lugar = $('#mrc_lugar').val();
    if(lugar === '')
    {
        lugar = 0;
    }
    var valor = $('#mrc_valor').val();
    if(valor === '')
    {
        valor = 0;
    }
    $.post('core/controller/ConsultasRCompetencias.php',{accion:accion,id:id,competencia:competencia,rut:rut,nombres:nombres,sexo:sexo,edad:edad,lugar:lugar,valor:valor},
    function(data)
    {        
        alert(data);
    });
    $('#modal_reserva_competencia').modal('hide');
    limpiar_modal_inscripcion();
    //ocultar boton guardar
    $('#mrc_guardar').addClass('invi');
    //habilitar botones
    $('#mrc_eliminar').removeClass('invi');
    $('#mrc_editar').removeClass('invi');
}

function ver_inscripcion(id)
{
    var accion = 'ver';    
    $.post('core/controller/ConsultasRCompetencias.php',{accion:accion,id:id,competencia:'',rut:'',nombres:'',sexo:'',edad:'',lugar:'',valor:''},
    function(data)
    {
        $('#mrc_competencias').val(data[0]['cp_codigo']);
        $('#mrc_rut').val(data[0]['icp_rut']);        
        $('#mrc_nombres').val(data[0]['icp_nombres']);
        $('#sel_sexo').val(data[0]['icp_sexo']);
        $('#mrc_edad').val(data[0]['icp_edad']);
        $('#mrc_lugar').val(data[0]['icp_lugarobtenido']);
        $('#mrc_valor').val(data[0]['icp_valorpagado']);
        $('#mrc_eliminar').val(data[0]['icp_id']);
        $('#mrc_editar').val(data[0]['icp_id']);
        //ocultar boton guardar
        $('#mrc_guardar').addClass('invi');
        //habilitar botones
        $('#mrc_eliminar').removeClass('invi');
        $('#mrc_editar').removeClass('invi');
    });
}

function ver_participantes(competencia)
{
    var accion = 'participantes';    
    $.post('/core/controller/ConsultasRCompetencias.php',{accion:accion,id:'',competencia:competencia,rut:'',nombres:'',sexo:'',edad:'',lugar:'',valor:''},
    function(data)
    {
        $('#mrc_tbody').remove();
        if(data !== 'FALSE')
        {                    
            var num = data.length;            
            var fila = '<tbody id="mrc_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="mrc_fila"><td>'+data[i]['icp_id']+'</td><td>'+data[i]['icp_nombres']+'</td><td>'+data[i]['icp_lugarobtenido']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#mrc_tabla').append(fila);
        }           
        datatable_modal();
    },'json');
}

function eliminar_participantes()
{
    var accion = 'eliminar';  
    var competencia = $('#mrc_competencias').val();
    var id = $('#mrc_eliminar').val();
    $.post('core/controller/ConsultasRCompetencias.php',{accion:accion,id:id,competencia:competencia,rut:'',nombres:'',sexo:'',edad:'',lugar:'',valor:''},
    function(data)
    {        
        alert('Inscripcion eliminada');
        llenar_rc_tabla();
        $('#modal_reserva_competencia').modal('hide');
        $('#mrc_guardar').removeClass('invi');
        $('#mrc_editar').addClass('invi');
        $('#mrc_eliminar').addClass('invi');
        limpiar_modal_inscripcion();
    });
}

function limpiar_modal_inscripcion()
{    
    $('#mrc_competencias').val('');
    $('#mrc_rut').val('');
    $('#mrc_nombres').val('');
    $('#sel_sexo').val('');
    $('#mrc_edad').val('');
    $('#mrc_lugar').val('');    
    $('#mrc_valor').val('');   
}