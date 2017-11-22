<?php
session_start();
require_once '../model/CompetenciasModel.php';
header('content-type: application/json');
$cons = new Competencias();
$accion = $_POST['accion'];
$id = $_POST['id'];
$rut = $_POST['rut'];
$nombres = $_POST['nombres'];
$competencia = $_POST['competencia'];
$sexo = $_POST['sexo'];
$edad = $_POST['edad'];
$lugar = $_POST['lugar'];
$valor = $_POST['valor'];


switch ($accion)
{
    case 'inscribir':
        $cli = $cons->INSCRIBIR_COMPETENCIA($rut, $nombres, $competencia, $sexo, $edad, $lugar, $valor);
        echo json_encode($cli);
        break;
    case 'ver':
        $cli = $cons->CONS_1VAR('inscripcion_competencia', 'icp_id', $id);
        echo json_encode($cli);
        break;
    case 'eliminar';
        $cli = $cons->ELIMINAR('inscripcion_competencia', $id, $competencia);
        echo json_encode($cli);
        break;
    case 'editar':
        $cli = $cons->UPDATE_INSCRIPCION($id, $sexo, $edad, $lugar, $valor);
        echo json_encode($cli);
        break;
    case 'participantes':
        $cli = $cons->CONS_1VAR('inscripcion_competencia', 'cp_codigo', $competencia);
        echo json_encode($cli);
        break;
    case 'uinscribir':
        $cli = $cons->INSCRIBIR_COMPETENCIA($_SESSION['USUARIO'], $_SESSION['NOMBRE'], $competencia, $_SESSION['SEXO'], $_SESSION['EDAD'], '0', '0');
        echo json_encode($cli);
        break;    
}

