$(document).on('ready',function(){     
    $('#rc_buscar').on('click',function(){
        tabla_socio();
        $('#modal_so_titulo').html('Buscar Socio');
        $('#modal_so_busca').modal('show');
    });
    $('#sel_socio').on('change',function(){
        tabla_socio(); 
    });
    //evento para selecionar un socio de la tabla modal_sa_busca
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
    //evento para selecionar un curso
    $('#rc_tabla').on('click','.cursosfila',function(){
        var id, curso;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;  
                case 1:
                    curso = $(this).text();                    
                break;
            }            
        });
        consulta_clase(id, curso);      
    });
    //evento para selecionar una reserva
    $('#mrc_tabla').on('click','.reservafila',function(){
        var id;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;               
            }            
        });
        pasar_reserva(id);      
    });
    
    //evento click boton guardar en modal guardar
    $('#mrc_guardar').on('click',function(){
        reserva_clase();
    });
    //evento click boton eliminar en modal guardar
    $('#mrc_eliminar').on('click',function(){
        var alert_resp = confirm('¿Desea Borrar Este Registro?');
        if(alert_resp)
        {
            eliminar_reserva();
        }
    });
    //evento click en la tabla clases
    $('#rc_thorario').on('click','.clasesfila',function(){
        if($('#rc_rut').val() === '')
        {
            alert('Debes seleccionar un socio antes de continuar');
            $('#rc_buscar').focus();
            return false;
        }
        var id, seguir;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;
                case 4:                    
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
            pasar_datos_modal(id);
            //funcion para llenar el modal reserva canchas      
            $('#mrc_guardar').removeClass('invi');
            $('#mrc_eliminar').addClass('invi');
            $('#modal_reserva_clase').modal('show');
        }        
    });
    //funcion para llenar tabla
    cursos_tabla();
});
//function para pasar el nombre y el rut selecionado al fomulario socio transeunte
//function para pasar el nombre y el rut selecionado al fomulario socio transeunte
function consulta_clase(id, curso)
{
    $('#rc_id').val(id);
    $('#rc_curso').val(curso);
    var accion = 'buscar_clases';    
    $.post("core/controller/ConsultasIClasesController.php",{accion:accion,codigo:id,inicio:'',termino:'',cupos:'',fecha:''},
    function (data)
    {
        if(data === 'FALSE')
        {
            
        }
        else
        {
            $('#rc_htbody').remove();        
            var num = data.length;            
            var fila = '<tbody id="rc_htbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="clasesfila"><td>'+data[i]['cl_id']+'</td><td>'+data[i]['cl_fecha']+'</td><td>'+data[i]['cl_horainicio']+'</td><td>'+data[i]['cl_horatermino']+'</td><td>'+data[i]['cl_cupos']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#rc_thorario').append(fila);          
        }
        //$('#modal_clase_crear').modal('show');
        //datatable_ic_tabla();
    },'json');  
}

//funcion  para llenar la tabla con la reserva selecionada
function pasar_reserva(id) {
    var accion = 'pasar_reserva';    
    $.post('core/controller/ConsultasRClases.php',{accion:accion,socio:'',curso:'',clase:id,rut:'',nombre:'',fecha:'',valor:''},
    function(data)
    {
        $('#mrc_rut').val(data[0]['ic_rut']);
        $('#mrc_nombres').val(data[0]['ic_nombre']);
        $('#mrc_clase').val(data[0]['cl_id']);
        $('#mrc_socio').val(data[0]['ic_socio']);
        $('#mrc_fecha').val(data[0]['ic_fecha']);
        $('#mrc_valor').val(data[0]['ic_valor']);
        $('#mrc_eliminar').val(data[0]['ic_id']);
        $('#mrc_guardar').addClass('invi');
        $('#mrc_eliminar').removeClass('invi');
    },'json');
}

//function para pasar los datos del modal socio
function pasar_datos( rut,nombres)
{
    $('#rc_rut').val(rut);
    $('#rc_nombres').val(nombres);
    $('#modal_so_busca').modal('hide');
}

//funcion que asigna el id y la descripcion de la cancha selecionada
function ver_horas(id,desc)
{
    $('#rc_id').val(id);
    $('#rc_descripcion').val(desc);
    //sentencia para verificar si existe una fecha selecionada se consulta el horario de la tabla segun esa fecha.
    if($('#rc_fecha').val() !== '')
    {
        consulta_horas();
    }
}

