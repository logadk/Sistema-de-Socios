$(document).on('ready',function(){   
    $('#mcc_guardar').on('click',function(){
        add_clase();
    });
    //evento al presionar el boton salir
    $('#mcc_cerrar').on('click',function() {
        limpiar_clases(); 
    });
    //evento al presionar el boton editar
    $('#mcc_editar').on('click',function () {
        update_clase(); 
    });
    //evento para selecionar un socio activo de la tabla modal_sa_busca
    $('#icu_tabla').on('click','.cursosfila',function(){
        var id;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;                               
            }            
        });
        pasar_datos(id);
        botones();
    });
    //evento al cliquear la tabla
    $('#mcc_tabla').on('click','.clasesfila',function(){
        var id;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;
                case 1:
                    $('#mcc_fecha').val($(this).text());                    
                break;
                case 2:
                    $('#mcc_inicio').val($(this).text());                    
                break;
                case 3:
                    $('#mcc_termino').val($(this).text());                    
                break;
                case 4:
                    $('#mcc_cupos').val($(this).text());                    
                break;
            }            
        });
        activa_editar(id);
        //pasar_datos(id);
    });
    //funcion para llenar tabla
    cursos_tabla();
});

function botones(){
    //$('#mcc_editar').removeClass('visible');
    $('#mcc_editar').addClass('invi');
    $('#mcc_guardar').removeClass('invi');
    //$('#mcc_guardar').addClass('visible');
}
function activa_editar(id) {
    $('#mcc_editar').val(id);
    $('#mcc_guardar').addClass('invi');
    $('#mcc_editar').removeClass('invi');
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
//funcion para editar las clases


function cursos_tabla()
{
    var accion = 'buscar_cursos';    
    $.post("core/controller/ConsultasICursosController.php",{accion:accion,descripcion:'',profesor:'',valorSA:'',valorST:''},
    function (data)
    {
        $('#icu_tbody').remove();
        
            var num = data.length;            
            var fila = '<tbody id="icu_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="cursosfila"><td>'+data[i]['c_codigo']+'</td><td>'+data[i]['c_descripcion']+'</td><td>'+data[i]['c_profesor']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#icu_tabla').append(fila);            
            datatable_ic_tabla();
    },'json');    
}
//funcion que activa plugin datatable en taba fsa_tabla
function datatable_ic_tabla()
{
    $('#icu_tabla').DataTable(
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

function datatable_mcc_tabla()
{
    $('#mcc_tabla').DataTable(
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
function add_curso()
{
    if($('#icu_descripcion').val() === "")
    {
        alert('Debes ingresar una descripción de la cancha');
        $('#icu_descripcion').focus();
        return false;
    }    
    if($('#icu_profesor').val() === "")
    {
        alert('Debes Llenar el campo Profesor');
        $('#icu_profesor').focus();
        return false;
    }    
    
    var accion = 'insertar';
    var descripcion = $('#icu_descripcion').val();
    var profesor = $('#icu_profesor').val();
    var valorsa = $('#icu_valorsa').val(); 
    var valorst = $('#icu_valorst').val();
    if(valorsa === "")
    {
        valorsa = 0;
    }
    if(valorst === "")
    {
        valorst = 0;
    }
    $.post('core/controller/ConsultasICursosController.php',{accion:accion,descripcion:descripcion,profesor:profesor,valorSA:valorsa,valorST:valorst},
    function(data)
    {
        if(data === 'OK')
        {
            alert('El Curso '+descripcion+' Fue Ingresado de forma correcta.');            
        }
        else
        {
            alert(data);            
        }
    });
    limpiar_agregar();
    cursos_tabla();
}

//funcion para guarda la clase segun el curso seleccionado
function add_clase()
{
    if($('#mcc_inicio').val() === '')
    {
        alert('Debes Ingresar una hora de inicio');
        $('#mcc_inicio').focus();
        return false;
    }
    if($('#mcc_termino').val() === '')
    {
        alert('Debes Ingresar una hora de Termino');
        $('#mcc_termino').focus();
        return false;
    }
    if($('#mcc_cupos').val() === '')
    {
        alert('Debes indicar la cantidad de cupo de la clase');
        $('#mcc_cupos').focus();
        return false;
    }
    if($('#mcc_fecha').val() === '')
    {
        alert('Debes Indicar una fecha');
        $('#mcc_fecha').focus();
        return false;
    }
    var accion = 'insertar';
    var codigo = $('#mcc_guardar').val();
    var inicio = $('#mcc_inicio').val();
    var termino = $('#mcc_termino').val(); 
    var cupos = $('#mcc_cupos').val();
    var fecha = $('#mcc_fecha').val();    
    $.post('core/controller/ConsultasIClasesController.php',{accion:accion,codigo:codigo,inicio:inicio,termino:termino,cupos:cupos,fecha:fecha},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La clase Fue Ingresada de forma correcta.');            
        }
        else
        {
            alert(data);            
        }
    });
    limpiar_clases();
    pasar_datos($('#mcc_guardar').val());
}

//funcion para editar las clases
function update_clase() {
    if($('#mcc_inicio').val() === '')
    {
        alert('Debes Ingresar una hora de inicio');
        $('#mcc_inicio').focus();
        return false;
    }
    if($('#mcc_termino').val() === '')
    {
        alert('Debes Ingresar una hora de Termino');
        $('#mcc_termino').focus();
        return false;
    }
    if($('#mcc_cupos').val() === '')
    {
        alert('Debes indicar la cantidad de cupo de la clase');
        $('#mcc_cupos').focus();
        return false;
    }
    if($('#mcc_fecha').val() === '')
    {
        alert('Debes Indicar una fecha');
        $('#mcc_fecha').focus();
        return false;
    }
    var accion = 'editar';
    var codigo = $('#mcc_editar').val();
    var inicio = $('#mcc_inicio').val();
    var termino = $('#mcc_termino').val(); 
    var cupos = $('#mcc_cupos').val();
    var fecha = $('#mcc_fecha').val();    
    $.post('core/controller/ConsultasIClasesController.php',{accion:accion,codigo:codigo,inicio:inicio,termino:termino,cupos:cupos,fecha:fecha},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La clase Fue Editada de forma correcta.');            
        }
        else
        {
            alert(data);            
        }
    });
    limpiar_clases();
    botones();
    pasar_datos($('#mcc_guardar').val());
}

//funcion para limpiar los input del formulario cursos
function limpiar_agregar()
{
    $('#icu_descripcion').val('');
    $('#icu_profesor').val('');
    $('#icu_valorsa').val('');
    $('#icu_valorst').val('');
}
//function para limpiar los input del formulario clases
function limpiar_clases()
{
    $('#mcc_codigo').val('');
    $('#mcc_inicio').val('');
    $('#mcc_termino').val('');
    $('#mcc_cupos').val('');
    $('#mcc_fecha').val('');
}