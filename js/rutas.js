class Ruta {
    constructor(nombre, tipo, transporte, duracion, agencia, descripcion, personasAdecuadas, lugarInicio, direccionInicio, coordenadas, referencias, recomendacion, hitos, kml, svg) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.transporte = transporte;
        this.duracion = duracion;
        this.agencia = agencia;
        this.descripcion = descripcion;
        this.personasAdecuadas = personasAdecuadas;
        this.lugarInicio = lugarInicio;
        this.direccionInicio = direccionInicio;
        this.coordenadas = coordenadas;
        this.referencias = referencias;
        this.recomendacion = recomendacion;
        this.hitos = hitos;
        this.kml = kml;
        this.svg = svg;
    }

    render() {
        const rutaElement = $(`
            <article>
                <h3>${this.nombre}</h3>
                <section>
					<h4>Características</h4>
                    <p><strong>Tipo:</strong> ${this.tipo}</p>
                    <p><strong>Transporte:</strong> ${this.transporte}</p>
                    <p><strong>Duración:</strong> ${this.duracion}</p>
                    <p><strong>Agencia:</strong> ${this.agencia}</p>
                    <p><strong>Descripción:</strong> ${this.descripcion}</p>
                    <p><strong>Personas Adecuadas:</strong> ${this.personasAdecuadas}</p>
                    <p><strong>Lugar de Inicio:</strong> ${this.lugarInicio}</p>
                    <p><strong>Dirección de Inicio:</strong> ${this.direccionInicio}</p>
                    <p><strong>Coordenadas:</strong> Latitud: ${this.coordenadas.latitud}, Longitud: ${this.coordenadas.longitud}, Altitud: ${this.coordenadas.altitud}</p>
                    <p><strong>Recomendación:</strong> ${this.recomendacion}</p>
                </section>
                <section>
                    <h4>Referencias</h4>
                    <ul>
                        ${this.referencias.map(ref => `<li><a href="${ref}" target="_blank">${ref}</a></li>`).join('')}
                    </ul>
                </section>
                <section>
                    <h4>Hitos</h4>
                    ${this.hitos.map(hito => `
                        <section>
                            <h5>${hito.nombre}</h5>
                            <p>${hito.descripcion}</p>
                            <p><strong>Coordenadas:</strong> Latitud: ${hito.coordenadas.latitud}, Longitud: ${hito.coordenadas.longitud}, Altitud: ${hito.coordenadas.altitud}</p>
                            <p><strong>Distancia Anterior:</strong> ${hito.distanciaAnterior} km</p>
							${hito.fotos.map(foto => `<img src="multimedia/imagenes/${foto}" alt="${hito.nombre}">`).join('')}
                            ${hito.videos.map(video => `<video controls src="multimedia/videos/${video}"></video>`).join('')}
                        </section>
                    `).join('')}
                </section>
            </article>
        `);
        return rutaElement;
    }
}

class RutasParser {
    constructor() {
        this.xmlPath = 'xml/rutas.xml';
		this.init();
    }

    fetchXML() {
        return $.ajax({
            type: "GET",
            url: this.xmlPath,
            dataType: "xml",
        });
    }

    parseXML(xml) {
        const rutas = [];
        $(xml).find('ruta').each(function () {
            const nombre = $(this).find('nombre:first').text();
            const tipo = $(this).find('tipo').text();
            const transporte = $(this).find('transporte').text();
            const duracion = $(this).find('duracion').text();
            const agencia = $(this).find('agencia').text();
            const descripcion = $(this).find('descripcion:first').text();
            const personasAdecuadas = $(this).find('personasAdecuadas').text();
            const lugarInicio = $(this).find('lugarInicio').text();
            const direccionInicio = $(this).find('direccionInicio').text();
            const coordenadas = {
                latitud: $(this).find('coordenadas latitud:first').text(),
                longitud: $(this).find('coordenadas longitud:first').text(),
                altitud: $(this).find('coordenadas altitud:first').text(),
            };
            const referencias = [];
            $(this).find('referencia').each(function () {
                referencias.push($(this).text());
            });
            const recomendacion = $(this).find('recomendacion').text();
            const hitos = [];
			$(this).find('hito').each(function () {
                const fotos = [];
                $(this).find('foto').each(function () {
                    fotos.push($(this).text());
                });
                const videos = [];
                $(this).find('video').each(function () {
                    videos.push($(this).text());
                });
                const hito = {
                    nombre: $(this).find('nombre').text(),
                    descripcion: $(this).find('descripcion').text(),
                    coordenadas: {
                        latitud: $(this).find('coordenadas latitud').text(),
                        longitud: $(this).find('coordenadas longitud').text(),
                        altitud: $(this).find('coordenadas altitud').text(),
                    },
                    distanciaAnterior: $(this).find('distanciaAnterior').text(),
                    fotos: fotos,
                    videos: videos,
                };
                hitos.push(hito);
            });
            const kml = $(this).find('kml').text();
            const svg = $(this).find('svg').text();
            rutas.push(new Ruta(nombre, tipo, transporte, duracion, agencia, descripcion, personasAdecuadas, lugarInicio, direccionInicio, coordenadas, referencias, recomendacion, hitos, kml, svg));
        });
        return rutas;
    }

    renderRutas(rutas) {
        const rutasContainer = $('main');
        rutas.forEach(ruta => {
            rutasContainer.append(ruta.render());
        });
    }

    init() {
        this.fetchXML().then((xml) => {
            const rutas = this.parseXML(xml);
            this.renderRutas(rutas);
        }).catch((error) => {
            console.error("Error al cargar el XML:", error);
        });
    }
}

$(document).ready(function() {
    new RutasParser();
});
