"use strict";
class UltimaActualizacion {
	constructor() {	}

	mostrarFechaYHora() {
		var section = document.getElementsByTagName('section')[4];
		var ultimaActualizacionDocumento = document.lastModified;
		var html = `<p>Última actualización de esta página: ${ultimaActualizacionDocumento}.</p>`;
		$(section).append(html);
	}
}

var ultimaActualizacion = new UltimaActualizacion();
  