<?php
require_once '../model/SocioTranseunteModel.php';
header('content-type: application/json');
$cons = new transeunte();
$accion = $_POST['accion'];
$st_rut = $_POST['st_rut'];
$sexo = $_POST['sexo'];
$nombres = $_POST['nombres'];
$rut = $_POST['rut'];
$parentesco = $_POST['parentesco'];
$fecha = $_POST['fecha'];
$estado = $_POST['estado'];

switch ($accion)
{
    case 'insertar':
        $cli = $cons->INSERTAR_FSOCIO_TRANSEUNTE($rut, $st_rut, $sexo, $parentesco, $nombres, $fecha);
        echo json_encode($cli);
        break;
    case 'Busca_st':
        $cli = $cons->CONSULTA_SC('socio_transeunte', 'st_rut,st_nombre');
        echo json_encode($cli);
        break;
    case 'busca_familiar':
        $cli = $cons->consulta_1var('familiar_socio_transeunte', 'stf_rut,stf_nombre,stf_estado', 'st_rut', $st_rut);
        echo json_encode($cli);
        break;
    case 'ver_familiar':
        //$cli = $cons->consulta_1var('familiar_socio_activo', '*', 'saf_rut', $rut);
        $cli = $cons->VER_FAMILIAR_ST($rut);
        echo json_encode($cli);
        break;
    case 'update':
        $cli = $cons->UPDATE_FSOCIO_TRANSEUNTE($rut, $parentesco, $sexo, $nombres, $fecha, $estado);
        echo json_encode($cli);
        break;
    case 'reset_pass':
        $clave = $cons->CREA_PASSWORD($rut);
        $pass = md5($clave);
        $respuesta =$cons->RESET_PASS('familiar_socio_transeunte', $pass, 'stf_cambio_clave', $rut, 'stf_pass', 'stf_rut');
        echo json_encode($respuesta);    
        break;
}