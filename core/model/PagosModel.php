<?php
require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class Pagos extends generalModel
{
    public function PAGAR($id)
    {
        try
        {
            $cons = $this->CONS_1VAR('pagos_club_social', 'pcs_id', $id);
            foreach ($cons as $consul);
            if($consul['pcs_estado'] === 'Pagado')
            {
                $res = 'FALSE';
            }
            else 
                {
                    $pago = 'Pagado';
                    $fecha = date("Y-m-d");
                    $sql = "UPDATE pagos_club_social SET pcs_fecha=?, pcs_estado=? WHERE pcs_id=?";
                    $query = $this->dbh->prepare($sql);
                    $query->bindParam(1,$fecha);
                    $query->bindParam(2,$pago);
                    $query->bindParam(3,$id);            
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
    
    public function VER_PAGOS($id)
    {
         try
        {
            $cuot = $this->CONS_1VAR('pagos_club_social', 'p_id', $id);
            if($cuot !== 'FALSE')
            {
                $cont = 0;
                foreach ($cuot as $cuota)
                {
                    $user= $this->CONS_1VAR('socio_activo', 'sa_rut', $cuota['rut']); 
                    foreach ($user as $usr);
                    $res[$cont] = array('RES'=>'OK','ID'=>$cuota['pcs_id'],'NOMBRE'=>$usr['sa_nombre'],'RUT'=>$cuota['rut'],'VALOR'=>$cuota['pcs_monto'],'ESTADO'=>$cuota['pcs_estado']);
                    $cont++;                
                }            
            } 
            else 
            {
                $res[0] = array('RES'=>'FALSE');
            }
            
            return $res;
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }       
}