class DetalleReserva {
    private $id;
    private $id_reserva;
    private $id_recurso;
    private $cantidad;

    public function __construct($id, $id_reserva, $id_recurso, $cantidad) {
        $this->id = $id;
        $this->id_reserva = $id_reserva;
        $this->id_recurso = $id_recurso;
        $this->cantidad = $cantidad;
    }

    public function agregarDetalle() {
        // Código para agregar el detalle de la reserva
    }

    // Otros métodos como getters y setters
}
