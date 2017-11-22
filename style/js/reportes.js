$(document).ready(function() {
    $('#consultas_principal').select2();
    $('#consultas_principal').change(function()
    {
        consulta_primaria();
    });
    $('#consultas_segundaria').change(function()
    {
        $('#fechas').addClass('invi');
        $('#consulta3').addClass('invi');
        consulta_segundaria();        
        if(($('#fecha_ini').val() !== '')&&($('#fecha_fin').val() !== ''))
        {
            consultas_tres3();
            //reservas($('#consultas_segundaria').val(),$('#fecha_ini').val(),$('#fecha_fin').val());
            //$('#consulta3').removeClass('invi');
        }
    });
    $('#consultas_terciaria').change(function()
    {
        consulta_terciaria();
    });
    $('#fecha_fin').change(function() 
    {
        if($('#fecha_ini').val() === '')
        {
            alert('Debes Selecionar la Fecha de Inicio');
            $('#fecha_ini').focus();
        }
        else
        {
            consultas_tres3();
            //reservas($('#consultas_segundaria').val(),$('#fecha_ini').val(),$('#fecha_fin').val());
            //$('#consulta3').removeClass('invi');
            //canchas($('#consultas_principal').val());
        }
    });
    $('#fecha_ini').change(function() 
    {
        if($('#fecha_fin').val() !== '')
        {
            consultas_tres3();
        }        
    });
    
    $('#btn-imprime').on('click',function()
    {
        window.print();
    });
    
});

function consulta_primaria()
{
    $('#fechas').addClass('invi');
    $('#consulta3').addClass('invi');
    var consulta=$('#consultas_principal').val();
    switch (consulta) {
        case '1':
                socio_activo(consulta);
            break;
        case '2':
                socio_transeunte(consulta);
            break;    
        case '3':
                competencias(consulta);
            break; 
        case '4':
            //$('#fechas').removeClass('invi');
                canchas(consulta);
            break; 
        case '5':
                //$('#fechas').removeClass('invi');
                cursos(consulta);
            break;    
        default:
            
            break;
    }   
}

function consulta_segundaria()
{
    var consulta=$('#consultas_segundaria').val();
    switch ($('#consultas_principal').val()) {
        case '1':                
                familiar_socio_activo(consulta);
            break;
        case '2':                
                familiar_socio_transeunte(consulta);
            break;
        case '3':                
                competidores(consulta);
            break;
        case '4': 
                $('#fechas').removeClass('invi');
                //reservas(consulta);
            break;
        case '5': 
                $('#fechas').removeClass('invi');
                //reservas(consulta);
            break;    
        default:
            
            break;
    }   
}

function consulta_terciaria()
{
    var var1=$('#consultas_segundaria').val();
    var var2=$('#consultas_terciaria').val();
    switch ($('#consultas_principal').val()) {
        case '4':                
                Participantes(var1,var2);
            break;
        case '5':                
                reserva_clases(var1,var2);
            break;    
        default:
            
            break;
    }   
}


function socio_activo(cons)
{
    $.post('core/controller/ReportesControlador.php',{consulta:cons,var1:0,var:''},
    function (data)
    {
        limpiar_tabla();
        $('#consultas_segundaria').empty();
        $('#panel_titulo').html('Socios Activos');        
        var num = data.length;
        var tabla_head ='<thead id="reporte_thead"><tr><th>Rut</th><th>Nombre</th><th>Fecha</th><th>Celular</th><th>Email</th></tr></thead>';
        var tabla_body = '<tbody id="reporte_tbody">';
        var select ='<option value="0">Seleccione Socio Activo</option>';
        for(var i = 0; i < num; i++)
        {
            tabla_body+='<tr><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td><td>'+data[i]['NACIMIENTO']+'</td><td>'+data[i]['CELULAR']+'</td><td>'+data[i]['EMAIL']+'</td></tr>';
            select+='<option value="'+data[i]['RUT']+'">'+data[i]['NOMBRES']+'</option>';
        }
        tabla_body+='</tbody>';
        $('#consultas_segundaria').append(select);
        $('#reporte_tabla').append(tabla_head);
        $('#reporte_tabla').append(tabla_body);
        $('#consultas_segundaria').select2();
    },'json');
}

