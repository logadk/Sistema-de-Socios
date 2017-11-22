<?php
session_start();
require_once '../model/ClasesModel.php';
header('content-type: application/json');
$cons = new Clases();
$accion = $_POST['accion'];
$curso = $_POST['curso'];
$clase = $_POST['clase'];
$rut = $_POST['rut'];
$nombre = $_POST['nombre'];
$tiposocio = $_POST['socio'];
$fecha = $_POST['fecha'];
$valor = $_POST['valor'];

switch ($accion)
{
    case 'ADD_RESERVA':
        $cli = $cons->RESERVA_CANCHA($descripcion, $apertura, $cierre);
        echo json_encode($cli);
        break;
    case 'ver_reserva':
        $cli = $cons->CONS_1VAR('inscripcion_curso', 'cl_id', $clase);
        echo json_encode($cli);
        break;    
    case 'reservar':        
        $cli = $cons->RESERVA_CLASE($curso, $clase, $rut, $nombre, $tiposocio, $valor);
        if($cli === 'OK')
        {
            $cup = $cons->UPDATE_CUPOS($clase);
        }        
        echo json_encode($cli);
        break;
   
    case 'eliminar':
        $cli = $cons->ELIMINAR('inscripcion_curso', $tiposocio);
        $cup = $cons->SUMA_CUPOS($clase);
        echo json_encode($cli);
        break;
    case 'pasar_reserva':
        $cli = $cons->CONS_1VAR('inscripcion_curso', 'ic_id', $clase);
        echo json_encode($cli);
        break;
    case 'ver_participantes':
        $cli = $cons->VER_RESERVA($clase);
        if($cli !== NULL)
        {
            echo json_encode($cli);
        }
        else 
            {
            echo json_encode('FALSE');
            }
        
        break;
    case 'ureservar':
        $cli = $cons->RESERVA_CLASE($curso, $clase, $_SESSION['USUARIO'], $_SESSION['NOMBRE'], $_SESSION['SOCIO'], '0');
        if($cli === 'OK')
        {
            $cup = $cons->UPDATE_CUPOS($clase);
        }        
        echo json_encode($cli);
        break;
}

