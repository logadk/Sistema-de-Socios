var vsa,vst;
$(document).on('ready',function(){ 
    //evento cuando se cambia la fecha del calendario
    $('#rc_fecha').on('change',function(){
        //verifica que este selecionada una cancha antes de consultar el horario
        if($('#rc_id').val() === '')
        {
            alert('Debes seleccionar una cancha para ver su horario');
            $('#rc_fecha').val('');
            return false;
        }
        //llamada a la funcion que consulta el horario de la cancha
        consulta_horas();
        $('#rc_thorario').removeClass('invi');
    });
    //evento click en boton buscar
    $('#rc_buscar').on('click',function(){
        //evento que llama a la funcion para selecionar un socio
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
    $('#rc_tabla').on('click','.rc_fila',function(){
        var id,desc;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;
                case 1:
                    desc = $(this).text();                    
                break; 
                case 4:
                    vsa = $(this).text();                    
                break;
                case 5:
                    vst = $(this).text();                    
                break;
            }            
        });
        ver_horas(id,desc);
    });
    //evento click boton guardar en modal guardar
    $('#mrc_guardar').on('click',function(){
        reserva_cancha();
    });
    //evento click boton eliminar en modal guardar
    $('#mrc_eliminar').on('click',function(){
        var alert_resp = confirm('¿Desea Borrar Este Registro?');
        if(alert_resp)
        {
            eliminar_reserva();
        }
    });
    //evento click en el periodo de la tabla
    $('#rc_thorario').on('click','.fila_horario',function(){
        if($('#rc_fecha').val() === '')
        {
            alert('Debes seleccionar una fecha antes de continuar');
            $('#rc_fecha').focus();
            return false;
        }
        var periodo,desc;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    periodo = $(this).text();                    
                break;
                case 2:
                    desc = $(this).text();                    
                break;                
            }            
        });
        if($('#btn'+periodo).html() === 'Disponible')
        {
            $('#mrc_guardar').removeClass('invi');           
            $('#mrc_eliminar').addClass('invi');
            if($('#rc_rut').val() === '')
            {
                alert('Debes Selecionar un Socio');
                $('#rc_buscar').focus();
                return false;
            }   
            pasar_datos_modal(periodo);
        }
        else
        {
            ver_reserva(periodo);            
            $('#mrc_guardar').addClass('invi');
            $('#mrc_eliminar').removeClass('invi');            
        }
        //funcion para llenar el modal reserva canchas
        
        $('#modal_reserva_cancha').modal('show');
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
    
    switch ($('#sel_socio').val()) {
        case 'Socio Activo':
             $('#mrc_valor').val(vsa);
            break;
        case 'Socio Transeunte':            
            $('#mrc_valor').val(vst);
            break;
        case 'Familiar Activo':
            $('#mrc_valor').val(vsa);
            break;
        case 'Familiar Transeunte':
            $('#mrc_valor').val(vst);
            break;    
        default:
            
            break;
    }
    $('#mrc_rut').val($('#rc_rut').val());
    $('#mrc_nombres').val($('#rc_nombres').val());
    $('#mrc_periodo').val(periodo);
    $('#mrc_socio').val($('#sel_socio').val());
    $('#mrc_cancha').val($('#rc_id').val());
    $('#mrc_fecha').val($('#rc_fecha').val());
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
    var accion = 'Busca_ca';    
    $.post("core/controller/ConsultasICanchasController.php",{accion:accion,descripcion:'',apertura:'',cierre:'',valorsa:'',valorst:''},
    function (data)
    {
        $('#rc_tbody').remove();        
        var num = data.length;            
        var fila = '<tbody id="rc_tbody">';
        for(var i = 0; i < num; i++)
        {
            fila+='<tr style="cursor:pointer" class="rc_fila"><td>'+data[i]['ca_codigo']+'</td><td>'+data[i]['ca_descripcion']+'</td><td>'+data[i]['c_hora_apertura']+'</td><td>'+data[i]['c_hora_termino']+'</td><td>'+data[i]['ca_valorsa']+'</td><td>'+data[i]['ca_valorst']+'</td></tr>';
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
//funcion para guardar el cliente
function reserva_cancha()
{    
    var accion = 'reservar';
    var rut = $('#mrc_rut').val();
    var socio = $('#mrc_socio').val();
    var cancha = $('#mrc_cancha').val();
    var periodo = $('#mrc_periodo').val();
    var fecha = $('#mrc_fecha').val();
    var valor = $('#mrc_valor').val();
    if(valor === '')
    {
        valor = 0;
    }
    switch (socio) {
        case 'Socio Activo':
                socio = 'socio_activo';            
            break;
        case 'Socio Transeunte':
                socio = 'socio_traseunte';
            break;
        case 'Familiar Activo':
                socio = 'familiar_activo';
            break;
        case 'Familiar Transeunte':
                socio = 'familiar_transeunte';
            break;    
    }
    
    $.post('core/controller/ConsultasRCanchasController.php',{accion:accion,tipo_socio:socio,cancha:cancha,periodo:periodo,rut:rut,fecha:fecha,valor:valor},
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
    consulta_horas();
    limpiar_agregar();
}

function ver_reserva(periodo)
{
    var accion = 'reserva';
    var fecha = $('#rc_fecha').val();
    var cancha = $('#rc_id').val();
    $.post('core/controller/ConsultasRCanchasController.php',{accion:accion,tipo_socio:'',cancha:cancha,periodo:periodo,rut:'',fecha:fecha,valor:''},
    function(data)
    {
        $('#mrc_rut').val(data['RUT']);
        $('#mrc_socio').val(data['SOCIO']);
        $('#mrc_nombres').val(data['NOMBRES']);
        $('#mrc_cancha').val(data['CANCHA']);
        $('#mrc_periodo').val(data['PERIODO']);
        $('#mrc_fecha').val(data['FECHA']);
        $('#mrc_valor').val(data['VALOR']);
        $('#mrc_eliminar').val(data['ID']);
    });
}

function eliminar_reserva()
{
    var accion = 'eliminar';  
    var socio = $('#mrc_eliminar').val();
    $.post('core/controller/ConsultasRCanchasController.php',{accion:accion,tipo_socio:socio,cancha:'',periodo:'',rut:'',fecha:'',valor:''},
    function(data)
    {
        consulta_horas();
        alert('Reserva Eliminada');
        $('#modal_reserva_cancha').modal('hide');
    });
}

function limpiar_agregar()
{
    $('#modal_reserva_cancha').modal('hide');
    $('#mrc_rut').val('');
    $('#mrc_socio').val('');
    $('#mrc_nombres').val('');
    $('#mrc_cancha').val('');
    $('#mrc_periodo').val('');
    $('#mrc_fecha').val('');
    $('#mrc_valor').val('');   
}

function limpiar_tabla_horarios()
{
    for(var i=1;i<16;i++)
    {
        $('#btn'+i+'').removeClass('alert-danger');
        $('#btn'+i+'').addClass('alert-success');
        $('#btn'+i+'').html('Disponible');
    }
}