<?php
class Usuario {
    private $conn;
    private $table_name = "Usuarios";

    public $id;
    public $nombre;
    public $email;
    public $clave;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function registrar() {
        $query = "INSERT INTO " . $this->table_name . " (nombre, email, clave) VALUES (:nombre, :email, :clave)";
        
        $stmt = $this->conn->prepare($query);
        
        // Limpiar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->clave = htmlspecialchars(strip_tags($this->clave));
        
        // Vincular parámetros
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':clave', $this->clave);
        
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }

    public function iniciarSesion() {
        $query = "SELECT id, nombre, email, clave FROM " . $this->table_name . " WHERE email = :email LIMIT 0,1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
        
        $num = $stmt->rowCount();
        
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (password_verify($this->clave, $row['clave'])) {
                $this->id = $row['id'];
                $this->nombre = $row['nombre'];
                return true;
            }
        }
        
        return false;
    }
}
?>