function competencias(cons)
{
    $.post('core/controller/ReportesControlador.php',{consulta:cons,var1:0,var:''},
    function (data)
    {
        limpiar_tabla();
        $('#consultas_segundaria').empty();
        $('#panel_titulo').html('Competencias'); 
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Codigo</th><th>Descripción</th><th>Edad Min</th><th>Edad Max</th><th>Fecha</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';
            var select ='<option value="0">Seleccione Competencia</option>';
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['COD']+'</td><td>'+data[i]['DESCRIP']+'</td><td>'+data[i]['EDAD_MIN']+'</td><td>'+data[i]['EDAD_MAX']+'</td><td>'+data[i]['FECHA']+'</td></tr>';
                select+='<option value="'+data[i]['COD']+'">'+data[i]['DESCRIP']+'</option>';
            }
            tabla_body+='</tbody>';
            $('#consultas_segundaria').append(select);
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
            $('#consultas_segundaria').select2();
        }  
        
    },'json');
}

function competidores(cod)
{    
    limpiar_tabla();
    $('#panel_titulo').html($('#consultas_segundaria option:selected').text());    
    $.post('core/controller/ReportesControlador.php',{consulta:'competidores',var1:cod,var:''},
    function (data)
    {
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Codigo</th><th>Rut</th><th>Nombre</th><th>Sexo</th><th>Edad</th><th>Lugar</th><th>Valor</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';        
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['COD']+'</td><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td><td>'+data[i]['SEXO']+'</td><td>'+data[i]['EDAD']+'</td><td>'+data[i]['LUGAR']+'</td><td>'+data[i]['VALOR']+'</td></tr>';

            }
            tabla_body+='</tbody>';        
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
        }            
    },'json');
}

function familiar_socio_activo(rut)
{    
    limpiar_tabla();
    $('#panel_titulo').html($('#consultas_segundaria option:selected').text());    
    $.post('core/controller/ReportesControlador.php',{consulta:'familiar_sa',var1:rut,var:''},
    function (data)
    {
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Rut</th><th>Nombre</th><th>Parentesco</th><th>Nacimiento</th><th>Estado</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';        
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td><td>'+data[i]['PARENTESCO']+'</td><td>'+data[i]['NACIMIENTO']+'</td><td>'+data[i]['ESTADO']+'</td></tr>';

            }
            tabla_body+='</tbody>';        
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
        }            
    },'json');
}

function socio_transeunte(cons)
{
    $.post('core/controller/ReportesControlador.php',{consulta:cons,var1:0,var:''},
    function (data)
    {
        limpiar_tabla();
        $('#consultas_segundaria').empty();
        $('#panel_titulo').html('Socios Transeuntes');        
        var num = data.length;
        var tabla_head ='<thead id="reporte_thead"><tr><th>Rut</th><th>Nombre</th><th>Fecha</th><th>Celular</th><th>Email</th><th>Estado</th></tr></thead>';
        var tabla_body = '<tbody id="reporte_tbody">';
        var select ='<option value="0">Seleccione S_Transeunte</option>';
        for(var i = 0; i < num; i++)
        {
            tabla_body+='<tr><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td><td>'+data[i]['NACIMIENTO']+'</td><td>'+data[i]['CELULAR']+'</td><td>'+data[i]['EMAIL']+'</td><td>'+data[i]['ESTADO']+'</td></tr>';
            select+='<option value="'+data[i]['RUT']+'">'+data[i]['NOMBRES']+'</option>';
        }
        tabla_body+='</tbody>';
        $('#consultas_segundaria').append(select);
        $('#reporte_tabla').append(tabla_head);
        $('#reporte_tabla').append(tabla_body);
        $('#consultas_segundaria').select2();
    },'json');
}

