<?php
require_once '../model/ClasesModel.php';
header('content-type: application/json');
$cons = new Clases();
$accion = $_POST['accion'];
$codigo = $_POST['codigo'];
$inicio = $_POST['inicio'];
$termino = $_POST['termino'];
$cupos = $_POST['cupos'];
$fecha = $_POST['fecha'];

switch ($accion)
{
    case 'insertar':
        $cli = $cons->INSERTAR_CLASE($codigo, $inicio, $termino, $cupos, $fecha);
        echo json_encode($cli);
        break;    
    case 'buscar_clases':
        $cli = $cons->CONS_1VAR('clase', 'c_codigo', $codigo);
        echo json_encode($cli);
        break;
    case 'editar':
        $cli = $cons->UPDATE_CLASES($codigo, $inicio, $termino, $cupos, $fecha);
        echo json_encode($cli);
        break;
}

