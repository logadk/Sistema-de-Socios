<?php

require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class Clases extends generalModel
{
    public function INSERTAR_CLASE($codigo,$inicio,$termino,$cupos,$fecha)
    {
            $sql = "INSERT INTO clase (c_codigo,cl_horainicio,cl_horatermino,cl_cupos,cl_fecha)"
            ." VALUES (?,?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$codigo);
            $query->bindParam(2,$inicio);
            $query->bindParam(3,$termino);  
            $query->bindParam(4,$cupos);
            $query->bindParam(5,$fecha);
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
    
    public function RESERVA_CLASE($curso,$clase,$rut,$nombre,$tiposocio,$valor)
    {
            $registro = $this->CONSULTA_2VAR('inscripcion_curso', 'ic_rut', 'cl_id', $rut, $clase);
            if($registro === 'FALSE')
            {
                $fecha = date("Y-m-d");            
                $sql = "INSERT INTO inscripcion_curso (c_codigo,ic_rut,ic_nombre,ic_socio,cl_id,ic_fecha,ic_valor)"
                ." VALUES (?,?,?,?,?,?,?)";
                $query = $this->dbh->prepare($sql);
                $query->bindParam(1,$curso);
                $query->bindParam(2,$rut);
                $query->bindParam(3,$nombre);  
                $query->bindParam(4,$tiposocio);
                $query->bindParam(5,$clase);
                $query->bindParam(6,$fecha);
                $query->bindParam(7,$valor);
                if($query->execute() === TRUE)
                {
                    $res = 'OK';
                }
             else   
                {
                    $res = $query->errorInfo();
                }
            }
            else {
                $res = 'El socio "'.$nombre.'" ya tiene reservada esta clase';
            }            
            return $res;        
    }
    
    public function UPDATE_CLASES($codigo,$inicio,$termino,$cupos,$fecha)
    {
        try
        {
            $sql = "UPDATE clase SET cl_horainicio=?, cl_horatermino=?, cl_cupos=?, cl_fecha=? WHERE cl_id=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$inicio);
            $query->bindParam(2,$termino);
            $query->bindParam(3,$cupos);
            $query->bindParam(4,$fecha);
            $query->bindParam(5,$codigo);            
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
    
    public function UPDATE_CUPOS($codigo)
    {
        try
        {
            $class = $this->CONS_1VAR('clase', 'cl_id', $codigo);            
            $cupos = $class[0]['cl_cupos'];
            $cupos--;
            $sql = "UPDATE clase SET cl_cupos=? WHERE cl_id=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$cupos);
            $query->bindParam(2,$codigo);                        
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
    
    public function SUMA_CUPOS($codigo)
    {
        try
        {
            $class = $this->CONS_1VAR('clase', 'cl_id', $codigo);            
            $cupos = $class[0]['cl_cupos'];
            $cupos++;
            $sql = "UPDATE clase SET cl_cupos=? WHERE cl_id=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$cupos);
            $query->bindParam(2,$codigo);                        
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
    
    public function ELIMINAR($tabla,$valor)
    {
        try{
            $sql = "DELETE FROM ".$tabla." WHERE ic_id = ?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$valor);
            if($query->execute() === TRUE)
            {
                //$this->dbh = NULL;
                return 'OK';
            }
            else 
            {
                return 'FALSE';
            }
            
        } catch (PDOException $e) {
            print 'Error!: '.$e->getMessage();
        }
    }
    
    //funcion para ver los participantes de dicha clase
    public function VER_RESERVA($clase)
    {
         try
        {
            $cli = $this->CONS_1VAR('inscripcion_curso', 'cl_id', $clase);
            //return $reserva;
            if($cli !== 'FALSE')
        {
            $numero = count($cli);
            for($i=0; $i<$numero; $i++)
            {
                switch ($cli[$i]['ic_socio'])
                {
                case 'socio_activo':
                    $user = $this->CONS_1VAR('socio_activo', 'sa_rut', $cli[$i]['ic_rut']);
                    $res[$i] = array('ID'=>$cli[$i]['ic_id'],'RUT'=>$cli[$i]['ic_rut'],'NOMBRES'=>$user[0]['sa_nombre'],'SOCIO'=>$cli[$i]['ic_socio']);
                    
                    break;
                case 'socio_transeunte':
                    $user = $this->CONS_1VAR('socio_transeunte', 'st_rut', $cli[$i]['ic_rut']);
                    $res[$i] = array('ID'=>$cli[$i]['ic_id'],'RUT'=>$cli[$i]['ic_rut'],'NOMBRES'=>$user[0]['st_nombre'],'SOCIO'=>$cli[$i]['ic_socio']);
                    
                    break;
                case 'familiar_transeunte':
                    $user = $this->CONS_1VAR('familiar_socio_transeunte', 'stf_rut', $cli[$i]['ic_rut']);
                    $res[$i] = array('ID'=>$cli[$i]['ic_id'],'RUT'=>$cli[$i]['ic_rut'],'NOMBRES'=>$user[0]['stf_nombre'],'SOCIO'=>$cli[$i]['ic_socio']);
                    
                    break;
                case 'familiar_activo':
                    $user = $this->CONS_1VAR('familiar_socio_activo', 'saf_rut', $cli[$i]['ic_rut']);
                    $res[$i] = array('ID'=>$cli[$i]['ic_id'],'RUT'=>$cli[$i]['ic_rut'],'NOMBRES'=>$user[0]['saf_nombre'],'SOCIO'=>$cli[$i]['ic_socio']);
                    
                    break;
                }
            }
            return $res;
        }
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }
}