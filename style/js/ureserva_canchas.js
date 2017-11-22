var id_cancha,cancha,inicio,cierre,periodo,estado,reserva ;

$(document).on('ready',function(){ 

    $('#pa_guardar').on('click',function(){
        participar();
        ver_reserva();
    });

    //evento al hacer click en la tabla canchas
    $('#rc_tabla').on('click','.rc_fila',function(){
        //var id,desc,inicio,cierre;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id_cancha = $(this).text();                    
                break;
                case 1:
                    cancha = $(this).text();                    
                break;
                case 2:
                    inicio = $(this).text();
                break;
                case 3:
                    cierre = $(this).text();
                break;
            }            
        });
        //alert('hola');
        consulta_horas(id_cancha,inicio,cierre);
    });
    
    //evento click en el periodo de la tabla horario
    $('#rc_thorario').on('click','.fila_horario',function(){
//        
        var horas,desc;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    periodo = $(this).text();                    
                break;
                case 1:
                    horas = $(this).text();
                break;
                case 2:
                    estado = $(this).text();                    
                break;                
            }            
        });
        if(estado === 'Disponible')
        {            
            var resp = confirm('Quieres Reservar el periodo "'+horas+'" de la cancha "'+cancha+'" en la fecha '+mfecha($('#rc_fecha').val()));
            if(resp)
            {
                reserva_cancha();
            }
        }
        else
        {
            //alert(estado);
            reserva = $('#btnn'+periodo).val();            
            ver_reserva();            
//            $('#mrc_guardar').addClass('invi');
//            $('#mrc_eliminar').removeClass('invi');            
        }
        //funcion para llenar el modal reserva canchas
        
        //$('#modal_reserva_cancha').modal('show');
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
//funcion que consulta el horario de las canchas segun la cancha y la fecha selecionada
function consulta_horas(id,inicio,cierre)
{
    var horario = ['06:00:00','07:00:00','08:00:00','09:00:00','10:00:00','11:00:00','12:00:00','13:00:00','14:00:00','15:00:00','16:00:00','17:00:00','18:00:00','19:00:00','20:00:00','21:00:00','22:00:00'];
    var periodos =['06:00-06:59','07:00-07:59','08:00-08:59','09:00-09:59','10:00-10:59','11:00-11:59','12:00-12:59','13:00-13:59','14:00-14:59','15:00-15:59','16:00-16:59','17:00-17:59','18:00-18:59','19:00-19:59','20:00-20:59','21:00-21:59','22:00-22:59'];
    var ini, cie;
    for(var e=0; e <= 16; e++)
    {
        if(horario[e] === inicio)
        {
            ini = e;
        }
        if(horario[e] === cierre)
        {
            cie = e;
        }
    }
    //seccion para crear tabla de horarios segun apertura y cierre.
    //====================================================
    $('#rc_htbody').remove();        
        
    var fila = '<tbody id="rc_htbody">';
    for(ini; ini <= cie; ini++)
    {
        fila+='<tr style="cursor:pointer" class="fila_horario"><td>'+ini+'</td><td>'+periodos[ini]+'</td><td id="btn'+ini+'" class="alert alert-success">Disponible</td></tr>';
    }
    fila+='</tbody>';
    $('#rc_thorario').append(fila);            
    datatable_rc_tabla();
    //====================================================
//    limpiar_tabla_horarios();
    var accion = 'horario';
    var fecha = $('#rc_fecha').val();
    var cancha = id;    
    $.post("core/controller/ConsultasRCanchasController.php",{accion:accion,tipo_socio:'',cancha:cancha,periodo:'',rut:'',fecha:fecha,valor:''},
    function (data)
    {       
        
        if(data !== 'FALSE')
        {
            var num = data.length;
            for(var i = 0; i < num; i++)
            {
                        
                //fila+='<tr><td>'+data[i]['ca_codigo']+'</td><td>'+data[i]['ca_descripcion']+'</td><td>'+data[i]['c_hora_apertura']+'</td><td>'+data[i]['c_hora_termino']+'</td></tr>';
                $('#btn'+data[i]['PERIODO']+'').removeClass('alert-success');
                $('#btn'+data[i]['PERIODO']+'').addClass('alert-danger');
                $('#btn'+data[i]['PERIODO']+'').html(data[i]['NOMBRES']+'<button type="button" class="invi" id="btnn'+data[i]['PERIODO']+'" value="'+data[i]['ID']+'"></button>');
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
    $('#mrc_periodo').val(periodo);
    $('#mrc_socio').val($('#sel_socio').val());
    $('#mrc_cancha').val($('#rc_id').val());
    $('#mrc_fecha').val($('#rc_fecha').val());
}
//funcion que llena la tabla con las canchas creadas
function llenar_rc_tabla()
{
    var accion = 'Busca_ca';    
    $.post("core/controller/ConsultasICanchasController.php",{accion:accion,descripcion:'',apertura:'',cierre:'',valorsa:'',valorst:''},
    function (data)
    {
        $('#rc_tbody').remove();        
        var num = data.length;            
        var fila = '<tbody id="rc_tbody">';
        for(var i = 0; i < num; i++)
        {
            fila+='<tr style="cursor:pointer" class="rc_fila"><td>'+data[i]['ca_codigo']+'</td><td>'+data[i]['ca_descripcion']+'</td><td>'+data[i]['c_hora_apertura']+'</td><td>'+data[i]['c_hora_termino']+'</td></tr>';
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

//funcion para guardar el cliente
function reserva_cancha()
{    
    var accion = 'user_reservar';    
    //var cancha = $('#mrc_cancha').val();
    //var periodo = $('#mrc_periodo').val();
    var fecha = $('#rc_fecha').val();
    var valor = 0;    
    $.post('core/controller/ConsultasRCanchasController.php',{accion:accion,tipo_socio:'',cancha:id_cancha,periodo:periodo,rut:'',fecha:fecha,valor:valor},
    function(data)
    {
        alert(data);      
    });
    consulta_horas(id_cancha,inicio,cierre);
    //limpiar_agregar();
}

function ver_reserva()
{
    var accion = 'user_reserva';
    //var fecha = $('#rc_fecha').val();
    //var cancha = $('#rc_id').val();
    $.post('core/controller/ConsultasParticipar.php',{accion:accion,tipo_socio:'',cancha:id_cancha,reserva_id:reserva,rut:''},
    function(data)
    {
        $('#pa_tbody').remove(); 
        if (data !== 'FALSE')
        {                   
            var num = data.length;            
            var fila = '<tbody id="pa_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr class="pa_fila"><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#pa_tabla').append(fila);           
        }
    });
    $('#modal_participantes').modal('show');
}

function participar()
{
    var accion = 'participar';      
    $.post('core/controller/ConsultasParticipar.php',{accion:accion,tipo_socio:'',cancha:id_cancha,reserva_id:reserva,rut:''},
    function(data)
    {
        if(data === 'OK')
        {
            alert('Su Participación fue agregada con exito');
        }
        //alert(data);      
    });
    
}

//function eliminar_reserva()
//{
//    var accion = 'eliminar';  
//    var socio = $('#mrc_eliminar').val();
//    $.post('core/controller/ConsultasRCanchasController.php',{accion:accion,tipo_socio:socio,cancha:'',periodo:'',rut:'',fecha:'',valor:''},
//    function(data)
//    {
//        consulta_horas();
//        alert('Reserva Eliminada');
//        $('#modal_reserva_cancha').modal('hide');
//    });
//}

function mfecha(f)
{
    var fecha = f[8].toString()+f[9].toString()+'-'+f[5].toString()+f[6].toString()+'-'+f[0].toString()+f[1].toString()+f[2].toString()+f[3].toString();
    return fecha;
}

//function limpiar_agregar()
//{
//    $('#modal_reserva_cancha').modal('hide');
//    $('#mrc_rut').val('');
//    $('#mrc_socio').val('');
//    $('#mrc_nombres').val('');
//    $('#mrc_cancha').val('');
//    $('#mrc_periodo').val('');
//    $('#mrc_fecha').val('');
//    $('#mrc_valor').val('');   
//}

function limpiar_tabla_horarios()
{
    for(var i=1;i<16;i++)
    {
        $('#btn'+i+'').removeClass('alert-danger');
        $('#btn'+i+'').addClass('alert-success');
        $('#btn'+i+'').html('Disponible');
    }
}