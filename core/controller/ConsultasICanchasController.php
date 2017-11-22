<?php
require_once '../model/CanchasModel.php';
header('content-type: application/json');
$cons = new Canchas();
$accion = $_POST['accion'];
$descripcion = $_POST['descripcion'];
$apertura = $_POST['apertura'];
$cierre = $_POST['cierre'];
$valor_sa = $_POST['valorsa'];
$valor_st = $_POST['valorst'];

switch ($accion)
{
    case 'insertar':
        $cli = $cons->INSERTAR_CANCHA($descripcion, $apertura, $cierre, $valor_sa, $valor_st);
        echo json_encode($cli);
        break;
    case 'Busca_ca':
        $cli = $cons->CONSULTA_SC('canchas', 'ca_codigo,ca_descripcion,c_hora_apertura,c_hora_termino,ca_valorsa,ca_valorst');
        echo json_encode($cli);
        break;    
}

