var id_competencia;
$(document).on('ready',function(){     
    $('#pa_guardar').on('click',function(){
        inscribe_competencia();
    });

    //evento para ver las competencias creadeas
    $('#rc_tabla').on('click','.rc_fila',function(){
        var descr;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id_competencia = $(this).text();                    
                break;
                case 1:
                    descr = $(this).text();
                break;
                case 2:
                    if( $(this).text() <= 0)
                    {
                        alert('¿La competencia ya no tiene cupos disponibles'); 
                        $('#pa_guardar').addClass('invi');
                    }
                    else
                    {
                        $('#pa_guardar').removeClass('invi');
                    }                    
                break;                
            }            
        });        
        ver_participantes(id_competencia);
        $('#modal_participantes').modal('show');
    });    
    llenar_rc_tabla();
});

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
//funcion para inscribir la competencia
function inscribe_competencia()
{    
    var accion = 'uinscribir';
    var competencia = id_competencia;
    $.post('core/controller/ConsultasRCompetencias.php',{accion:accion,id:'',competencia:competencia,rut:'',nombres:'',sexo:'',edad:'',lugar:'',valor:''},
    function(data)
    {        
        alert(data);
    });
    ver_participantes(id_competencia);
    llenar_rc_tabla();
    //limpiar_modal_inscripcion();
}
function ver_participantes(competencia)
{
    var accion = 'participantes';    
    $.post('/core/controller/ConsultasRCompetencias.php',{accion:accion,id:'',competencia:competencia,rut:'',nombres:'',sexo:'',edad:'',lugar:'',valor:''},
    function(data)
    {
        $('#pa_tbody').remove();
        if(data !== 'FALSE')
        {                    
            var num = data.length;            
            var fila = '<tbody id="pa_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr class="mrc_fila"><td>'+data[i]['icp_rut']+'</td><td>'+data[i]['icp_nombres']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#pa_tabla').append(fila);
        }           
        //datatable_modal();
    },'json');
}