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
                <h2>${this.nombre}</h2>
                <section>
                    <h3>Detalles</h3>
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
                    <h3>Referencias</h3>
                    <ul>
                        ${this.referencias.map(ref => `<li><a href="${ref}" target="_blank">${ref}</a></li>`).join('')}
                    </ul>
                </section>
                <section>
                    <h3>Hitos</h3>
                    ${this.hitos.map(hito => `
                        <div>
                            <h4>${hito.nombre}</h4>
                            <p>${hito.descripcion}</p>
                            <p><strong>Coordenadas:</strong> Latitud: ${hito.coordenadas.latitud}, Longitud: ${hito.coordenadas.longitud}, Altitud: ${hito.coordenadas.altitud}</p>
                            <p><strong>Distancia Anterior:</strong> ${hito.distanciaAnterior} km</p>
                            <img src="${hito.foto}" alt="${hito.nombre}">
                            ${hito.video ? `<video controls src="${hito.video}"></video>` : ''}
                        </div>
                    `).join('')}
                </section>
            </article>
        `);
        return rutaElement;
    }
}

class RutasApp {
    constructor(xmlPath) {
        this.xmlPath = xmlPath;
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
            const nombre = $(this).find('nombre').text();
            const tipo = $(this).find('tipo').text();
            const transporte = $(this).find('transporte').text();
            const duracion = $(this).find('duracion').text();
            const agencia = $(this).find('agencia').text();
            const descripcion = $(this).find('descripcion').text();
            const personasAdecuadas = $(this).find('personasAdecuadas').text();
            const lugarInicio = $(this).find('lugarInicio').text();
            const direccionInicio = $(this).find('direccionInicio').text();
            const coordenadas = {
                latitud: $(this).find('coordenadas latitud').text(),
                longitud: $(this).find('coordenadas longitud').text(),
                altitud: $(this).find('coordenadas altitud').text(),
            };
            const referencias = [];
            $(this).find('referencia').each(function () {
                referencias.push($(this).text());
            });
            const recomendacion = $(this).find('recomendacion').text();
            const hitos = [];
            $(this).find('hito').each(function () {
                const hito = {
                    nombre: $(this).find('nombre').text(),
                    descripcion: $(this).find('descripcion').text(),
                    coordenadas: {
                        latitud: $(this).find('coordenadas latitud').text(),
                        longitud: $(this).find('coordenadas longitud').text(),
                        altitud: $(this).find('coordenadas altitud').text(),
                    },
                    distanciaAnterior: $(this).find('distanciaAnterior').text(),
                    foto: $(this).find('foto').text(),
                    video: $(this).find('video').text() || null,
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
        const rutasContainer = $('#rutas-container');
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
    const app = new RutasApp('rutas.xml');
    app.init();
});
