<?php

require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class Cursos extends generalModel
{
    public function INSERTAR_CURSOS($descripcion,$profe,$valorsa,$valorst)
    {
            $sql = "INSERT INTO cursos (c_descripcion,c_profesor,c_valor_sa,c_valor_st)"
            ." VALUES (?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$descripcion);
            $query->bindParam(2,$profe);
            $query->bindParam(3,$valorsa);  
            $query->bindParam(4,$valorst);
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
    
    public function RESERVA_CANCHA($ca_codigo,$rc_periodo,$rc_rut,$rc_tiposocio,$rc_fecha,$rc_valor)
    {
        $reserva = $this->CONSULTA_3VAR('reserva_canchas', 'rc_rut', 'rc_fecha', 'rc_periodo', $rc_rut, $rc_fecha, $rc_periodo);
        if($reserva === 'FALSE')
        {
            $sql = "INSERT INTO reserva_canchas (ca_codigo,rc_periodo,rc_rut,rc_tiposocio,rc_fecha,rc_valor)"
            . " VALUES (?,?,?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$ca_codigo);
            $query->bindParam(2,$rc_periodo);
            $query->bindParam(3,$rc_rut);
            $query->bindParam(4,$rc_tiposocio);
            $query->bindParam(5,$rc_fecha);
            $query->bindParam(6,$rc_valor);        
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
                $res ='El rut '.$rc_rut.' ya tiene una cancha reservada';
                return $res;
            }
    }
    
    public function VER_RESERVA($periodo,$cancha,$fecha)
    {
         try
        {
            $reserva = $this->CONSULTA_3VAR('reserva_canchas', 'ca_codigo', 'rc_periodo', 'rc_fecha', $cancha, $periodo, $fecha);
            //return $reserva;
            switch ($reserva[0]['rc_tiposocio'])
            {
                case 'Socio Activo':
                    $user = $this->CONS_1VAR('socio_activo', 'sa_rut', $reserva[0]['rc_rut']);
                    $res = array('ID'=>$reserva[0]['re_id'],'RUT'=>$reserva[0]['rc_rut'],'NOMBRES'=>$user[0]['sa_nombre'],'SOCIO'=>$reserva[0]['rc_tiposocio'],'PERIODO'=>$periodo,'CANCHA'=>$cancha,'FECHA'=>$fecha,'VALOR'=>$reserva[0]['rc_valor']);
                    return $res;
                    break;
                case 'Socio Transeunte':
                    $user = $this->CONS_1VAR('socio_transeunte', 'st_rut', $reserva[0]['rc_rut']);
                    $res = array('ID'=>$reserva[0]['re_id'],'RUT'=>$reserva[0]['rc_rut'],'NOMBRES'=>$user[0]['st_nombre'],'SOCIO'=>$reserva[0]['rc_tiposocio'],'PERIODO'=>$periodo,'CANCHA'=>$cancha,'FECHA'=>$fecha,'VALOR'=>$reserva[0]['rc_valor']);
                    return $res;
                    break;
                case 'Familiar Transeunte':
                    $user = $this->CONS_1VAR('familiar_socio_transeunte', 'stf_rut', $reserva[0]['rc_rut']);
                    $res = array('ID'=>$reserva[0]['re_id'],'RUT'=>$reserva[0]['rc_rut'],'NOMBRES'=>$user[0]['stf_nombre'],'SOCIO'=>$reserva[0]['rc_tiposocio'],'PERIODO'=>$periodo,'CANCHA'=>$cancha,'FECHA'=>$fecha,'VALOR'=>$reserva[0]['rc_valor']);
                    return $res;
                    break;
                case 'Familiar Activo':
                    $user = $this->CONS_1VAR('familiar_socio_activo', 'saf_rut', $reserva[0]['rc_rut']);
                    $res = array('ID'=>$reserva[0]['re_id'],'RUT'=>$reserva[0]['rc_rut'],'NOMBRES'=>$user[0]['saf_nombre'],'SOCIO'=>$reserva[0]['rc_tiposocio'],'PERIODO'=>$periodo,'CANCHA'=>$cancha,'FECHA'=>$fecha,'VALOR'=>$reserva[0]['rc_valor']);
                    return $res;
                    break;
            }
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }

    public function ELIMINAR($tabla,$valor)
    {
        try{
            $sql = "DELETE FROM ".$tabla." WHERE re_id = ?";
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
        
}