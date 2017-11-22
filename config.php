<?php
class Config
{
    public static function ruta()
    {
        //return "http://localhost/";
        return "http://clubdeportivo.napv.cl/";                
    }

    public static function calculaedad($fechanacimiento)
    {
        date_default_timezone_set('Chile/Continental');
	$fechahoy = date("Y-m-d");
        $restafecha = strtotime($fechahoy) - strtotime($fechanacimiento);
        $edad = intval($restafecha/60/60/24/365.25);
	return $edad;
    }
}
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
