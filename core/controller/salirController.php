<?php
require_once 'core/inc/seguro.php';
unset($_SESSION['USUARIO']);
session_destroy();
require_once 'core/view/salir.phtml';
header('Refresh:3;URL='.Config::ruta().'?accion=loginusuario');

