var id_curso, id_clase, curso;
$(document).on('ready',function(){   
        
    $('#pa_guardar').on('click',function(){
        reserva_clase();
    });

    //evento para selecionar un curso
    $('#rc_tabla').on('click','.cursosfila',function(){
        
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id_curso = $(this).text();                    
                break;  
                case 1:
                    curso = $(this).text();                    
                break;
            }            
        });
        $('#titulo').html(curso);
        consulta_clase(id_curso, curso);      
    });
    
    //evento click en la tabla clases
    $('#rc_thorario').on('click','.clasesfila',function(){       
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id_clase = $(this).text();                    
                break;
                case 4:                    
                    if( $(this).text() <= 0)
                    {
                        alert('Esta clase no tiene cupos disponibles.');
                        $('#pa_guardar').addClass('invi');
                    }
                    else
                    {
                        $('#pa_guardar').removeClass('invi');
                    }
                break;
            }            
        });        
        ver_participantes();    
        $('#modal_participantes').modal('show');
    });
    //funcion para llenar tabla
    cursos_tabla();
});
//function para mostrar las clases de un curso selecionado
function consulta_clase(id, curso)
{
    $('#rc_id').val(id);
    $('#rc_curso').val(curso);
    var accion = 'buscar_clases';    
    $.post("core/controller/ConsultasIClasesController.php",{accion:accion,codigo:id,inicio:'',termino:'',cupos:'',fecha:''},
    function (data)
    {
        if(data !== 'FALSE')
        {
            $('#rc_htbody').remove();        
            var num = data.length;            
            var fila = '<tbody id="rc_htbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="clasesfila"><td>'+data[i]['cl_id']+'</td><td>'+mfecha(data[i]['cl_fecha'])+'</td><td>'+data[i]['cl_horainicio']+'</td><td>'+data[i]['cl_horatermino']+'</td><td>'+data[i]['cl_cupos']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#rc_thorario').append(fila); 
        }        
        //$('#modal_clase_crear').modal('show');
        //datatable_ic_tabla();
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
            datatable_cursos();
    },'json');    
}
//funcion que activa plugin datatable en taba fsa_tabla
function datatable_cursos()
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
    var accion = 'ureservar';
    //var rut = $('#mrc_rut').val();
    //var nombre = $('#mrc_nombres').val();
    //var socio = $('#mrc_socio').val();
    var curso = id_curso;
    var clase = id_clase;    
    $.post('core/controller/ConsultasRClases.php',{accion:accion,socio:'',curso:curso,clase:clase,rut:'',nombre:'',fecha:'',valor:''},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La reserva se realizó con exito.');            
        }
        else
        {
            alert(data);            
        }
    });
    ver_participantes();
}

//funcion para ver los participantes de la clase.
function ver_participantes()
{
    var accion = 'ver_participantes';
    var clase = id_clase;    
    $.post('core/controller/ConsultasRClases.php',{accion:accion,socio:'',curso:'',clase:clase,rut:'',nombre:'',fecha:'',valor:''},
    function(data)
    {
        $('#pa_tbody').remove(); 
        if(data !== 'FALSE')
        {                   
            var num = data.length;            
            var fila = '<tbody id="pa_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr class="reservafila"><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#pa_tabla').append(fila);            
            //datatable_tabla_reservas();
        }
        
    },'json');
    
}

function mfecha(f)
{
    var fecha = f[8].toString()+f[9].toString()+'-'+f[5].toString()+f[6].toString()+'-'+f[0].toString()+f[1].toString()+f[2].toString()+f[3].toString();
    return fecha;
}

