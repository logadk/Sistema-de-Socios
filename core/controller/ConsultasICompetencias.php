<?php
require_once '../model/CompetenciasModel.php';
header('content-type: application/json');
$cons = new Competencias();
$accion = $_POST['accion'];
$codigo = $_POST['codigo'];
$descrip = $_POST['descrip'];
$cupos = $_POST['cupos'];
$edminima = $_POST['edad_minima'];
$edmaxima = $_POST['edad_maxima'];
$fecha = $_POST['fecha'];


switch ($accion)
{
    case 'ingreso':
        $cli = $cons->INSERTAR_COMPETENCIA($descrip, $cupos, $edminima, $edmaxima, $fecha);
        echo json_encode($cli);
        break;
    case 'ver_competencias':
        $cli = $cons->CONSULTA_SC('competencia', '*');
        echo json_encode($cli);
        break;
    case 'prepara_edit';
        $cli = $cons->CONS_1VAR('competencia', 'cp_codigo', $codigo);
        echo json_encode($cli);
        break;
    case 'editar':
        $cli = $cons->UPDATE_COMPETENCIAS($codigo, $descrip, $cupos, $edminima, $edmaxima, $fecha);
        echo json_encode($cli);
        break;    
}

