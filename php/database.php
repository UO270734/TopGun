<?php
class Database {
    private $host = 'localhost';
    private $db_name = 'test';
    private $username = 'USUARIO2024';
    private $password = 'CLAVE2024';
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }

        return $this->conn;
    }

	public function getRecursosTuristicos() {
        $query = "SELECT id, nombre, descripcion, precio FROM Recursos";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>
