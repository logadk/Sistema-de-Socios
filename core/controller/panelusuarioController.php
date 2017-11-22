<?php
require_once 'core/inc/seguro.php';
if(isset($_SESSION['CAMBIO_CLAVE']) and $_SESSION['CAMBIO_CLAVE'] === 'si')
{    
    header('Location:'.Config::ruta().'?accion=clave');
}
 else {
    require_once 'core/view/paneluser.phtml';
}