function familiar_socio_transeunte(rut)
{    
    limpiar_tabla();
    $('#panel_titulo').html($('#consultas_segundaria option:selected').text());    
    $.post('core/controller/ReportesControlador.php',{consulta:'familiar_st',var1:rut,var:''},
    function (data)
    {
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Rut</th><th>Nombre</th><th>Parentesco</th><th>Nacimiento</th><th>Estado</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';        
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td><td>'+data[i]['PARENTESCO']+'</td><td>'+data[i]['NACIMIENTO']+'</td><td>'+data[i]['ESTADO']+'</td></tr>';
            }
            tabla_body+='</tbody>';        
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
        }              
    },'json');
}

function canchas(cons)
{
    $.post('core/controller/ReportesControlador.php',{consulta:cons,var1:0,var:''},
    function (data)
    {
        limpiar_tabla();
        $('#consultas_segundaria').empty();
        $('#panel_titulo').html('Canchas'); 
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Codigo</th><th>Descripción</th><th>Apertura</th><th>Cierre</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';
            var select ='<option value="0">Seleccione Cancha</option>';
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['COD']+'</td><td>'+data[i]['DESCRIP']+'</td><td>'+data[i]['APERTURA']+'</td><td>'+data[i]['CIERRE']+'</td></tr>';
                select+='<option value="'+data[i]['COD']+'">'+data[i]['DESCRIP']+'</option>';
            }
            tabla_body+='</tbody>';
            $('#consultas_segundaria').append(select);
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
            $('#consultas_segundaria').select2();
        }  
        
    },'json');
}



function reservas(cod,fech1,fech2)
{    
    limpiar_tabla();
    $('#consultas_terciaria').empty();
    $('#panel_titulo').html($('#consultas_segundaria option:selected').text());    
    $.post('core/controller/ReportesfechaControlador.php',{consulta:'reserva_canchas',var:cod,fecha1:fech1,fecha2:fech2},
    function (data)
    {
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Codigo</th><th>Rut</th><th>Nombre</th><th>Socio</th><th>Periodo</th><th>Fecha</th><th>Valor</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';      
            var select ='<option value="0">Seleccione Reserva</option>';
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['COD']+'</td><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td><td>'+data[i]['SOCIO']+'</td><td>'+data[i]['PERIODO']+'</td><td>'+data[i]['FECHA']+'</td><td>'+data[i]['VALOR']+'</td></tr>';
                select+='<option value="'+data[i]['COD']+'">'+data[i]['COD']+' - '+data[i]['NOMBRES']+'</option>';
            }
            tabla_body+='</tbody>'; 
            $('#consultas_terciaria').append(select);
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
            $('#consultas_terciaria').select2();
        }            
    },'json');
}

function Participantes(cod,cod2)
{    
    limpiar_tabla();
    //$('#consultas_terciaria').empty();
    $('#panel_titulo').html($('#consultas_segundaria option:selected').text()+' - '+$('#consultas_terciaria option:selected').text());    
    $.post('core/controller/ReportesControlador.php',{consulta:'participantes',var1:cod,var:cod2},
    function (data)
    {
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Codigo</th><th>Rut</th><th>Nombre</th><th>Socio</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';      
            var select ='<option value="0">Seleccione Participante</option>';
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['COD']+'</td><td>'+data[i]['RUT']+'</td><td>'+data[i]['NOMBRES']+'</td><td>'+data[i]['SOCIO']+'</td></tr>';
                select+='<option value="'+data[i]['COD']+'">'+data[i]['NOMBRES']+'</option>';
            }
            tabla_body+='</tbody>'; 
            $('#consultas_terciaria').append(select);
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
            $('#consultas_terciaria').select2();
        }            
    },'json');
}

