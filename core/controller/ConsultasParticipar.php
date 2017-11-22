<?php
session_start();
require_once '../model/ParticipantesModel.php';
header('content-type: application/json');
$cons = new Participantes();
$accion = $_POST['accion'];
$cancha_id = $_POST['cancha'];
$reserva_id = $_POST['reserva_id'];
$rut = $_POST['rut'];
$tiposocio = $_POST['tipo_socio'];

switch ($accion)
{    
    case 'user_reserva':
        $cli = $cons->VER_PARTICIPANTES($reserva_id);
        echo json_encode($cli);
    break;
    case 'participar':
        $participantes = $cons->CONSULTA_2VAR('participantes', 're_id', 'p_rut', $reserva_id, $_SESSION['USUARIO']);
        if($participantes === 'FALSE')
        {
            $cli = $cons->INSERTAR_PARTICIPANTES($cancha_id, $reserva_id, $_SESSION['USUARIO'], $_SESSION['SOCIO']);
            echo json_encode($cli);
        }
    else 
        {
            echo json_encode('Ya estas participando en esta reserva.');
        }
    break;
}

