<?php
/**
 * Description of generalModel
 *
 * @author Juan Evaristo Inzulza Rojas
 * Mail evaristoinzulzarojas@gmail.com
 */
require_once 'conexion.class.php';

class generalModel
{
    protected $dbh;
    
    public function __construct() {
        
        $this->dbh = Conexion::singleton_conexion();
    }
    
    public function periodos($periodo)
    {
        $per = array('1'=>'07:00-07:59','2'=>'08:00-08:59','3'=>'09:00-09:59','4'=>'10:00-10:59','5'=>'11:00-11:59','6'=>'12:00-12:59','7'=>'13:00-13:59','8'=>'14:00-14:59','9'=>'15:00-15:59','10'=>'16:00-16:59','11'=>'17:00-17:59','12'=>'18:00-18:59','13'=>'19:00-19:59','14'=>'20:00-20:59','15'=>'21:00-21:59','16'=>'22:00-22:59');
        $res = $per[$periodo];
        return $res;
    }

        public function consulta_1var($tabla,$campo,$condicion,$valor)
    {          
        try {
            
            $sql = "SELECT ".$campo." FROM ".$tabla." WHERE ".$condicion."= ?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$valor);
            $query->execute();
//            if($query === FALSE)
//            {
//                $RES = 'false';
//                return $RES;
//            }
//            else 
//                {
//                    $dat = $query->fetchAll();                
//                    return $dat;
//                }
            if($query->rowCount() > 0)
            {
                $dat = $query->fetchAll();
                return $dat;
            }
            else 
                {
                    $RES = 'false';
                    return $RES;
                }
        }
        catch(PDOException $e)
        {			
            print "Error!: " . $e->getMessage();			
        }        
    }
    
