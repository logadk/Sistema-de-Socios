<?php

require_once 'generalModel.php';
date_default_timezone_set('Chile/Continental');
class Competencias extends generalModel
{
    public function INSERTAR_COMPETENCIA($descrip,$cupos,$edminima,$edmaxima,$fecha)
    {
            $sql = "INSERT INTO competencia (cp_descripcion,cp_edad_minima,cp_edad_maxima,cp_cupos,cp_fecha)"
            ." VALUES (?,?,?,?,?)";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$descrip);
            $query->bindParam(2,$edminima);
            $query->bindParam(3,$edmaxima);
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
    //inscribir competencias
    public function INSCRIBIR_COMPETENCIA($rut,$nombres,$competencia,$sexo,$edad,$lugar,$valor)
    {
        $socio = $this->CONSULTA_2VAR('inscripcion_competencia', 'cp_codigo', 'icp_rut', $competencia, $rut);
        if($socio !== 'FALSE')
        {
            $res = 'El socio "'.$nombres.'" ya esta inscrito en la competencia';
            return $res;
        }
        $consedad = $this->CONS_1VAR('competencia', 'cp_codigo', $competencia);
        if(($edad < $consedad[0]['cp_edad_minima'])OR($edad > $consedad[0]['cp_edad_maxima']))
        {
            $res = 'El socio "'.$nombres.'" no cumple con la edad exigida ('.$consedad[0]['cp_edad_minima'].'-'.$consedad[0]['cp_edad_maxima'].').';
            return $res;
        }          
        $sql = "INSERT INTO inscripcion_competencia (cp_codigo,icp_rut,icp_nombres,icp_sexo,icp_edad,icp_lugarobtenido,icp_valorpagado)"
        ." VALUES (?,?,?,?,?,?,?)";
        $query = $this->dbh->prepare($sql);
        $query->bindParam(1,$competencia);
        $query->bindParam(2,$rut);
        $query->bindParam(3,$nombres);
        $query->bindParam(4,$sexo);
        $query->bindParam(5,$edad);
        $query->bindParam(6,$lugar);
        $query->bindParam(7,$valor);
        if($query->execute() === TRUE)
        {
            $this->UPDATE_CUPOS($consedad[0]['cp_cupos'], $competencia,'resta');
            $res = 'El socio "'.$nombres.'" fue inscrito.';
        }
         else   
        {
            $res = $query->errorInfo();
        }
        return $res;        
    }
    
    public function UPDATE_COMPETENCIAS($codigo,$descrip,$cupos,$edminima,$edmaxima,$fecha)
    {
        try
        {
            $sql = "UPDATE competencia SET cp_descripcion=?, cp_edad_minima=?, cp_edad_maxima=?, cp_cupos=?, cp_fecha=? WHERE cp_codigo=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$descrip);
            $query->bindParam(2,$edminima);
            $query->bindParam(3,$edmaxima);
            $query->bindParam(4,$cupos);
            $query->bindParam(5,$fecha);
            $query->bindParam(6,$codigo);
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
    public function UPDATE_INSCRIPCION($id,$sexo,$edad,$lugar,$valor)
    {
        try
        {
            $sql = "UPDATE inscripcion_competencia SET icp_sexo=?, icp_edad=?, icp_lugarobtenido=?, icp_valorpagado=? WHERE icp_id=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$sexo);
            $query->bindParam(2,$edad);
            $query->bindParam(3,$lugar);
            $query->bindParam(4,$valor);
            $query->bindParam(5,$id);
            if($query->execute() === TRUE)
            {
                $res = 'La Inscripción fue editada';
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
    
    public function UPDATE_CUPOS($cupos, $codigo, $realizar)
    {
        try
        {  
            if($realizar === 'suma')
            {
                $cupos++;
            }
        else 
            {
                $cupos--;
            }            
            $sql = "UPDATE competencia SET cp_cupos=? WHERE cp_codigo=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$cupos);
            $query->bindParam(2,$codigo);                        
            $query->execute();
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }
     
    public function ELIMINAR($tabla,$valor,$competencia)
    {
        try{
            $comp = $this->CONS_1VAR('competencia', 'cp_codigo', $competencia);
            $sql = "DELETE FROM ".$tabla." WHERE icp_id = ?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$valor);
            if($query->execute() === TRUE)
            {
                $this->UPDATE_CUPOS($comp[0]['cp_cupos'], $competencia, 'suma');
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