<?php

require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class Reportes extends generalModel
{   
    public function socio_activo()
    {
        $datos = $this->CONS_TABLA('socio_activo');
        $filas = count($datos);
        for($i=0;$i<$filas;$i++)
        {
             $res[$i] = array('RUT'=>$datos[$i]['sa_rut'],'NOMBRES'=>$datos[$i]['sa_nombre'],'NACIMIENTO'=>$datos[$i]['sa_nacimiento'],'CELULAR'=>$datos[$i]['sa_cel'],'EMAIL'=>$datos[$i]['sa_email']);
        }
        return $res;
    }
    
    public function socio_transeunte()
    {
        $datos = $this->CONS_TABLA('socio_transeunte');
        $filas = count($datos);
        for($i=0;$i<$filas;$i++)
        {
             $res[$i] = array('RUT'=>$datos[$i]['st_rut'],'NOMBRES'=>$datos[$i]['st_nombre'],'NACIMIENTO'=>$datos[$i]['st_nacimiento'],'CELULAR'=>$datos[$i]['st_cel'],'EMAIL'=>$datos[$i]['st_email'],'ESTADO'=>$datos[$i]['st_estado']);
        }
        return $res;
    }
    
    public function familiar_sa($rut)
    {
        $datos = $this->CONS_1VAR('familiar_socio_activo', 'sa_rut', $rut);
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {   
                $res[$i] = array('RUT'=>$datos[$i]['saf_rut'],'NOMBRES'=>$datos[$i]['saf_nombre'],'NACIMIENTO'=>$datos[$i]['saf_nacimiento'],'ESTADO'=>$datos[$i]['saf_estado'],'PARENTESCO'=>$datos[$i]['saf_parentesco']);
            }            
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;     
    }
    
    public function familiar_st($rut)
    {
        $datos = $this->CONS_1VAR('familiar_socio_transeunte', 'st_rut', $rut);
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {   
                $res[$i] = array('RUT'=>$datos[$i]['stf_rut'],'NOMBRES'=>$datos[$i]['stf_nombre'],'NACIMIENTO'=>$datos[$i]['stf_nacimiento'],'ESTADO'=>$datos[$i]['stf_estado'],'PARENTESCO'=>$datos[$i]['stf_parentesco']);
            }            
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;     
    }
     
    public function competencias()
    {
        $datos = $this->CONS_TABLA('competencia');
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {
                 $res[$i] = array('COD'=>$datos[$i]['cp_codigo'],'DESCRIP'=>$datos[$i]['cp_descripcion'],'EDAD_MIN'=>$datos[$i]['cp_edad_minima'],'EDAD_MAX'=>$datos[$i]['cp_edad_maxima'],'CUPOS'=>$datos[$i]['cp_cupos'],'FECHA'=>$datos[$i]['cp_fecha']);
            }    
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;       
    }
    
    public function competridores($cod)
    {
        $datos = $this->CONS_1VAR('inscripcion_competencia', 'cp_codigo', $cod);
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {   
                $res[$i] = array('COD'=>$datos[$i]['icp_id'],'RUT'=>$datos[$i]['icp_rut'],'NOMBRES'=>$datos[$i]['icp_nombres'],'SEXO'=>$datos[$i]['icp_sexo'],'EDAD'=>$datos[$i]['icp_edad'],'LUGAR'=>$datos[$i]['icp_lugarobtenido'],'VALOR'=>$datos[$i]['icp_valorpagado']);
            }            
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;     
    }
    
    public function canchas()
    {
        $datos = $this->CONS_TABLA('canchas');
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {
                 $res[$i] = array('COD'=>$datos[$i]['ca_codigo'],'DESCRIP'=>$datos[$i]['ca_descripcion'],'APERTURA'=>$datos[$i]['c_hora_apertura'],'CIERRE'=>$datos[$i]['c_hora_termino']);
            }    
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;       
    }
    
    
    
    
    public function reserva_canchas($cod)
    {
        $datos = $this->CONS_1VAR('reserva_canchas', 'ca_codigo', $cod);
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {   
                switch ($datos[$i]['rc_tiposocio'])
                {
                case 'socio_activo':
                    $user = $this->CONS_1VAR('socio_activo', 'sa_rut', $datos[$i]['rc_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['re_id'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRES'=>$user[0]['sa_nombre'],'SOCIO'=>$datos[$i]['rc_tiposocio'],'PERIODO'=> $this->periodos($datos[$i]['rc_periodo']),'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
                    
                    break;
                case 'socio_transeunte':
                    $user = $this->CONS_1VAR('socio_transeunte', 'st_rut', $datos[$i]['rc_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['re_id'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRES'=>$user[0]['st_nombre'],'SOCIO'=>$datos[$i]['rc_tiposocio'],'PERIODO'=> $this->periodos($datos[$i]['rc_periodo']),'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
                    
                    break;
                case 'familiar_socio_transeunte':
                    $user = $this->CONS_1VAR('familiar_socio_transeunte', 'stf_rut', $datos[$i]['rc_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['re_id'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRES'=>$user[0]['stf_nombre'],'SOCIO'=>$datos[$i]['rc_tiposocio'],'PERIODO'=> $this->periodos($datos[$i]['rc_periodo']),'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
                    
                    break;
                case 'familiar_socio_activo':
                    $user = $this->CONS_1VAR('familiar_socio_activo', 'saf_rut', $datos[$i]['rc_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['re_id'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRES'=>$user[0]['saf_nombre'],'SOCIO'=>$datos[$i]['rc_tiposocio'],'PERIODO'=> $this->periodos($datos[$i]['rc_periodo']),'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);                    
                    break;
                }               
                //$res[$i] = array('COD'=>$datos[$i]['re_id'],'PERIODO'=>$datos[$i]['rc_periodo'],'HORARIO'=>$datos[$i]['icp_nombres'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRE'=>$datos[$i][''],'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
            }            
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;     
    }   
    
    public function CONSULTA_ENTRE_FECHAS($tabla,$cond1,$desde,$hasta,$cond2,$var)
    {
        try
        {            
            $sql ="SELECT * FROM ".$tabla." WHERE ".$cond1." BETWEEN ?  AND ? AND ".$cond2." = ?";
            //$sql ="SELECT * FROM reg_serv WHERE fech_ejec BETWEEN ?  AND ? AND estado = ?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$desde);
            $query->bindParam(2,$hasta);
            $query->bindParam(3,$var);            
            if($query->execute() === TRUE)
            {
                return $query->fetchAll();
            }
            else 
                {
                    //return $resul =array('RES'=>'FALSE','MSN'=> $query->errorInfo());
                    $RES = 'FALSE';
                    return $RES;
                }            
        } catch (PDOException $ex) {
            print "Error!: " . $ex->getMessage();
        }
    }
    public function reserva_canchas_fecha($cod,$desde,$hasta)
    {
        $datos = $this->CONSULTA_ENTRE_FECHAS('reserva_canchas','rc_fecha', $desde, $hasta,'ca_codigo',$cod);
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {   
                switch ($datos[$i]['rc_tiposocio'])
                {
                case 'socio_activo':
                    $user = $this->CONS_1VAR('socio_activo', 'sa_rut', $datos[$i]['rc_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['re_id'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRES'=>$user[0]['sa_nombre'],'SOCIO'=>$datos[$i]['rc_tiposocio'],'PERIODO'=> $this->periodos($datos[$i]['rc_periodo']),'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
                    
                    break;
                case 'socio_transeunte':
                    $user = $this->CONS_1VAR('socio_transeunte', 'st_rut', $datos[$i]['rc_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['re_id'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRES'=>$user[0]['st_nombre'],'SOCIO'=>$datos[$i]['rc_tiposocio'],'PERIODO'=> $this->periodos($datos[$i]['rc_periodo']),'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
                    
                    break;
                case 'familiar_socio_transeunte':
                    $user = $this->CONS_1VAR('familiar_socio_transeunte', 'stf_rut', $datos[$i]['rc_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['re_id'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRES'=>$user[0]['stf_nombre'],'SOCIO'=>$datos[$i]['rc_tiposocio'],'PERIODO'=> $this->periodos($datos[$i]['rc_periodo']),'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
                    
                    break;
                case 'familiar_socio_activo':
                    $user = $this->CONS_1VAR('familiar_socio_activo', 'saf_rut', $datos[$i]['rc_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['re_id'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRES'=>$user[0]['saf_nombre'],'SOCIO'=>$datos[$i]['rc_tiposocio'],'PERIODO'=> $this->periodos($datos[$i]['rc_periodo']),'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);                    
                    break;
                }               
                //$res[$i] = array('COD'=>$datos[$i]['re_id'],'PERIODO'=>$datos[$i]['rc_periodo'],'HORARIO'=>$datos[$i]['icp_nombres'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRE'=>$datos[$i][''],'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
            }            
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;     
    }   
    
    public function participantes($cod1,$cod2)
    {
        $datos = $this->CONSULTA_2VAR('participantes', 'ca_codigo', 're_id', $cod1, $cod2);
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {   
                switch ($datos[$i]['p_socio'])
                {
                case 'socio_activo':
                    $user = $this->CONS_1VAR('socio_activo', 'sa_rut', $datos[$i]['p_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['p_id'],'RUT'=>$datos[$i]['p_rut'],'NOMBRES'=>$user[0]['sa_nombre'],'SOCIO'=>$datos[$i]['p_socio']);
                    
                    break;
                case 'socio_transeunte':
                    $user = $this->CONS_1VAR('socio_transeunte', 'st_rut', $datos[$i]['p_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['p_id'],'RUT'=>$datos[$i]['p_rut'],'NOMBRES'=>$user[0]['st_nombre'],'SOCIO'=>$datos[$i]['p_socio']);
                    
                    break;
                case 'familiar_socio_transeunte':
                    $user = $this->CONS_1VAR('familiar_socio_transeunte', 'stf_rut', $datos[$i]['p_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['p_id'],'RUT'=>$datos[$i]['p_rut'],'NOMBRES'=>$user[0]['stf_nombre'],'SOCIO'=>$datos[$i]['p_socio']);
                    
                    break;
                case 'familiar_socio_activo':
                    $user = $this->CONS_1VAR('familiar_socio_activo', 'saf_rut', $datos[$i]['p_rut']);
                    $res[$i] = array('COD'=>$datos[$i]['p_id'],'RUT'=>$datos[$i]['p_rut'],'NOMBRES'=>$user[0]['saf_nombre'],'SOCIO'=>$datos[$i]['p_socio']);                    
                    break;
                }               
                //$res[$i] = array('COD'=>$datos[$i]['re_id'],'PERIODO'=>$datos[$i]['rc_periodo'],'HORARIO'=>$datos[$i]['icp_nombres'],'RUT'=>$datos[$i]['rc_rut'],'NOMBRE'=>$datos[$i][''],'FECHA'=>$datos[$i]['rc_fecha'],'VALOR'=>$datos[$i]['rc_valor']);
            }            
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;     
    }
    public function cursos()
    {
        $datos = $this->CONS_TABLA('cursos');
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {
                 $res[$i] = array('COD'=>$datos[$i]['c_codigo'],'DESCRIP'=>$datos[$i]['c_descripcion'],'PROFESOR'=>$datos[$i]['c_profesor'],'VALORSA'=>$datos[$i]['c_valor_sa'],'VALORST'=>$datos[$i]['c_valor_st']);
            }    
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;       
    }
    
    public function VER_CURSOS($cod,$desde,$hasta)
    {
        $datos = $this->CONSULTA_ENTRE_FECHAS('clase','cl_fecha', $desde, $hasta,'c_codigo',$cod);
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {  
                    $res[$i] = array('COD'=>$datos[$i]['cl_id'],'INICIO'=>$datos[$i]['cl_horainicio'],'TERMINO'=>$datos[$i]['cl_horatermino'],'CUPOS'=>$datos[$i]['cl_cupos'],'FECHA'=>$datos[$i]['cl_fecha']);

            }            
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;     
    }
    
    public function inscripcion_curso($cod) 
    {
        $datos = $this->CONS_1VAR('inscripcion_curso', 'cl_id', $cod);
        if($datos != 'FALSE')
        {
            $filas = count($datos);
            for($i=0;$i<$filas;$i++)
            {  
                    $res[$i] = array('COD'=>$datos[$i]['cl_id'],'NOMBRE'=>$datos[$i]['ic_nombre'],'RUT'=>$datos[$i]['ic_rut'],'FECHA'=>$datos[$i]['ic_fecha'],'VALOR'=>$datos[$i]['ic_valor'],'ESTADO'=>$datos[$i]['ic_estado_pago']);

            }            
        }
        else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
        return $res;     
    }
}