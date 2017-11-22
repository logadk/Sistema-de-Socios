<?php
ob_start();
session_start();
require_once 'config.php';
include 'core/inc/head_index.php';
if(!empty($_GET['accion']))
{
    $accion = $_GET['accion'];
}
else
{
    $accion = 'loginusuario';
}

if(is_file('core/controller/'.$accion.'Controller.php'))
{
    require_once 'core/controller/'.$accion.'Controller.php';
}
 else
{
    require_once 'core/controller/ErrorController.php';
}
ob_end_flush();
//reparando sistema git
