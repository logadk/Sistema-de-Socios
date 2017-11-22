<?php
require_once '../model/SocioTranseunteModel.php';
header('content-type: application/json');
$cons = new transeunte();
$accion = $_POST['accion'];
$sa_rut = $_POST['sa_rut'];
$rut = $_POST['rut'];
$nombres = $_POST['nombres'];
$sexo = $_POST['sexo'];
$nacimiento = $_POST['nacimiento'];
$inicio = $_POST['f_inicio'];
$fin = $_POST['f_fin'];
$celular = $_POST['celular'];
$email = $_POST['email'];
$estado = $_POST['estado'];

switch ($accion)
{
case 'Busca_sa':
    $cli = $cons->CONSULTA_SC('socio_activo', 'sa_rut,sa_nombre');
    echo json_encode($cli);
    break;
case 'insertar':
    $cli = $cons->INSERTAR_SOCIO_TRANSEUNTE($sa_rut, $rut, $nombres,$sexo,$nacimiento, $celular, $email, $inicio, $fin);
    echo json_encode($cli);
    break;
case 'busca_familiar':
    $cli = $cons->consulta_1var('socio_transeunte', 'st_rut,st_nombre,st_estado', 'sa_rut', $sa_rut);
    echo json_encode($cli);
    break;
case 'ver_transeunte':
    //$cli = $cons->consulta_1var('familiar_socio_activo', '*', 'saf_rut', $rut);
    $cli = $cons->VER_TRANSEUNTE($rut);
    echo json_encode($cli);
    break;
case 'update':
    $cli = $cons->UPDATE_SOCIO_TRANSEUNTE($rut, $nombres, $sexo, $nacimiento, $inicio, $fin, $celular, $email, $estado);   
    echo json_encode($cli);
    break;
case 'reset_pass':
    $clave = $cons->CREA_PASSWORD($rut);
    $pass = md5($clave);
    $respuesta =$cons->RESET_PASS('socio_transeunte', $pass, 'st_cambio_clave', $rut, 'st_pass', 'st_rut');
    echo json_encode($respuesta);    
    break;
}