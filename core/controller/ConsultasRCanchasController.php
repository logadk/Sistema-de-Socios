<?php
session_start();
require_once '../model/CanchasModel.php';
header('content-type: application/json');
$cons = new Canchas();
$accion = $_POST['accion'];
$codigo_cancha = $_POST['cancha'];
$periodo = $_POST['periodo'];
$rut = $_POST['rut'];
$tiposocio = $_POST['tipo_socio'];
$fecha = $_POST['fecha'];
$valor = $_POST['valor'];

switch ($accion)
{
    case 'ADD_RESERVA':
        $cli = $cons->RESERVA_CANCHA($descripcion, $apertura, $cierre);
        echo json_encode($cli);
        break;
    case 'Busca_ca':
        $cli = $cons->CONSULTA_SC('canchas', 'ca_codigo,ca_descripcion,c_hora_apertura,c_hora_termino');
        echo json_encode($cli);
        break;
    case 'Busca_socio':
        switch ($tiposocio)
        {
            case 'Socio Activo':
                $cli = $cons->CONSULTA_SC('socio_activo', 'sa_rut,sa_nombre');
                echo json_encode($cli);
                break;
            case 'Socio Transeunte':
                $cli = $cons->CONSULTA_SC('socio_transeunte', 'st_rut,st_nombre');
                echo json_encode($cli);
                break;
            case 'Familiar Activo':
                $cli = $cons->CONSULTA_SC('familiar_socio_activo', 'saf_rut,saf_nombre');
                echo json_encode($cli);
                break;
            case 'Familiar Transeunte':
                $cli = $cons->CONSULTA_SC('familiar_socio_transeunte', 'stf_rut,stf_nombre');
                echo json_encode($cli);
                break;
        }
        break;
    case 'horario':
        $cli = $cons->HORARIO($codigo_cancha, $fecha);
        if($cli !== null)
        {
            echo json_encode($cli);
        }
        else 
            {
            echo json_encode('FALSE');
            }
        
        break;
    case 'reservar':
        $cli = $cons->RESERVA_CANCHA($codigo_cancha, $periodo, $rut, $tiposocio, $fecha, $valor);
        echo json_encode($cli);
        break;
    case 'reserva':
        $cli = $cons->VER_RESERVA($periodo, $codigo_cancha, $fecha);
        echo json_encode($cli);
        break;
    case 'eliminar':
        $cli = $cons->ELIMINAR('reserva_canchas', $tiposocio);
        echo json_encode($cli);
        break;
    case 'user_reservar':
        $antes = $periodo-1;
        $despues = $periodo+1;
        $cons1 = $cons->CONSULTA_4VAR('reserva_canchas', 'ca_codigo', 'rc_periodo', 'rc_fecha','rc_rut', $codigo_cancha, $antes, $fecha,$_SESSION['USUARIO']);
        $cons2 = $cons->CONSULTA_4VAR('reserva_canchas', 'ca_codigo', 'rc_periodo', 'rc_fecha','rc_rut', $codigo_cancha, $despues, $fecha,$_SESSION['USUARIO']);
        if(($cons1 === 'FALSE') AND ($cons2 === 'FALSE'))
        {
            $cli = $cons->RESERVA_CANCHA($codigo_cancha, $periodo, $_SESSION['USUARIO'], $_SESSION['SOCIO'], $fecha, $valor);
            if($cli === 'OK')
            {
                echo json_encode('La reserva se ralizó con exito.');
            }
            else 
                {
                echo json_encode($cli);
                }
        }
        else 
            {
                echo json_encode('No se pueden Reservar 2 periodos continuos');
            }
        break;          
}

