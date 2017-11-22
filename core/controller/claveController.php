<?php
session_start();
require_once 'core/model/generalModel.php';
$cons = new generalModel();
if(isset($_POST['envioclave']) and $_POST['envioclave'] === 'si')
{    
    if($_POST['nueva1'] === $_POST['nueva2'])
    {
        $res = $cons->PREPARA_UPDATE($_SESSION['SOCIO'], $_SESSION['USUARIO'], $_POST['claveactual'], $_POST['nueva1']);
        print_r($res);
        if($res === 1)
        {
            header('Location:'.Config::ruta().'?accion=clave&m=1');
        }
        else 
            {
                $_SESSION['CAMBIO_CLAVE'] = 'no';
                header('Location:'.Config::ruta().'?accion=clave&m=3');
            }
    }
    else 
        {
        header('Location:'.Config::ruta().'?accion=clave&m=2');
    }
}
 else {
     if(isset($_GET['m'])AND $_GET['m']== 3)
     {
        require_once 'core/view/clave_ok.phtml';
        header('Refresh:3;URL='.Config::ruta().'?accion=panelusuario');
     }
 else {
         require_once 'core/view/cambioclave.phtml';
     }    
}
