<?php
require_once '../model/ReportesModel.php';
header('content-type: application/json');
$cons = new Reportes();
$consulta = $_POST['consulta'];
$var1 = $_POST['var1'];
$var2 = $_POST['var'];
switch ($consulta) {
    case 1:
        $respuesta = $cons->socio_activo();
        echo json_encode($respuesta);
        break;
    case 2:
        $respuesta = $cons->socio_transeunte();
        echo json_encode($respuesta);
        break;
    case 3:
        $respuesta = $cons->competencias();
        echo json_encode($respuesta);
        break;
    case 4:
        $respuesta = $cons->canchas();
        echo json_encode($respuesta);
        break;
    case 5:
        $respuesta = $cons->cursos();
        echo json_encode($respuesta);
        break;
    case 'familiar_sa':
        $respuesta = $cons->familiar_sa($var1);
        echo json_encode($respuesta);
        break;
    case 'familiar_st':
        $respuesta = $cons->familiar_st($var1);
        echo json_encode($respuesta);
        break;
    case 'competidores':
        $respuesta = $cons->competridores($var1);
        echo json_encode($respuesta);
        break;
    case 'reserva_canchas':
        $respuesta = $cons->reserva_canchas($var1);
        echo json_encode($respuesta);
        break;
    case 'participantes':
        $respuesta = $cons->participantes($var1, $var2);
        echo json_encode($respuesta);
        break;
     case 'r_clase':
        $respuesta = $cons->inscripcion_curso($var2);
        echo json_encode($respuesta);
        break;
    default:
        break;
}