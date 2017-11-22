<?php
require_once 'core/model/conexion.class.php';
class Login
{

    private static $instancia;
    private $dbh;

    private function __construct()
    {
        $this->dbh = Conexion::singleton_conexion();
    }

    public static function singleton_login()
    {

        if (!isset(self::$instancia)) {

            $miclase = __CLASS__;
            self::$instancia = new $miclase;

        }

        return self::$instancia;

    }

	public function login($nick,$password,$tab)
	{
            if(empty($nick) or empty($password))
            {
                header("Location:".Config::ruta()."?accion=loginadmin&m=1"); exit;
            }
            else
            {
                try {
                        switch ($tab)
                        {
                            case 1:
                                $sql = "SELECT sa_rut, sa_nombre, sa_sexo, sa_nacimiento, sa_cambio_clave, sa_estado FROM socio_activo WHERE sa_rut = ? AND sa_pass = ?";
                                break;
                            case 2:
                                $sql = "SELECT st_rut, st_nombre, st_sexo, st_nacimiento, st_cambio_clave, st_estado FROM socio_transeunte WHERE st_rut = ? AND st_pass = ?";
                                break;
                            case 3:
                                $sql = "SELECT saf_nombre, saf_sexo, saf_nacimiento, saf_cambio_clave, saf_estado FROM familiar_socio_activo WHERE saf_rut = ? AND saf_pass = ?";
                                break;
                            case 4:
                                $sql = "SELECT stf_nombre, stf_sexo, stf_nacimiento,stf_cambio_clave, stf_estado FROM familiar_socio_transeunte WHERE stf_rut = ? AND stf_pass = ?";
                                break;
                            case 5:
                                $sql = "SELECT u_nombre, u_estado FROM usuarios WHERE u_nick = ? AND u_pass = ?";
                                break;
                        }

			$pass = md5($password);
			$query = $this->dbh->prepare($sql);
			$query->bindParam(1,$nick);
			$query->bindParam(2,$pass);
			$query->execute();
			$this->dbh = null;

			//si existe el usuario
			if($query->rowCount() === 1)
			{
                            $fila = $query->fetch();
                            $_SESSION['USUARIO'] = $nick;
                            switch ($tab)
                            {
                                case 1:
                                    $_SESSION['NOMBRE'] = $fila['sa_nombre'];
                                    $_SESSION['ESTADO'] = $fila['sa_estado'];
                                    $_SESSION['CAMBIO_CLAVE'] = $fila['sa_cambio_clave'];
                                    $_SESSION['SEXO'] = $fila['sa_sexo'];
                                    $_SESSION['EDAD'] = Config::calculaedad($fila['sa_nacimiento']);
                                    $_SESSION['SOCIO'] = 'socio_activo';
                                    #$_SESSION['EDAD'] = $fila['sa_nacimiento'];
                                    header("Location:".Config::ruta()."?accion=panelusuario");
                                    break;
                                case 2:
                                    $_SESSION['NOMBRE'] = $fila['st_nombre'];
                                    $_SESSION['ESTADO'] = $fila['st_estado'];
                                    $_SESSION['CAMBIO_CLAVE'] = $fila['st_cambio_clave'];
                                    $_SESSION['SEXO'] = $fila['st_sexo'];
                                    $_SESSION['EDAD'] = Config::calculaedad($fila['st_nacimiento']);
                                    $_SESSION['SOCIO'] = 'socio_transeunte';
                                    header("Location:".Config::ruta()."?accion=panelusuario");
                                    break;
                                case 3:
                                    $_SESSION['NOMBRE'] = $fila['saf_nombre'];
                                    $_SESSION['ESTADO'] = $fila['saf_estado'];
                                    $_SESSION['CAMBIO_CLAVE'] = $fila['saf_cambio_clave'];
                                    $_SESSION['SEXO'] = $fila['saf_sexo'];
                                    $_SESSION['EDAD'] = Config::calculaedad($fila['saf_nacimiento']);
                                    $_SESSION['SOCIO'] = 'familiar_socio_activo';
                                    header("Location:".Config::ruta()."?accion=panelusuario");
                                    break;
                                case 4:
                                    $_SESSION['NOMBRE'] = $fila['stf_nombre'];
                                    $_SESSION['ESTADO'] = $fila['stf_estado'];
                                    $_SESSION['CAMBIO_CLAVE'] = $fila['stf_cambio_clave'];
                                    $_SESSION['SEXO'] = $fila['stf_sexo'];
                                    $_SESSION['EDAD'] = Config::calculaedad($fila['stf_nacimiento']);
                                    $_SESSION['SOCIO'] = 'familiar_socio_transeunte';
                                    header("Location:".Config::ruta()."?accion=panelusuario");
                                    break;
                                case 5:
                                    $_SESSION['NOMBRE'] = $fila['u_nombre'];
                                    $_SESSION['ESTADO'] = $fila['u_estado'];
                                    header("Location:".Config::ruta()."?accion=paneladmin");
                                    break;
                            }
//                            $_SESSION['nombre'] = $fila['nombre'];
//                            $_SESSION['privilegio'] = $fila['privilegio'];
                            return 'funciona';
			}
                        else
                            {
                            print_r($query->rowCount());
                                if($tab !== 5)
                                {
                                    header("Location:".Config::ruta()."?accion=loginusuario&m=1");
                                }
                                else
                                    {
                                        header("Location:".Config::ruta()."?accion=loginadmin&m=1");
                                    }
                            }

                    }catch(PDOException $e){

                            print "Error!: " . $e->getMessage();
                    }
            }
	}


     // Evita que el objeto se pueda clonar
    public function __clone()
    {
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR);
    }
}
