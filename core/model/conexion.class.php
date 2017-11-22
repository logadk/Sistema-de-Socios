<?php
class Conexion
{
    protected static $instancia;
    protected $dbh;

    private function __construct()
    {
        try {

            //$this->dbh = new PDO('mysql:host=mysql.napv.cl;dbname=clubdeportivo_bd', 'user_bd_napv', 'pass.bd.napv');
            $this->dbh = new PDO('mysql:host=localhost;dbname=clubdeportivo_bd', 'root', 'notemetas');
            $this->dbh->exec("SET CHARACTER SET utf8");

        } catch (PDOException $e) {

            print "Error!: " . $e->getMessage();

            die();
        }
    }

    public function prepare($sql)
    {

        return $this->dbh->prepare($sql);

    }

    public static function singleton_conexion()
    {

        if (!isset(self::$instancia)) {
            $miclase = __CLASS__;
            self::$instancia = new $miclase;

        }

        return self::$instancia;

    }


     // Evita que el objeto se pueda clonar
    public function __clone()
    {

        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR);

    }
}
