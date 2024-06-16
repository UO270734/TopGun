const fs = require('fs');
const xml2js = require('xml2js');

function prologoSVG(archivo, nombre) {
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n');
}

function epilogoSVG(archivo) {
    archivo.write("</svg>\n");
}

async function main() {
    const nombreArchivoXML = "rutas";

    try {
        const archivoXML = fs.readFileSync(`xml/${nombreArchivoXML}.xml`, 'utf-8');
        const parser = new xml2js.Parser();
        const arbol = await parser.parseStringPromise(archivoXML);

        // Acceder a las rutas usando la estructura del JSON
        const listaRutas = arbol.rutas.ruta;

        if (!Array.isArray(listaRutas)) {
            console.error('listaRutas no es un array');
            return;
        }

        listaRutas.forEach((ruta, index) => {
            const nombreArchivoSVG = `perfil${index + 1}.svg`;

            try {
                const archivoSVG = fs.createWriteStream(`xml/${nombreArchivoSVG}`);
                prologoSVG(archivoSVG, nombreArchivoSVG);

				var distanciaAcumulada = 0;
				var distancias = [];
				var altitudes = [];

				// Recorrer los hitos dentro de cada ruta
				const hitos = ruta.hito;
				if (!Array.isArray(hitos)) {
					console.error('hitos no es un array');
					return;
				}
				hitos.forEach((hito) => {
					var distanciaGrande = false;

					const distancia = 10 + hito.distanciaAnterior[0]._ * 200;
					if (distancia > 1000)
						distanciaGrande = true;
					distanciaAcumulada += distancia;
					if (distanciaGrande) {
						distancias.push(distanciaAcumulada/40);
					} else {
						distancias.push(distanciaAcumulada);
					}					

					altitudes.push(hito.coordenadas[0].altitud[0]);
				});

                // Acceder a las coordenadas usando la estructura del JSON
                const coordenadas = ruta.coordenadas[0];
                const { altitud, latitud, longitud } = coordenadas;

				var texto = `10,${altitud}`;
				for (var i=0; i < distancias.length; i++) {
					texto += ` ${distancias[i]},${altitudes[i]}`;
				}
				archivoSVG.write(`<polyline points="${texto}" style="fill:white;stroke:red;stroke-width:4" />\n`);

                // Escribir los hitos en el archivo SVG				
				for (var i=0; i < hitos.length; i++) {
					const coordenadas = hitos[i].coordenadas[0];
					const { altitud, latitud, longitud } = coordenadas;
		
					archivoSVG.write(`<text x="${distancias[i]}" y="${altitud}" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n`);
					archivoSVG.write(`${hitos[i].nombre}\n`);
					archivoSVG.write('</text>\n');
				}

                epilogoSVG(archivoSVG);
                archivoSVG.end();

            } catch (error) {
                console.error(`No se puede crear el archivo xml/${nombreArchivoSVG}: ${error}`);
            }
        });

    } catch (error) {
        console.error(`Error procesando el archivo XML ${nombreArchivoXML}.xml: ${error}`);
    }
}

main();
