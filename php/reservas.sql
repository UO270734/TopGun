-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2024 a las 14:54:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_reserva`
--

CREATE TABLE `detalles_reserva` (
  `id` int(11) NOT NULL,
  `id_reserva` int(11) DEFAULT NULL,
  `id_recurso` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `detalles_reserva`
--

INSERT INTO `detalles_reserva` (`id`, `id_reserva`, `id_recurso`, `cantidad`) VALUES
(1, 1, 1, NULL),
(2, 2, 1, NULL),
(3, 4, 4, NULL),
(4, 4, 5, NULL),
(5, 5, 4, NULL),
(6, 5, 5, NULL),
(7, 6, 12, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recursos`
--

CREATE TABLE `recursos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `recursos`
--

INSERT INTO `recursos` (`id`, `nombre`, `tipo`, `descripcion`, `precio`, `capacidad`) VALUES
(1, 'Museo de Bellas Artes de Valencia', 'Museo', 'El Museo de Bellas Artes de Valencia es un museo dedicado al arte en Valencia.', 0.00, 500),
(2, 'Ciudad de las Artes y las Ciencias', 'Ruta', 'Un complejo arquitectónico, cultural y de entretenimiento en la ciudad de Valencia.', 30.00, 2000),
(3, 'Restaurante Casa Montaña', 'Restaurante', 'Un restaurante clásico en el barrio de El Cabanyal en Valencia, conocido por sus tapas y vinos.', 25.00, 100),
(4, 'Hotel Las Arenas', 'Hotel', 'Un hotel de lujo ubicado en la playa de Las Arenas en Valencia.', 150.00, 250),
(5, 'Ruta del Vino de Utiel-Requena', 'Ruta', 'Una ruta turística para explorar las bodegas y viñedos de la región de Utiel-Requena.', 20.00, 50),
(6, 'Museo de Historia de Valencia', 'Museo', 'Un museo que muestra la historia de la ciudad de Valencia.', 5.00, 300),
(7, 'Bioparc Valencia', 'Ruta', 'Un parque zoológico en Valencia donde los animales viven en hábitats naturales.', 25.00, 1500),
(8, 'Restaurante La Pepica', 'Restaurante', 'Un restaurante famoso por su paella en la playa de la Malvarrosa en Valencia.', 30.00, 200),
(9, 'Hotel RH Bayren & Spa', 'Hotel', 'Un hotel con spa ubicado en primera línea de playa en Gandía.', 120.00, 180),
(10, 'Museo del Azulejo de Onda', 'Museo', 'Un museo dedicado a la cerámica y los azulejos en Onda, Castellón.', 3.00, 400),
(11, 'Ruta del Agua de Chelva', 'Ruta', 'La Ruta del Agua combina naturaleza y cultura en un agradable paseo de aproximadamente dos horas de duración con áreas de descanso, ideal para un público familiar.', 0.00, 1000),
(12, 'Ruta de los Puentes Colgantes de Chulilla', 'Ruta', 'Una de las rutas en Valencia más bonitas y espectaculares es la Ruta de los Pantaneros o Ruta de los Puentes Colgantes de Chulilla. Es una excursión muy sencilla que se puede hacer con niños, de unos 9 kilómetros de longitud; la mitad si solo vamos hasta el 2º puente. Además el pueblo de Chulilla tiene muchas otras rutas y lugares con encanto para visitar, como su castillo o el Charco Azul, por lo que resulta ideal para una escapada de fin de semana.', 0.00, 1000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `id_usuario`, `fecha_reserva`, `hora_inicio`, `hora_fin`) VALUES
(1, 1, '2024-07-07', '19:40:00', '00:00:00'),
(2, 1, '2024-07-07', '19:55:00', '00:00:00'),
(3, 1, '2024-06-27', '16:04:00', '00:00:00'),
(4, 1, '2024-06-27', '14:05:00', '00:00:00'),
(5, 1, '2024-06-27', '14:05:00', '00:00:00'),
(6, 1, '2024-07-06', '15:00:00', '00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `clave` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `clave`) VALUES
(1, 'Mauro', 'mauro@test.com', '$2y$10$t7USOhBuUdfobfiyYBhaqevGuigGsFnXrLNrbMC4neMYXvoeXWVIK');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalles_reserva`
--
ALTER TABLE `detalles_reserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_reserva` (`id_reserva`),
  ADD KEY `id_recurso` (`id_recurso`);

--
-- Indices de la tabla `recursos`
--
ALTER TABLE `recursos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalles_reserva`
--
ALTER TABLE `detalles_reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `recursos`
--
ALTER TABLE `recursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_reserva`
--
ALTER TABLE `detalles_reserva`
  ADD CONSTRAINT `detalles_reserva_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`),
  ADD CONSTRAINT `detalles_reserva_ibfk_2` FOREIGN KEY (`id_recurso`) REFERENCES `recursos` (`id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