//funcion que consulta el horario de las canchas segun la cancha y la fecha selecionada
function consulta_horas()
{
    limpiar_tabla_horarios();
    var accion = 'horario';
    var fecha = $('#rc_fecha').val();
    var cancha = $('#rc_id').val();
    $.post("core/controller/ConsultasRCanchasController.php",{accion:accion,tipo_socio:'',cancha:cancha,periodo:'',rut:'',fecha:fecha,valor:''},
    function (data)
    {        
        var num = data.length;
        if(data !== 'FALSE')
        {
            for(var i = 0; i < num; i++)
            {
                //fila+='<tr><td>'+data[i]['ca_codigo']+'</td><td>'+data[i]['ca_descripcion']+'</td><td>'+data[i]['c_hora_apertura']+'</td><td>'+data[i]['c_hora_termino']+'</td></tr>';
                $('#btn'+data[i]['rc_periodo']+'').removeClass('alert-success');
                $('#btn'+data[i]['rc_periodo']+'').addClass('alert-danger');
                $('#btn'+data[i]['rc_periodo']+'').html('Reservado');
            }
            //fila+='</tbody>';
            //$('#fsa_tabla').append(fila);    
        }           
    },'json');    
}

//funcion para llenar el modal reserva cancha.
function pasar_datos_modal(periodo)
{
    $('#mrc_rut').val($('#rc_rut').val());
    $('#mrc_nombres').val($('#rc_nombres').val());
    $('#mrc_clase').val(periodo);
    $('#mrc_socio').val($('#sel_socio').val());
    $('#mrc_fecha').val($('#rc_fecha').val());
    ver_reserva();
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
function cursos_tabla()
{
    var accion = 'buscar_cursos';    
    $.post("core/controller/ConsultasICursosController.php",{accion:accion,descripcion:'',profesor:'',valorSA:'',valorST:''},
    function (data)
    {
        $('#rc_tbody').remove();
        
            var num = data.length;            
            var fila = '<tbody id="rc_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="cursosfila"><td>'+data[i]['c_codigo']+'</td><td>'+data[i]['c_descripcion']+'</td><td>'+data[i]['c_profesor']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#rc_tabla').append(fila);            
            //datatable_ic_tabla();
    },'json');    
}
//funcion que activa plugin datatable en taba fsa_tabla
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

function datatable_tabla_reservas()
{
    $('#mrc_tabla').DataTable(
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
function reserva_clase()
{    
    var accion = 'reservar';
    var rut = $('#mrc_rut').val();
    var nombre = $('#mrc_nombres').val();
    var socio = $('#mrc_socio').val();
    var curso = $('#rc_id').val();
    var clase = $('#mrc_clase').val();
    var valor = $('#mrc_valor').val();
    if(valor === '')
    {
        valor = 0;
    }
    $.post('core/controller/ConsultasRClases.php',{accion:accion,socio:socio,curso:curso,clase:clase,rut:rut,nombre:nombre,fecha:'',valor:valor},
    function(data)
    {
        if(data === 'OK')
        {
            alert(data);            
        }
        else
        {
            alert(data);            
        }
    });
    ver_reserva();
}

function ver_reserva()
{
    var accion = 'ver_reserva';
    var clase = $('#mrc_clase').val();    
    $.post('core/controller/ConsultasRClases.php',{accion:accion,socio:'',curso:'',clase:clase,rut:'',nombre:'',fecha:'',valor:''},
    function(data)
    {
        $('#mrc_tbody').remove();        
        var num = data.length;            
        var fila = '<tbody id="mrc_tbody">';
        for(var i = 0; i < num; i++)
        {
            fila+='<tr style="cursor:pointer" class="reservafila"><td>'+data[i]['ic_id']+'</td><td>'+data[i]['ic_nombre']+'</td><td>'+data[i]['ic_fecha']+'</td></tr>';
        }
        fila+='</tbody>';
        $('#mrc_tabla').append(fila);
        datatable_tabla_reservas();
    },'json');
    
}

function eliminar_reserva()
{
    var accion = 'eliminar';  
    var socio = $('#mrc_eliminar').val();
    var clase = $('#mrc_clase').val();
    $.post('core/controller/ConsultasRClases.php',{accion:accion,socio:socio,curso:'',clase:clase,rut:'',nombre:'',fecha:'',valor:''},
    function(data)
    {
        if(data === 'OK' )
        {            
            ver_reserva();            
            alert('Reserva Eliminada');
            $('#modal_reserva_clase').modal('hide');
        }else
        {
            alert('Error al Eliminar la reserva');
        }
        
    });
}

function limpiar_modal_reserva()
{
    $('#modal_reserva_clase').modal('hide');
    $('#mrc_rut').val('');
    $('#mrc_nombres').val('');
    $('#mrc_clase').val('');
    $('#mrc_socio').val('');
    $('#mrc_fecha').val('');
    $('#mrc_valor').val('');
}
