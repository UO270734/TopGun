<?php
session_start();
include 'php/database.php';
include 'php/Usuario.php';

// Verificar si el usuario ha iniciado sesión
$loggedIn = isset($_SESSION['usuario_id']);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['login'])) {
        // Manejar el inicio de sesión
        $database = new Database();
        $db = $database->getConnection();

        $usuario = new Usuario($db);
        $usuario->email = $_POST['email'];
        $usuario->clave = $_POST['clave'];

        if ($usuario->iniciarSesion()) {
            $_SESSION['usuario_id'] = $usuario->id;
            $_SESSION['usuario_nombre'] = $usuario->nombre;
            $loggedIn = true;
        } else {
            $loginError = "Email o clave incorrectos";
        }
    } elseif (isset($_POST['register'])) {
        // Manejar el registro
        $database = new Database();
        $db = $database->getConnection();

        $usuario = new Usuario($db);
        $usuario->nombre = $_POST['nombre'];
        $usuario->email = $_POST['email'];
        $usuario->clave = password_hash($_POST['clave'], PASSWORD_BCRYPT);

        if ($usuario->registrar()) {
            $registerSuccess = "Registro exitoso. Ahora puede iniciar sesión.";
        } else {
            $registerError = "Error en el registro";
        }
    } elseif (isset($_POST['logout'])) {
        // Manejar el cierre de sesión
        session_destroy();
        header("Location: reservas.php");
        exit();
    } elseif (isset($_POST['reservar'])) {
        // Lógica para procesar el formulario de reservas
        $database = new Database();
        $db = $database->getConnection();

        $id_usuario = $_SESSION['usuario_id'];
        $fecha = $_POST['fecha'];
        $hora = $_POST['hora'];
        $recursos = $_POST['recursos'];
		$totalPresupuesto = 0;

        // Validar datos
        if (!empty($recursos) && !empty($fecha) && !empty($hora)) {
            // Insertar reserva en la base de datos
            $queryReserva = "INSERT INTO Reservas (id_usuario, fecha_reserva, hora_inicio) VALUES (:id_usuario, :fecha, :hora)";
            $stmtReserva = $db->prepare($queryReserva);
            $stmtReserva->bindParam(':id_usuario', $id_usuario);
            $stmtReserva->bindParam(':fecha', $fecha);
            $stmtReserva->bindParam(':hora', $hora);

            if ($stmtReserva->execute()) {
                $id_reserva = $db->lastInsertId();

                foreach ($recursos as $id_recurso) {
					// Obtener el precio del recurso
					$queryPrecio = "SELECT precio FROM Recursos WHERE id = :id_recurso";
					$stmtPrecio = $db->prepare($queryPrecio);
					$stmtPrecio->bindParam(':id_recurso', $id_recurso);
					$stmtPrecio->execute();
					$recurso = $stmtPrecio->fetch(PDO::FETCH_ASSOC);
					$precioRecurso = $recurso['precio'];

					// Sumar el precio del recurso al total del presupuesto
					$totalPresupuesto += $precioRecurso;

					// Insertar detalles de la reserva
                    $queryDetalle = "INSERT INTO Detalles_Reserva (id_reserva, id_recurso) VALUES (:id_reserva, :id_recurso)";
                    $stmtDetalle = $db->prepare($queryDetalle);
                    $stmtDetalle->bindParam(':id_reserva', $id_reserva);
                    $stmtDetalle->bindParam(':id_recurso', $id_recurso);
                    $stmtDetalle->execute();
                }

                $mensaje = "Reserva realizada correctamente. El presupuesto total es " . number_format($totalPresupuesto, 2) . " €.";
            } else {
                $mensaje = "Error al realizar la reserva.";
            }
        } else {
            $mensaje = "Por favor, complete todos los campos.";
        }
	}
}
$database = new Database();
$db = $database->getConnection();
$stmtRecursos = $database->getRecursosTuristicos();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Proyecto convocatoria extraordinaria</title>
	<link rel=icon href=multimedia/imagenes/favicon.ico sizes="16x16" type="image/ico">
	
	<meta name ="author" content ="Mauro Varea Fernández" />
	<meta name ="description" content ="Documento para utilizar en otros módulos de la asignatura" />
	<meta name ="keywords" content ="" />
	<meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
	
	<link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
	<link rel="stylesheet" type="text/css" href="estilo/layout.css" />
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
	<header>
		<h1>Proyecto convocatoria extraordinaria</h1>		
		<nav>
			<a title="Página principal" accesskey="P" tabindex="1" href="index.html">Página principal</a>
			<a title="Gastronomía" accesskey="G" tabindex="2" href="gastronomia.html">Gastronomía</a>
			<a title="Rutas" accesskey="R" tabindex="3" href="rutas.html">Rutas</a>
			<a title="Meteorología" accesskey="M" tabindex="4" href="meteorologia.html">Meteorología</a>
			<a title="Juego" accesskey="J" tabindex="5" href="juego.html">Juego</a>
			<a title="Reservas" accesskey="V" tabindex="6" href="reservas.php">Reservas</a>
		</nav>
	</header>
	
	<main>
		<h2>Reservas</h2>

		<?php if ($loggedIn): ?>
        <h3>Bienvenido, <?php echo htmlspecialchars($_SESSION['usuario_nombre']); ?></h3>
        <form method="post">
            <input type="submit" name="logout" value="Cerrar Sesión">
        </form>
        
        <!-- Formulario para realizar reservas -->
		<form action="reservas.php" method="post">
            <!-- Campos para seleccionar recursos turísticos -->
            <h3>Seleccionar Recursos Turísticos</h3>
			<?php while ($recurso = $stmtRecursos->fetch(PDO::FETCH_ASSOC)): ?>
                <label for="recurso<?php echo $recurso['id']; ?>">
                    <input type="checkbox" id="recurso<?php echo $recurso['id']; ?>" name="recursos[]" value="<?php echo $recurso['id']; ?>">
                    <?php echo $recurso['nombre']; ?> - <?php echo $recurso['descripcion']; ?> - Precio: <?php echo number_format($recurso['precio'], 2); ?> €
                </label>
                <br>
            <?php endwhile; ?>

            <!-- Campos para seleccionar fechas y horas -->
            <h3>Seleccionar Fechas y Horas</h3>
            <label for="fecha">
                Fecha:
                <input type="date" id="fecha" name="fecha" required>
            </label>
            <br>
            <label for="hora">
                Hora:
                <input type="time" id="hora" name="hora" required>
            </label>
            <br>

            <!-- Botón para enviar el formulario -->
            <input type="submit" name="reservar" value="Reservar">
        </form>

		<!-- Mensaje de confirmación -->
        <?php if (isset($mensaje)): ?>
            <p><?php echo $mensaje; ?></p>
        <?php endif; ?>

		<?php else: ?>
			<h3>Registro</h3>
			<?php if (isset($registerSuccess)): ?>
				<p><?php echo $registerSuccess; ?></p>
			<?php elseif (isset($registerError)): ?>
				<p><?php echo $registerError; ?></p>
			<?php endif; ?>
			<form action="reservas.php" method="post">
				<input type="hidden" name="register" value="1">
				<label for="nombre">Nombre:</label>
				<input type="text" id="nombre" name="nombre" required>
				<br>
				<label for="email">Email:</label>
				<input type="email" id="email" name="email" required>
				<br>
				<label for="clave">Clave:</label>
				<input type="password" id="clave" name="clave" required>
				<br>
				<input type="submit" value="Registrar">
			</form>

			<h3>Iniciar Sesión</h3>
			<?php if (isset($loginError)): ?>
				<p><?php echo $loginError; ?></p>
			<?php endif; ?>
			<form action="reservas.php" method="post">
				<input type="hidden" name="login" value="1">
				<label for="email">Email:</label>
				<input type="email" id="email" name="email" required>
				<br>
				<label for="clave">Clave:</label>
				<input type="password" id="clave" name="clave" required>
				<br>
				<input type="submit" value="Iniciar Sesión">
			</form>
		<?php endif; ?>
	</main>

	<footer>
		<p>Mauro Varea Fernández - UO270734</p>
	</footer>
</body>
</html>