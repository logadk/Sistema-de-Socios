$(document).on('ready',function(){       
    //evento seleccionar una cuota del sel_cuotas
    $('#sel_cuota').on('change',function () {
        ver_pagos();
    });
    
    //evento para selecionar un socio activo de la tabla modal_sa_busca
//    $('#icu_tabla').on('click','.cursosfila',function(){
//        var id;
//        $(this).children('td').each(function(index){            
//            switch (index)
//            {
//                case 0:
//                    id = $(this).text();                    
//                break;                               
//            }            
//        });
//        pasar_datos(id);
//        botones();
//    });
    //evento al cliquear la tabla
    
    cargar_cuotas();
    datatable_pagos_tabla();
});

function cargar_cuotas() {    
    var accion = 'buscar_cuotas';    
    $.post("core/controller/ConsultasCuotas.php",{accion:accion,id:'',descripcion:'',nombre:'',valorSA:''},
    function (data)
    {                
        var num = data.length;            
        var select ='';
        for(var i = 0; i < num; i++)
        {
            select+='<option value="'+data[i]['p_id']+'">'+data[i]['p_nombre']+'</option>';
        }        
        $('#sel_cuota').append(select); 
        $('#sel_cuota').select2();
        //datatable_cuota_tabla();
    },'json'); 
}
//function para pasar el nombre y el rut selecionado al fomulario socio transeunte
function ver_pagos()
{
    var p_id = $('#sel_cuota').val();
    //$('#mcc_editar').val(id);
    var accion = 'ver_pagos';    
    $.post("core/controller/ConsultasPagos.php",{accion:accion,id:'',rut:'',fecha:'',monto:'',p_id:p_id},
    function (data)
    {
        if(data[0]['RES'] === 'OK')
        {
            $('#pcs_tbody').remove();        
            var num = data.length;            
            var fila = '<tbody id="pcs_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="pagosfila"><td>'+data[i]['ID']+'</td><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRE']+'</td><td>'+data[i]['VALOR']+'</td><td>'+data[i]['ESTADO']+'</td><td><button type="button" class="btn btn-xs btn-primary" title="Pagar" onclick="pagar('+data[i]['ID']+');" id="ccs_agregar"><span class="glyphicon glyphicon-usd"></span></button></td></tr>';
            }
            fila+='</tbody>';
            $('#pcs_tabla').append(fila); 
        }
        
        datatable_pagos_tabla();
        //datatable_ic_tabla();
    },'json');  
}
//funcion que activa plugin datatable en taba fsa_tabla
function datatable_pagos_tabla()
{
    $('#pcs_tabla').DataTable(
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


//funcion para editar las clases
function pagar(id) {    
    var accion = 'pagar';    
    var ress = confirm('Deseas Pagar la Cuota');
        if (ress === true) 
        {
            $.post("core/controller/ConsultasPagos.php",{accion:accion,id:id,rut:'',fecha:'',monto:'',p_id:''},
            function(data)
            {
                if(data === 'OK')
                {
                    alert('La Cuota Fue Pagada de forma correcta.');            
                }
                else
                {
                    alert('La Cuota no pudo ser pagada');            
                }
            });             
        }
        ver_pagos();
}

function limpiar_agregar()
{       
    $('#ccs_nombre').val('');
    $('#ccs_descripcion').val('');
    $('#ccs_valorsa').val('');    
}