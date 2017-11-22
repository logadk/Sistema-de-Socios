<?php
require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class Cuotas extends generalModel
{
    public function INSERTAR_CUOTAS($descripcion,$nombre,$valorsa)
    {
            $fecha = date("Y-m-d");
            $sql = "INSERT INTO pagos (p_nombre,p_descripcion,p_fecha,p_valor_sa)"
            ." VALUES (?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$nombre);
            $query->bindParam(2,$descripcion);
            $query->bindParam(3,$fecha);
            $query->bindParam(4,$valorsa);              
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
    
    public function CONULTA_ULTIMO_PAGO()
    {
        try {        
            $sql = "SELECT * FROM pagos ORDER BY p_id DESC LIMIT 1";
            $query = $this->dbh->prepare($sql); 
            //$query->bindParam(1,$tabla);
            $query->execute();
            if($query->rowCount() > 0)
            {
                $dat = $query->fetchAll();
                return $dat;
            }
            else 
                {
                    $RES = 'FALSE';
                    return $RES;
                }
        }
        catch(PDOException $e)
        {			
            print "Error!: " . $e->getMessage();			
        }     
    }
    
    public function UPDATE_PAGOS($id,$nombre,$descripcion)
    {
        try
        {
            $sql = "UPDATE pagos SET p_nombre=?, p_descripcion=? WHERE p_id=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$nombre);
            $query->bindParam(2,$descripcion);
            $query->bindParam(3,$id);            
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
    
    public function CREAR_PAGO()
    {
         try
        {
            $cuota = $this->CONULTA_ULTIMO_PAGO();
            $usuarios = $this->CONS_TABLA('socio_activo');
            //return $reserva;
            foreach ($cuota as $cuot);
            foreach ($usuarios as $users)
            {
                $fecha = date("Y-m-d");
                $sql = "INSERT INTO pagos_club_social (rut,pcs_monto,p_id)"
                ." VALUES (?,?,?)";
                $query = $this->dbh->prepare($sql);
                $query->bindParam(1,$users['sa_rut']);
                $query->bindParam(2,$cuot['p_valor_sa']);
                $query->bindParam(3,$cuot['p_id']);
                if($query->execute() === TRUE)
                {
                    $res = 'OK';               
                }
             else   
                {
                    $res = $query->errorInfo();
                }                   
            }
            return $res;
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }
    
    public function VER_CUOTA($id)
    {
         try
        {
            $cuot = $this->CONS_1VAR('pagos', 'p_id', $id);
            foreach ($cuot as $cuota);
            $res = array('ID'=>$cuota['p_id'],'NOMBRE'=>$cuota['p_nombre'],'DESCRIP'=>$cuota['p_descripcion'],'FECHA'=>$cuota['p_fecha'],'VALOR'=>$cuota['p_valor_sa']);
            return $res;
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }

    public function ELIMINAR_CUOTA($id)
    {
        try{
            $sql = "DELETE FROM pagos_club_social WHERE p_id = ?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$id);
            if($query->execute() === TRUE)
            {
                $sql = "DELETE FROM pagos WHERE p_id = ?";
                $querys = $this->dbh->prepare($sql);
                $querys->bindParam(1,$id);
                if($querys->execute() === TRUE)
                {
                    //$this->dbh = NULL;
                    return 'OK';
                }
                else 
                {
                    return 'FALSE';
                }
            }
            else 
            {
                return 'FALSE';
            }
            
        } catch (PDOException $e) {
            print 'Error!: '.$e->getMessage();
        }
    }
        
}