    public function CONS_TABLA($tabla)
    {
        try {        
            $sql = "SELECT * FROM ".$tabla;
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
    
    public function CONS_1VAR($tabla,$condicion,$valor)
    {          
        try {
            
            $sql = "SELECT * FROM ".$tabla." WHERE ".$condicion."= ?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$valor);
            $query->execute();
//            if($query === FALSE)
//            {
//                $RES = 'false';
//                return $RES;
//            }
//            else 
//                {
//                    $dat = $query->fetchAll();                
//                    return $dat;
//                }
            if($query->rowCount() > 0)
            {
                $dat = $query->fetchAll();
                return $dat;
            }
            else 
                {
                    $RES = 'FALSE';
                    //$RES = $query->errorInfo();
                    return $RES;
                }
        }
        catch(PDOException $e)
        {			
            print "Error!: " . $e->getMessage();			
        }        
    }
    
    public function CONSULTA_2VAR($tabla,$campo1, $campo2 ,$valor1,$valor2)
    {    
        try {        
            $sql = "SELECT * FROM ".$tabla." WHERE ".$campo1."= ? AND ".$campo2."= ?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$valor1);
            $query->bindParam(2,$valor2);
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
    
    public function CONSULTA_3VAR($tabla,$campo1,$campo2,$campo3,$valor1,$valor2,$valor3)
    {    
        try {        
            $sql = "SELECT * FROM ".$tabla." WHERE ".$campo1."= ? AND ".$campo2."= ? AND ".$campo3."=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$valor1);
            $query->bindParam(2,$valor2);
            $query->bindParam(3,$valor3);
            $query->execute();
            //return $query->fetchAll();
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
    public function CONSULTA_4VAR($tabla,$campo1,$campo2,$campo3,$campo4,$valor1,$valor2,$valor3,$valor4)
    {    
        try {        
            $sql = "SELECT * FROM ".$tabla." WHERE ".$campo1."= ? AND ".$campo2."= ? AND ".$campo3."= ? AND ".$campo4."= ?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$valor1);
            $query->bindParam(2,$valor2);
            $query->bindParam(3,$valor3);
            $query->bindParam(4,$valor4);
            $query->execute();
            //return $query->fetchAll();
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
    
    public function CONSULTA_SC($tabla,$campo)
    {          
        try {
            
            $sql = "SELECT ".$campo." FROM ".$tabla;
            $query = $this->dbh->prepare($sql);
            //$query->bindParam(1,$valor);
            $query->execute();
            if($query === FALSE)
            {
                $RES = $query->errorInfo();
                return $RES;
            }
            else 
                {
                    $dat = $query->fetchAll();                
                    return $dat;
                }
        }
        catch(PDOException $e)
        {			
            print "Error!: " . $e->getMessage();			
        }        
    }
    
    

    public function CREA_PASSWORD($rut)
    {
        $cont = strlen($rut);
        if($cont === 12)
        {
            $res = $rut[3].$rut[4].$rut[5].$rut[7].$rut[8].$rut[9];
        }
        else 
            {
                $res = $rut[2].$rut[3].$rut[4].$rut[6].$rut[7].$rut[8];
            }
            return $res;
    }   
    
    public function PREPARA_UPDATE($tabla,$rut,$pass,$nuevo_pass)
    {
        $password = md5($pass);
        switch ($tabla)
        {
            case 'socio_activo':
                $user = $this->CONSULTA_2VAR('socio_activo', 'sa_rut', 'sa_pass', $rut, $password);                
                if($user !== 'FALSE')
                {
                    $pass2 = md5($nuevo_pass);
                    $camb = $this->UPDATE_PASS('socio_activo', $pass2, 'sa_cambio_clave', $rut, 'sa_pass', 'sa_rut');
                    //return $camb;
                }
                else 
                    {
                        //devuelve 1, significa que la clave es incorrecta.
                        $camb = 1;                        
                    }
                    return $camb;
                break;
            case 'familiar_socio_activo':
                $user = $this->CONSULTA_2VAR('familiar_socio_activo', 'saf_rut', 'saf_pass', $rut, $password);                
                if($user !== 'FALSE')
                {
                    $pass2 = md5($nuevo_pass);
                    $camb = $this->UPDATE_PASS('familiar_socio_activo', $pass2, 'saf_cambio_clave', $rut, 'saf_pass', 'saf_rut');
                    //return $camb;
                }
                else 
                    {
                        //devuelve 1, significa que la clave es incorrecta.
                        $camb = 1;                        
                    }
                    return $camb;
                break;
            case 'socio_transeunte':
                $user = $this->CONSULTA_2VAR('socio_transeunte', 'st_rut', 'st_pass', $rut, $password);                
                if($user !== 'FALSE')
                {
                    $pass2 = md5($nuevo_pass);
                    $camb = $this->UPDATE_PASS('socio_transeunte', $pass2, 'st_cambio_clave', $rut, 'st_pass', 'st_rut');
                    //return $camb;
                }
                else 
                    {
                        //devuelve 1, significa que la clave es incorrecta.
                        $camb = 1;                        
                    }
                    return $camb;
                break; 
            case 'familiar_socio_transeunte':
                $user = $this->CONSULTA_2VAR('familiar_socio_transeunte', 'stf_rut', 'stf_pass', $rut, $password);                
                if($user !== 'FALSE')
                {
                    $pass2 = md5($nuevo_pass);
                    $camb = $this->UPDATE_PASS('familiar_socio_transeunte', $pass2, 'stf_cambio_clave', $rut, 'stf_pass', 'stf_rut');
                    //return $camb;
                }
                else 
                    {
                        //devuelve 1, significa que la clave es incorrecta.
                        $camb = 1;                        
                    }
                    return $camb;
                break;        
        }
    }
    
    public function UPDATE_PASS($tabla,$pass,$clave,$rut,$campo_clave,$campo_rut) {
        
        try
        {
            $no = 'no';
            $sql = "UPDATE ".$tabla." SET ".$campo_clave."=?, ".$clave."=? WHERE ".$campo_rut."=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$pass);
            $query->bindParam(2,$no);
            $query->bindParam(3,$rut);
            if($query->execute() === TRUE)
            {
                $res = 3;
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
    
    public function RESET_PASS($tabla,$pass,$clave,$rut,$campo_clave,$campo_rut) 
    {        
        try
        {
            $si = 'si';
            $sql = "UPDATE ".$tabla." SET ".$campo_clave."=?, ".$clave."=? WHERE ".$campo_rut."=?";
            $query = $this->dbh->prepare($sql);
            $query->bindParam(1,$pass);
            $query->bindParam(2,$si);
            $query->bindParam(3,$rut);
            if($query->execute() === TRUE)
            {
                $res = 'OK';
            }
            else 
            {
                $res = 'FALSE';
                //$res = $query->errorInfo();
            }

            return $res;
        } catch (Exception $e) {
            print 'Error!: '.$e->getMessage();            
        }
    }
}