<?php

require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class Participantes extends generalModel
{
    public function INSERTAR_PARTICIPANTES($cancha_id,$reserva_id,$rut,$socio)
    {
            $sql = "INSERT INTO participantes (ca_codigo,re_id,p_rut,p_socio)"
            ." VALUES (?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$cancha_id);
            $query->bindParam(2,$reserva_id);
            $query->bindParam(3,$rut);
            $query->bindParam(4,$socio);
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
    
    public function VER_PARTICIPANTES($reserva_id)
    {
        $cli = $this->CONS_1VAR('participantes', 're_id', $reserva_id);
        if($cli !== 'FALSE')
        {
            $numero = count($cli);
            for($i=0; $i<$numero; $i++)
            {
                switch ($cli[$i]['p_socio'])
                {
                case 'socio_activo':
                    $user = $this->CONS_1VAR('socio_activo', 'sa_rut', $cli[$i]['p_rut']);
                    $res[$i] = array('RUT'=>$cli[$i]['p_rut'],'NOMBRES'=>$user[0]['sa_nombre']);
                    
                    break;
                case 'socio_transeunte':
                    $user = $this->CONS_1VAR('socio_transeunte', 'st_rut', $cli[$i]['p_rut']);
                    $res[$i] = array('RUT'=>$cli[$i]['p_rut'],'NOMBRES'=>$user[0]['st_nombre']);
                    
                    break;
                case 'familiar_transeunte':
                    $user = $this->CONS_1VAR('familiar_socio_transeunte', 'stf_rut', $cli[$i]['p_rut']);
                    $res[$i] = array('RUT'=>$cli[$i]['p_rut'],'NOMBRES'=>$user[0]['stf_nombre']);
                    
                    break;
                case 'familiar_activo':
                    $user = $this->CONS_1VAR('familiar_socio_activo', 'saf_rut', $cli[$i]['p_rut']);
                    $res[$i] = array('RUT'=>$cli[$i]['p_rut'],'NOMBRES'=>$user[0]['saf_nombre']);
                    
                    break;
                }
            }
            return $res;
        }
        else 
            {
                $res = 'FALSE';
                return $res;
            }
    }
}