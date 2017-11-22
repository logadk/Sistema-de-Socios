<?php
require_once '../model/CuotasModel.php';
header('content-type: application/json');
$cons = new Cuotas();
$accion = $_POST['accion'];
$id = $_POST['id'];
$descripcion = $_POST['descripcion'];
$nombre = $_POST['nombre'];
$valorsa = $_POST['valorSA'];

switch ($accion)
{
    case 'insertar':
        $cli = $cons->INSERTAR_CUOTAS($descripcion, $nombre, $valorsa);
        if($cli === 'OK')
        {
            $pag = $cons->CREAR_PAGO();
        }
        echo json_encode($pag);
        break;
    case 'buscar_cuotas':
        $cli = $cons->CONSULTA_SC('pagos', 'p_id,p_nombre,p_fecha');
        echo json_encode($cli);
        break;
    case 'ver_cuota':
        $cli = $cons->VER_CUOTA($id);
        echo json_encode($cli);
        break;
    case 'eliminar_cuota':
        $cli = $cons->ELIMINAR_CUOTA($id);
        echo json_encode($cli);
        break;
    case 'update':
        $cli = $cons->UPDATE_PAGOS($id, $nombre, $descripcion);
        echo json_encode($cli);
        break;
}

