$(document).on('ready',function(){   
    $('#ccs_guardar').on('click',function(){        
        add_cuota();
    });
    //evento click en boton eliminar en modal_cuotas
    $('#mec_eliminar').on('click',function(){
        var ress = confirm('Si Elimina esta cuota se borraran todos los pagos asociados a ella. ¿Desea Continuar?');
        if (ress === true) 
        {
            eliminar_cuota();   
        }       
    });   
//    evento al presionar el boton editar
    $('#mec_editar').on('click',function () {
        var ress = confirm('Deseas Guardar los cambios de la Cuota');
        if (ress === true) 
        {
            update_cuota();  
        } 
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
    $('#ccs_tabla').on('click','.cuotasfila',function(){
        var id;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:                    
                    id = $(this).text();                    
                break;                
            }            
        });
        activa_editar(id);
        //pasar_datos(id);
    });
    //funcion para llenar tabla
    cuotas_tabla();
});

function botones(){
    //$('#mcc_editar').removeClass('visible');
    $('#mcc_editar').addClass('invi');
    $('#mcc_guardar').removeClass('invi');
    //$('#mcc_guardar').addClass('visible');
}
function activa_editar(id) {
    $('#mec_editar').val(id);   
    $('#mec_eliminar').val(id);
    var accion = 'ver_cuota';  
    $.post("core/controller/ConsultasCuotas.php",{accion:accion,id:id,descripcion:'',nombre:'',valorSA:''},
    function (data)
    {
        $('#mec_nombre').val(data['NOMBRE']);
        $('#mec_descrip').val(data['DESCRIP']);
        $('#mec_fecha').val(data['FECHA']);
        $('#mec_valor').val(data['VALOR']);
    },'json');  
    $('#modal_editar_cuotas').modal('show');
    //$('#mcc_editar').addClass('visible');    
}
//function para pasar el nombre y el rut selecionado al fomulario socio transeunte
function pasar_datos( id)
{
    $('#mcc_guardar').val(id);
    //$('#mcc_editar').val(id);
    var accion = 'buscar_clases';    
    $.post("core/controller/ConsultasIClasesController.php",{accion:accion,codigo:id,inicio:'',termino:'',cupos:'',fecha:''},
    function (data)
    {
        if(data === 'FALSE')
        {
            
        }
        else
        {
            $('#mcc_tbody').remove();        
            var num = data.length;            
            var fila = '<tbody id="mcc_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="clasesfila"><td>'+data[i]['cl_id']+'</td><td>'+data[i]['cl_fecha']+'</td><td>'+data[i]['cl_horainicio']+'</td><td>'+data[i]['cl_horatermino']+'</td><td>'+data[i]['cl_cupos']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#mcc_tabla').append(fila);          
        }
        $('#modal_clase_crear').modal('show');
        //datatable_ic_tabla();
    },'json');  
}

function eliminar_cuota()
{
    var accion = 'eliminar_cuota';
    var id = $('#mec_eliminar').val();
    $.post("core/controller/ConsultasCuotas.php",{accion:accion,id:id,descripcion:'',nombre:'',valorSA:''},
    function (data)
    {
        if(data === 'OK')
        {
            alert('La Cuota Fue Eliminada con Exito');
        }
        $('#modal_editar_cuotas').modal('hide');
        cuotas_tabla();
    },'json');    
}

//funcion para mostrar las cuotas en la tabla
function cuotas_tabla()
{
    var accion = 'buscar_cuotas';    
    $.post("core/controller/ConsultasCuotas.php",{accion:accion,id:'',descripcion:'',nombre:'',valorSA:''},
    function (data)
    {
        $('#ccs_tbody').remove();
        
            var num = data.length;            
            var fila = '<tbody id="ccs_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="cuotasfila"><td>'+data[i]['p_id']+'</td><td>'+data[i]['p_nombre']+'</td><td>'+data[i]['p_fecha']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#ccs_tabla').append(fila);            
            datatable_cuota_tabla();
    },'json');    
}
//funcion que activa plugin datatable en taba fsa_tabla
function datatable_cuota_tabla()
{
    $('#ccs_tabla').DataTable(
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
//funcion para agregar un curso
function add_cuota()
{    
    if($('#ccs_nombre').val() === "")
    {
        alert('Debes asignar un Nombre');
        $('#ccs_nombre').focus();
        return false;
    }    
    
    var accion = 'insertar';
    var nombre = $('#ccs_nombre').val();
    var descripcion = $('#ccs_descripcion').val();
    var valorsa = $('#ccs_valorsa').val();    
    if(valorsa === "")
    {
        valorsa = 0;
    }    
    $.post('core/controller/ConsultasCuotas.php',{accion:accion,id:'',descripcion:descripcion,nombre:nombre,valorSA:valorsa},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La Cuota '+nombre+' Fue Ingresada de forma correcta.');            
        }
        else
        {
            alert(data);            
        }
    });
    limpiar_agregar();
    cuotas_tabla();
}

//funcion para editar las clases
function update_cuota() {
    if($('#mec_nombre').val() === "")
    {
        alert('Debes asignar un Nombre');
        $('#mec_nombre').focus();
        return false;
    }    
    
    var accion = 'update';
    var id = $('#mec_editar').val();
    var nombre = $('#mec_nombre').val();
    var descripcion = $('#mec_descrip').val();     
    $.post('core/controller/ConsultasCuotas.php',{accion:accion,id:id,descripcion:descripcion,nombre:nombre,valorSA:''},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La Cuota '+nombre+' Fue Editada de forma correcta.');            
        }
        else
        {
            alert(data);            
        }
    });
    $('#modal_editar_cuotas').modal('hide');
    cuotas_tabla();
}

function limpiar_agregar()
{       
    $('#ccs_nombre').val('');
    $('#ccs_descripcion').val('');
    $('#ccs_valorsa').val('');    
}