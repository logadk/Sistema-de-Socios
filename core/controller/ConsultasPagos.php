<?php
require_once '../model/PagosModel.php';
header('content-type: application/json');
$cons = new Pagos();
$accion = $_POST['accion'];
$id = $_POST['id'];
$rut = $_POST['rut'];
$fecha = $_POST['fecha'];
$monto = $_POST['monto'];
$p_id = $_POST['p_id'];

switch ($accion)
{
    case 'ver_pagos':
        $cli = $cons->VER_PAGOS($p_id);
        echo json_encode($cli);
        break;
    case 'pagar':
        $cli = $cons->PAGAR($id);
        echo json_encode($cli);
        break;    
}

