<?php
require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class transeunte extends generalModel
{
    public function BUSCA_CLIENTE()
    {
        $cli = $this->CONSULTA_SC('socio_activo', 'sa_rut,sa_nombre');
        foreach ($cli as $cliente):
            $client= '<tr>
                    <td>'.$cliente['sa_rut'].'</td>
                    <td>'.$cliente['sa_nombre'].'</td>
                    <td>hola</td>
                <tr>';
        endforeach;
        return $client;
    }

    public function INSERTAR_SOCIO_TRANSEUNTE($sa_rut,$rut,$nombres,$sexo,$nacimiento,$celu,$email,$inico,$fin)
    {
        $socio = $this->consulta_1var('socio_transeunte','st_nombre', 'st_rut', $rut);
        //$fecha = date("Y-m-d");
        $cambio = 'si';
        $estado = 'activo';
        $pas = $this->CREA_PASSWORD($rut);
        $pass = md5($pas);
        if($socio === 'false')
        {
            $sql = "INSERT INTO socio_transeunte (st_rut,st_pass,sa_rut,st_nombre,st_sexo,st_nacimiento,st_finicio,st_ftermino,st_cel,st_email,st_cambio_clave,st_estado)"
            . " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$rut);
            $query->bindParam(2,$pass);
            $query->bindParam(3,$sa_rut);
            $query->bindParam(4,$nombres);
            $query->bindParam(5,$sexo);
            $query->bindParam(6,$nacimiento);
            $query->bindParam(7,$inico);
            $query->bindParam(8,$fin);
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
    
    public function UPDATE_SOCIO_TRANSEUNTE($rut,$nombres,$sexo,$nacimiento,$inicio,$termino,$celu,$email,$estado)
    {
        try
        {
            $sql = "UPDATE socio_transeunte SET st_nombre=?, st_sexo=?, st_nacimiento=?, st_finicio=?, st_ftermino=?, st_cel=?, st_email=?, st_estado=? WHERE st_rut=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$nombres);
            $query->bindParam(2,$sexo);
            $query->bindParam(3,$nacimiento);
            $query->bindParam(4,$inicio);
            $query->bindParam(5,$termino);
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
    
    public function INSERTAR_FSOCIO_TRANSEUNTE($rut,$sa_rut,$sexo,$parentesco,$nombres,$fnacimiento)
    {
        $socio = $this->consulta_1var('socio_transeunte','st_nombre', 'st_rut', $rut);        
        $cambio = 'si';
        $estado = 'activo';
        $pas = $this->CREA_PASSWORD($rut);
        $pass = md5($pas);
        if($socio === 'false')
        {
            $sql = "INSERT INTO familiar_socio_transeunte (stf_rut,stf_pass,st_rut,stf_parentesco,stf_nombre,stf_sexo,stf_nacimiento,stf_estado,stf_cambio_clave)"
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
                return $socio;
                //$res ='El rut '.$rut.' ya tiene un cliente asociado';
                //return $res;
            }
    }
    public function UPDATE_FSOCIO_TRANSEUNTE($rut,$parentesco,$sexo,$nombres,$nacimiento,$estado)
    {
        try
        {
            $sql = "UPDATE familiar_socio_transeunte SET stf_nombre=?, stf_sexo=?, stf_nacimiento=?, stf_estado=?, stf_parentesco=? WHERE stf_rut=?";
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
    
    public function VER_TRANSEUNTE($rut) 
    {
        $socio = $this->CONS_1VAR('socio_transeunte', 'st_rut', $rut);
        foreach ($socio as $fam);
        $datos = array('RES'=>'OK','RUT'=>$fam['st_rut'],'NOMBRE'=>$fam['st_nombre'],'SEXO'=>$fam['st_sexo'],'NACIMIENTO'=>$fam['st_nacimiento'],'ESTADO'=>$fam['st_estado'],'CEL'=>$fam['st_cel'],'EMAIL'=>$fam['st_email'],'FINICIO'=>$fam['st_finicio'],'FTERMINO'=>$fam['st_ftermino']);
        return $datos;
        
    }
    
    public function VER_FAMILIAR_ST($rut) 
    {
        $familar = $this->CONS_1VAR('familiar_socio_transeunte', 'stf_rut', $rut);
        foreach ($familar as $fam);
        $datos = array('RES'=>'OK','RUT'=>$fam['stf_rut'],'PARENTESCO'=>$fam['stf_parentesco'],'NOMBRE'=>$fam['stf_nombre'],'SEXO'=>$fam['stf_sexo'],'NACIMIENTO'=>$fam['stf_nacimiento'],'ESTADO'=>$fam['stf_estado']);
        return $datos;
        
    }
}