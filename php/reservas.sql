CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    clave VARCHAR(255) NOT NULL
);

CREATE TABLE Recursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2),
    capacidad INT
);

CREATE TABLE Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE Detalles_Reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    id_recurso INT,
    cantidad INT,
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id),
    FOREIGN KEY (id_recurso) REFERENCES Recursos(id)
);
