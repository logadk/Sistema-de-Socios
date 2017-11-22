<?php
require_once '../model/CursosModel.php';
header('content-type: application/json');
$cons = new Cursos();
$accion = $_POST['accion'];
$descripcion = $_POST['descripcion'];
$profe = $_POST['profesor'];
$valorsa = $_POST['valorSA'];
$valorst = $_POST['valorST'];

switch ($accion)
{
    case 'insertar':
        $cli = $cons->INSERTAR_CURSOS($descripcion, $profe, $valorsa, $valorst);
        echo json_encode($cli);
        break;
    case 'buscar_cursos':
        $cli = $cons->CONSULTA_SC('cursos', 'c_codigo,c_descripcion,c_profesor');
        echo json_encode($cli);
        break;
    case 'buscar_clases':
        $cli = $cons->CONS_1VAR('clase', 'c_codigo', $descripcion);
        echo json_encode($cli);
        break;
}

