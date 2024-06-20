class Reserva {
    private $id;
    private $id_usuario;
    private $fecha_reserva;
    private $hora_inicio;
    private $hora_fin;

    public function __construct($id, $id_usuario, $fecha_reserva, $hora_inicio, $hora_fin) {
        $this->id = $id;
        $this->id_usuario = $id_usuario;
        $this->fecha_reserva = $fecha_reserva;
        $this->hora_inicio = $hora_inicio;
        $this->hora_fin = $hora_fin;
    }

    public function realizarReserva() {
        // Código para realizar la reserva
    }

    // Otros métodos como getters y setters
}
