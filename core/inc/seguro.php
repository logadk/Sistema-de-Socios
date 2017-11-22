<?php
session_start();
if(!isset($_SESSION['USUARIO']))
{
    header("Location:".Config::ruta()."?accion=loginusuario");
}