class Recurso {
    private $id;
    private $nombre;
    private $tipo;
    private $descripcion;
    private $precio;
    private $capacidad;

    public function __construct($id, $nombre, $tipo, $descripcion, $precio, $capacidad) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->tipo = $tipo;
        $this->descripcion = $descripcion;
        $this->precio = $precio;
        $this->capacidad = $capacidad;
    }

    public function obtenerDisponibilidad($fecha, $hora_inicio, $hora_fin) {
        // Código para verificar la disponibilidad del recurso
    }

    // Otros métodos como getters y setters
}
