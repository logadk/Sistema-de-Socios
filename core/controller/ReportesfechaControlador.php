<?php
require_once '../model/ReportesModel.php';
header('content-type: application/json');
$cons = new Reportes();
$consulta = $_POST['consulta'];
$var1 = $_POST['var'];
$ini = $_POST['fecha1'];
$fin = $_POST['fecha2'];
switch ($consulta) {  
    case 'reserva_canchas':
        $respuesta = $cons->reserva_canchas_fecha($var1, $ini, $fin);
        echo json_encode($respuesta);
        break;  
    case 'ver_clases':
            $respuesta = $cons->VER_CURSOS($var1, $ini, $fin);
            echo json_encode($respuesta);
        break; 
    default:
        break;
}