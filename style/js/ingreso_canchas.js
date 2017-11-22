$(document).on('ready',function(){   
    //evento para selecionar un socio activo de la tabla modal_sa_busca
    $('#ic_tabla').on('click','.filasm',function(){
        var id,descipcion,apertura,cierre;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;
                case 1:
                    descipcion = $(this).text();                    
                break;
                case 2:
                    apertura = $(this).text();                    
                break;
                case 3:
                    cierre = $(this).text();                    
                break;
            }            
        });
        //pasar_datos(id,descipcion,apertura,cierre);
    });
    //funcion para llenar tabla
    llenar_ic_tabla();
});
//function para pasar el nombre y el rut selecionado al fomulario socio transeunte
function pasar_datos( id,descripcion,apertura,cierre)
{
    $('#sa_rut').val(rut);
    $('#sa_nombres').val(nombres);
    $('#modal_sa_busca').modal('hide');
    buscar_familiares(rut);
}

//function buscar_familiares(rut)
//{        
//    var accion = 'busca_familiar';
//    //$('#modal_sa_titulo').html('Buscar Socio Activo');
//    $.post("core/controller/ConsultasFSaController.php",{accion:accion,sa_rut:rut,nombres:'',rut:'',parentesco:'',fecha:''},
//    function (data)
//    {        
//        if(data !== 'false')
//        {            
//            $('#fsa_tbody').remove();        
//            var num = data.length;
//            var fila = '<tbody id="fsa_tbody">';
//            for(var i = 0; i < num; i++)
//            {
//                fila+='<tr><td>'+data[i]['ca_codigo']+'</td><td>'+data[i]['ca_descripcion']+'</td><td>'+data[i]['c_hora_apertura']+'</td><td>'+data[i]['c_hora_termino']+'</td></tr>';
//            }
//            fila+='</tbody>';
//            $('#fsa_tabla').append(fila);    
//        }                
//            datatable_sa_familiar();
//    },'json');    
//}

function llenar_ic_tabla()
{
    var accion = 'Busca_ca';    
    $.post("core/controller/ConsultasICanchasController.php",{accion:accion,descripcion:'',apertura:'',cierre:'',valorsa:'',valorst:''},
    function (data)
    {
        $('#ic_tbody').remove();
        
            var num = data.length;            
            var fila = '<tbody id="ic_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="filasm"><td>'+data[i]['ca_codigo']+'</td><td>'+data[i]['ca_descripcion']+'</td><td>'+data[i]['c_hora_apertura']+'</td><td>'+data[i]['c_hora_termino']+'</td><td>'+data[i]['ca_valorsa']+'</td><td>'+data[i]['ca_valorst']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#ic_tabla').append(fila);            
            datatable_ic_tabla();
    },'json');    
}
//funcion que activa plugin datatable en taba fsa_tabla
function datatable_ic_tabla()
{
    $('#ic_tabla').DataTable(
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
function add_cancha()
{
    if($('#ic_descripcion').val() === "")
    {
        alert('Debes ingresar una descripción de la cancha');
        $('#ic_descripcion').focus();
        return false;
    }    
    if($('#ic_apertura').val() === "")
    {
        alert('Debes Llenar el campo Apertura');
        $('#ic_apertura').focus();
        return false;
    }
    if($('#ic_cierre').val() === "")
    {
        alert('Debes Llenar el campo Cierre');
        $('#ic_cierre').focus();
        return false;
    }
    
    var accion = 'insertar';
    var descripcion = $('#ic_descripcion').val();
    var apertura = $('#ic_apertura').val();
    var cierre = $('#ic_cierre').val(); 
    var valorsa = $('#ic_valorsa').val();
    var valorst = $('#ic_valorst').val();
    $.post('core/controller/ConsultasICanchasController.php',{accion:accion,descripcion:descripcion,apertura:apertura,cierre:cierre,valorsa:valorsa,valorst:valorst},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La Cancha '+descripcion+' Fue Ingresada de forma correcta.');            
        }
        else
        {
            alert(data);            
        }
    });
    limpiar_afregar();
    llenar_ic_tabla();
}

function limpiar_afregar()
{
    $('#ic_descripcion').val('');
    $('#ic_apertura').val('');
    $('#ic_cierre').val('');    
}