<?php
require_once 'core/model/login.class.php';
$log = Login::singleton_login();
if(isset($_POST['admin_grabar']) and $_POST['admin_grabar'] === 'si' )
{    
    $login = $log->login($_POST['admin_user'], $_POST['admin_pass'],5);    
}

require_once 'core/view/login_admin.phtml';