function cursos(cons)
{
    $.post('core/controller/ReportesControlador.php',{consulta:cons,var1:0,var:''},
    function (data)
    {
        limpiar_tabla();
        $('#consultas_segundaria').empty();
        $('#panel_titulo').html('Cursos'); 
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Codigo</th><th>Descripción</th><th>Profesor</th><th>Valor S.A</th><th>Valor S.T</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';
            var select ='<option value="0">Seleccione Curso</option>';
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['COD']+'</td><td>'+data[i]['DESCRIP']+'</td><td>'+data[i]['PROFESOR']+'</td><td>'+data[i]['VALORSA']+'</td><td>'+data[i]['VALORST']+'</td></tr>';
                select+='<option value="'+data[i]['COD']+'">'+data[i]['DESCRIP']+'</option>';
            }
            tabla_body+='</tbody>';
            $('#consultas_segundaria').append(select);
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
            $('#consultas_segundaria').select2();
        }  
        
    },'json');
}

function clases(cod,fech1,fech2)
{    
    limpiar_tabla();
    $('#consultas_terciaria').empty();
    $('#panel_titulo').html($('#consultas_segundaria option:selected').text());    
    $.post('core/controller/ReportesfechaControlador.php',{consulta:'ver_clases',var:cod,fecha1:fech1,fecha2:fech2},
    function (data)
    {
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Codigo</th><th>Inicio</th><th>Termino</th><th>Cupos</th><th>Fecha</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';      
            var select ='<option value="0">Seleccione Clase</option>';
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['COD']+'</td><td>'+data[i]['INICIO']+'</td><td>'+data[i]['TERMINO']+'</td><td>'+data[i]['CUPOS']+'</td><td>'+data[i]['FECHA']+'</td></tr>';
                select+='<option value="'+data[i]['COD']+'">'+data[i]['COD']+' - '+data[i]['FECHA']+'</option>';
            }
            tabla_body+='</tbody>'; 
            $('#consultas_terciaria').append(select);
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
            $('#consultas_terciaria').select2();
        }            
    },'json');
}

function reserva_clases(cod,cod2)
{    
    limpiar_tabla();
    //$('#consultas_terciaria').empty();
    $('#panel_titulo').html($('#consultas_segundaria option:selected').text()+' - '+$('#consultas_terciaria option:selected').text());    
    $.post('core/controller/ReportesControlador.php',{consulta:'r_clase',var1:cod,var:cod2},
    function (data)
    {
        if(data[0]['RES']!=='FALSE')
        {
            var num = data.length;
            var tabla_head ='<thead id="reporte_thead"><tr><th>Codigo</th><th>Nombre</th><th>Rut</th><th>Fecha</th><th>Valor</th><th>Estado</th></tr></thead>';
            var tabla_body = '<tbody id="reporte_tbody">';      
            var select ='<option value="0">Seleccione Participante</option>';
            for(var i = 0; i < num; i++)
            {
                tabla_body+='<tr><td>'+data[i]['COD']+'</td><td>'+data[i]['NOMBRE']+'</td><td>'+data[i]['RUT']+'</td><td>'+data[i]['FECHA']+'</td><td>'+data[i]['VALOR']+'</td><td>'+data[i]['ESTADO']+'</td></tr>';
                //select+='<option value="'+data[i]['COD']+'">'+data[i]['NOMBRES']+'</option>';
            }
            tabla_body+='</tbody>'; 
            //$('#consultas_terciaria').append(select);
            $('#reporte_tabla').append(tabla_head);
            $('#reporte_tabla').append(tabla_body);
            //$('#consultas_terciaria').select2();
        }            
    },'json');
}

function consultas_tres3() 
{
    switch ($('#consultas_principal').val()) 
    {
        case '4':
                reservas($('#consultas_segundaria').val(),$('#fecha_ini').val(),$('#fecha_fin').val());
            break;
        
        case '5':
                clases($('#consultas_segundaria').val(),$('#fecha_ini').val(),$('#fecha_fin').val());
            break;        
    }
    $('#consulta3').removeClass('invi');    
}

function limpiar_tabla()
{    
    $('#reporte_thead').remove();
    $('#reporte_tbody').remove();
}