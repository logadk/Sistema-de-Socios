<?php
require_once '../model/SocioActivoModel.php';
header('content-type: application/json');
$accion = $_POST['accion'];
$rut = $_POST['rut'];
$nombres = $_POST['nombres'];
$sexo = $_POST['sexo'];
$nacimiento = $_POST['nacimiento'];
$titulo = $_POST['titulo'];
$dpto = $_POST['dpto'];
$celu = $_POST['celular'];
$email = $_POST['email'];
$estado = $_POST['estado'];

$consulta = new activo();
if(empty($celu))
{
    $celu = 0;
}

if(empty($estado))
{
    $estado = '';
}

if(empty($email))
{
    $email = NULL;
}

switch ($accion)
{
    case 'insertar':    
        $insert = $consulta->INSERTAR_SOCIO_ACTIVO($rut, $nombres, $sexo, $nacimiento, $titulo, $dpto, $celu, $email);
        echo json_encode($insert);        
        break;    
    case 'buscar':
        $buscar = $consulta->consulta_1var('socio_activo','sa_rut,sa_nombre,sa_sexo,sa_nacimiento,sa_depto_casa,sa_titulo,sa_cel,sa_email,sa_estado', 'sa_rut', $rut);
        echo json_encode($buscar);
        break;
    case 'update':
        $update = $consulta->UPDATE_SOCIO_ACTIVO($rut, $nombres, $sexo, $nacimiento, $titulo, $dpto, $celu, $email, $estado);
        echo json_encode($update);    
        break;
    case 'reset_pass':
        $clave = $consulta->CREA_PASSWORD($rut);
        $pass = md5($clave);
        $respuesta =$consulta->RESET_PASS('socio_activo', $pass, 'sa_cambio_clave', $rut, 'sa_pass', 'sa_rut');
        echo json_encode($respuesta);    
        break;
}