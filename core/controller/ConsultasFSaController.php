<?php
require_once '../model/SocioActivoModel.php';
header('content-type: application/json');
$cons = new activo();
$accion = $_POST['accion'];
$sa_rut = $_POST['sa_rut'];
$rut = $_POST['rut'];
$nombres = $_POST['nombres'];
$sexo = $_POST['sexo'];
$parentesco = $_POST['parentesco'];
$fecha = $_POST['fecha'];
$estado = $_POST['estado'];

switch ($accion)
{
    case 'insertar':
        $cli = $cons->INSERTAR_FSOCIO_ACTIVO($rut, $sa_rut, $parentesco,$sexo, $nombres, $fecha);
        echo json_encode($cli);
        break;
    case 'Busca_sa':
        $cli = $cons->CONSULTA_SC('socio_activo', 'sa_rut,sa_nombre');
        echo json_encode($cli);
        break;
    case 'busca_familiar':
        $cli = $cons->consulta_1var('familiar_socio_activo', 'saf_rut,saf_nombre,saf_estado', 'sa_rut', $sa_rut);
        echo json_encode($cli);
        break;
    case 'ver_familiar':
        //$cli = $cons->consulta_1var('familiar_socio_activo', '*', 'saf_rut', $rut);
        $cli = $cons->VER_FAMILIAR_SA($rut);
        echo json_encode($cli);
        break;
    case 'update':
        $cli = $cons->UPDATE_FSOCIO_ACTIVO($rut, $parentesco, $sexo, $nombres, $fecha, $estado);
        echo json_encode($cli);
        break;
    case 'reset_pass':
        $clave = $cons->CREA_PASSWORD($rut);
        $pass = md5($clave);
        $respuesta =$cons->RESET_PASS('familiar_socio_activo', $pass, 'saf_cambio_clave', $rut, 'saf_pass', 'saf_rut');
        echo json_encode($respuesta);    
        break;
}