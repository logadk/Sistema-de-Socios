<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'core/model/login.class.php';
$log = Login::singleton_login();

if(isset($_POST['grabar']) and $_POST['grabar'] === 'si' )
{
    $login = $log->login($_POST['rut'], $_POST['pass'],$_POST['sel_socio']);    
}

require_once 'core/view/login_usuario.phtml';