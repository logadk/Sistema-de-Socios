<?php
require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class activo extends generalModel
{
//    private function CREA_PASSWORD($rut)
//    {
//        $cont = strlen($rut);
//        if($cont === 12)
//        {
//            $res = $rut[3].$rut[4].$rut[5].$rut[7].$rut[8].$rut[9];
//        }
//        else 
//            {
//                $res = $rut[2].$rut[3].$rut[4].$rut[6].$rut[7].$rut[8];
//            }
//            return $res;
//    }

    public function INSERTAR_SOCIO_ACTIVO($rut,$nombres,$sexo,$nacimiento,$titulo,$dpto,$celu,$email)
    {
        $socio = $this->consulta_1var('socio_activo','sa_nombre', 'sa_rut', $rut);
        $fecha = date("Y-m-d");
        $cambio = 'si';
        $estado = 'activo';
        $pas = $this->CREA_PASSWORD($rut);
        $pass = md5($pas);
        if($socio === 'false')
        {
            $sql = "INSERT INTO socio_activo (sa_rut,sa_pass,sa_nombre,sa_sexo,sa_nacimiento,sa_depto_casa,sa_f_ingreso,sa_titulo,sa_cel,sa_email,sa_cambio_clave,sa_estado)"
            . " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$rut);
            $query->bindParam(2,$pass);
            $query->bindParam(3,$nombres);
            $query->bindParam(4,$sexo);
            $query->bindParam(5,$nacimiento);
            $query->bindParam(6,$dpto);
            $query->bindParam(7,$fecha);
            $query->bindParam(8,$titulo);
            $query->bindParam(9,$celu);
            $query->bindParam(10,$email);
            $query->bindParam(11,$cambio);
            $query->bindParam(12,$estado);            
            if($query->execute() === TRUE)
            {
                $res = 'OK';
            }
         else   
            {
                $res = $query->errorInfo();
            }
            return $res;
        }
        else 
            {
                $res ='El rut '.$rut.' ya tiene un cliente asociado';
                return $res;
            }
    }
    
    public function INSERTAR_FSOCIO_ACTIVO($rut,$sa_rut,$parentesco,$sexo,$nombres,$fnacimiento)
    {
        $socio = $this->consulta_1var('socio_activo','sa_nombre', 'sa_rut', $rut);        
        $cambio = 'si';
        $estado = 'activo';
        $pas = $this->CREA_PASSWORD($rut);
        $pass = md5($pas);
        if($socio === 'false')
        {
            $sql = "INSERT INTO familiar_socio_activo (saf_rut,saf_pass,sa_rut,saf_parentesco,saf_nombre,saf_sexo,saf_nacimiento,saf_estado,saf_cambio_clave)"
            . " VALUES (?,?,?,?,?,?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$rut);
            $query->bindParam(2,$pass);
            $query->bindParam(3,$sa_rut);
            $query->bindParam(4,$parentesco);
            $query->bindParam(5,$nombres);
            $query->bindParam(6,$sexo);
            $query->bindParam(7,$fnacimiento);
            $query->bindParam(8,$estado);
            $query->bindParam(9,$cambio);            
            if($query->execute() === TRUE)
            {
                $res = 'OK';
            }
         else   
            {
                $res = $query->errorInfo();
            }
            return $res;
        }
        else 
            {
                $res ='El rut "'.$rut.'" ya tiene un cliente asociado';
                return $res;
            }
    }
    
    public function UPDATE_SOCIO_ACTIVO($rut,$nombres,$sexo,$nacimiento,$titulo,$dpto,$celu,$email,$estado)
    {
        try
        {
            $sql = "UPDATE socio_activo SET sa_nombre=?, sa_sexo=?, sa_nacimiento=?, sa_titulo=?, sa_depto_casa=?, sa_cel=?, sa_email=?, sa_estado=? WHERE sa_rut=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$nombres);
            $query->bindParam(2,$sexo);
            $query->bindParam(3,$nacimiento);
            $query->bindParam(4,$titulo);
            $query->bindParam(5,$dpto);
            $query->bindParam(6,$celu);
            $query->bindParam(7,$email);
            $query->bindParam(8,$estado);
            $query->bindParam(9,$rut);
            if($query->execute() === TRUE)
            {
                $res = 'OK';
            }
            else 
            {
                $res = $query->errorInfo();
            }

            return $res;
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }
    
    public function UPDATE_FSOCIO_ACTIVO($rut,$parentesco,$sexo,$nombres,$nacimiento,$estado)
    {
        try
        {
            $sql = "UPDATE familiar_socio_activo SET saf_nombre=?, saf_sexo=?, saf_nacimiento=?, saf_estado=?, saf_parentesco=? WHERE saf_rut=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$nombres);
            $query->bindParam(2,$sexo);
            $query->bindParam(3,$nacimiento);
            $query->bindParam(4,$estado);
            $query->bindParam(5,$parentesco);            
            $query->bindParam(6,$rut);
            if($query->execute() === TRUE)
            {
                $res = 'OK';
            }
            else 
            {
                $res = $query->errorInfo();
            }

            return $res;
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }
    
    public function VER_FAMILIAR_SA($rut) 
    {
        $familar = $this->CONS_1VAR('familiar_socio_activo', 'saf_rut', $rut);
        foreach ($familar as $fam);
        $datos = array('RES'=>'OK','RUT'=>$fam['saf_rut'],'PARENTESCO'=>$fam['saf_parentesco'],'NOMBRE'=>$fam['saf_nombre'],'SEXO'=>$fam['saf_sexo'],'NACIMIENTO'=>$fam['saf_nacimiento'],'ESTADO'=>$fam['saf_estado']);
        return $datos;
        
    }
}