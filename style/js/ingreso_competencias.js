/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('ready',function () {
    //evento al dar click al boton editar
    $('#ic_editar').on('click',function () {
        update_competencia(); 
    });
    //evento al dar click al boton cancelar
    $('#ic_cancelar').on('click',function () {
        limpiar();
        $('#ic_editar').addClass('invi');
        $('#ic_cancelar').addClass('invi');
        $('#ic_agregar').removeClass('invi');
    });
    //evento para selecionar un socio activo de la tabla modal_sa_busca
    $('#ic_tabla').on('click','.filascompe',function(){
        var id;
        $(this).children('td').each(function(index){            
            switch (index)
            {
                case 0:
                    id = $(this).text();                    
                break;                
            }            
        });
        mostrar(id);
    });
    //funcion para ver las competencias en la tabla ic_tabla
    ver_competencias();
});

function add_competencia() {
    var descrip = $('#ic_descripcion').val();
    var cupos = $('#ic_cupos').val();
    var edmin = $('#ic_edadminima').val();
    var edmax = $('#ic_edadmaxima').val();
    var fecha = $('#ic_fecha').val();
    var accion = 'ingreso';
    $.post('core/controller/ConsultasICompetencias.php',{accion:accion,codigo:'',descrip:descrip,edad_minima:edmin,edad_maxima:edmax,cupos:cupos,fecha:fecha},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La Competencia '+descrip+' Fue Ingresada de forma correcta.');            
        }
        else
        {
            alert(data);            
        }
    },'json');
    limpiar();
    ver_competencias();
}

function update_competencia() {
    
    if($('#ic_descripcion').val() === '')
    {
        alert('Debes llenar el cuadro Descripción');
        $('#ic_descripcion').focus();
        return false;
    }
    if($('#ic_edadminima').val() === '')
    {
        alert('Debes llenar el cuadro Edad Minima');
        $('#ic_edadminima').focus();
        return false;
    }
    if($('#ic_edadmaxima').val() === '')
    {
        alert('Debes llenar el cuadro Edad Maxima');
        $('#ic_edadmaxima').focus();
        return false;
    }
    if($('#ic_cupos').val() === '')
    {
        alert('Debes llenar el cuadro Cupos');
        $('#ic_cupos').focus();
        return false;
    }
    if($('#ic_fecha').val() === '')
    {
        alert('Debes selecionar una fecha');
        $('#ic_fecha').focus();
        return false;
    }
    var descrip = $('#ic_descripcion').val();
    var cupos = $('#ic_cupos').val();
    var edmin = $('#ic_edadminima').val();
    var edmax = $('#ic_edadmaxima').val();
    var fecha = $('#ic_fecha').val();
    var codigo = $('#ic_editar').val();
    var accion = 'editar';
    $.post('core/controller/ConsultasICompetencias.php',{accion:accion,codigo:codigo,descrip:descrip,edad_minima:edmin,edad_maxima:edmax,cupos:cupos,fecha:fecha},
    function(data)
    {
        if(data === 'OK')
        {
            alert('La Competencia '+descrip+' Fue Editada de forma correcta.');  
            ver_competencias();
        }
        else
        {
            alert(data);            
        }
    },'json');
    limpiar();
    $('#ic_editar').addClass('invi');
    $('#ic_cancelar').addClass('invi');
    $('#ic_agregar').removeClass('invi');
    
}

function ver_competencias() {
    var accion = 'ver_competencias';    
    $.post("core/controller/ConsultasICompetencias.php",{accion:accion,codigo:'',descrip:'',edad_minima:'',edad_maxima:'',cupos:'',fecha:''},
    function (data)
    {
        $('#ic_tbody').remove();
        
            var num = data.length;            
            var fila = '<tbody id="ic_tbody">';
            for(var i = 0; i < num; i++)
            {
                fila+='<tr style="cursor:pointer" class="filascompe"><td>'+data[i]['cp_codigo']+'</td><td>'+data[i]['cp_descripcion']+'</td><td>'+data[i]['cp_fecha']+'</td></tr>';
            }
            fila+='</tbody>';
            $('#ic_tabla').append(fila);            
            //datatable_ic_tabla();
    },'json');    
}

function mostrar(id) {
    var accion = 'prepara_edit';   
    $.post("core/controller/ConsultasICompetencias.php",{accion:accion,codigo:id,descrip:'',edad_minima:'',edad_maxima:'',cupos:'',fecha:''},
    function (data)
    {
        $('#ic_descripcion').val(data[0]['cp_descripcion']);
        $('#ic_cupos').val(data[0]['cp_cupos']);
        $('#ic_edadminima').val(data[0]['cp_edad_minima']);
        $('#ic_edadmaxima').val(data[0]['cp_edad_maxima']);
        $('#ic_fecha').val(data[0]['cp_fecha']);
        $('#ic_editar').val(data[0]['cp_codigo']);
        
    },'json'); 
    $('#ic_editar').removeClass('invi');
    $('#ic_cancelar').removeClass('invi');
    $('#ic_agregar').addClass('invi');
    
}

function limpiar() {
    $('#ic_descripcion').val('');
    $('#ic_cupos').val('');
    $('#ic_edadminima').val('');
    $('#ic_edadmaxima').val('');
    $('#ic_fecha').val('');
}