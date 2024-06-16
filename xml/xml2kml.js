const fs = require('fs');
const xml2js = require('xml2js');

function prologoKML(archivo, nombre) {
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n');
    archivo.write("<Document>\n");
    archivo.write("<Placemark>\n");
    archivo.write("<name>"+nombre+"</name>\n");
    archivo.write("<LineString>\n");
    archivo.write("<extrude>1</extrude>\n");
    archivo.write("<tessellate>1</tessellate>\n");
    archivo.write("<coordinates>\n");
}

function epilogoKML(archivo) {
    archivo.write("</coordinates>\n");
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n");
    archivo.write("</LineString>\n");
    archivo.write("<Style> id='lineaRoja'>\n");
    archivo.write("<LineStyle>\n");
    archivo.write("<color>#ff0000ff</color>\n");
    archivo.write("<width>5</width>\n");
    archivo.write("</LineStyle>\n");
    archivo.write("</Style>\n");
    archivo.write("</Placemark>\n");
    archivo.write("</Document>\n");
    archivo.write("</kml>\n");
}

async function main() {
    const nombreArchivoXML = "rutas";
    const expresionXPathRutas = "rutas.ruta";
    const expresionXPathCoordenadas = "coordenadas.coordenada";

    try {
        const archivoXML = fs.readFileSync(`xml/${nombreArchivoXML}.xml`, 'utf-8');
        const parser = new xml2js.Parser();
        const arbol = await parser.parseStringPromise(archivoXML);

        // Imprimir la estructura del JSON resultante
        console.log(JSON.stringify(arbol, null, 2));

        // Acceder a las rutas usando la estructura del JSON
        const listaRutas = arbol.rutas.ruta;

        if (!Array.isArray(listaRutas)) {
            console.error('listaRutas no es un array. Verifica la estructura del XML.');
            return;
        }

        listaRutas.forEach((ruta, index) => {
            const nombreArchivoKML = `ruta${index + 1}.kml`;

            try {
                const archivoKML = fs.createWriteStream(`xml/${nombreArchivoKML}`);
                prologoKML(archivoKML, nombreArchivoKML);

                // Acceder a las coordenadas usando la estructura del JSON
                const coordenadas = ruta.coordenadas[0];
                const { altitud, latitud, longitud } = coordenadas;

                // Escribir las coordenadas en el archivo KML
                archivoKML.write(`${longitud},${latitud},${altitud}\n`);

				// Recorrer los hitos dentro de cada ruta
				const hitos = ruta.hito;
				if (!Array.isArray(hitos)) {
					console.error('hitos no es un array. Verifica la estructura del XML.');
					return;
				}
				
				hitos.forEach((hito) => {
					// Acceder a las coordenadas de cada hito
					const coordenadas = hito.coordenadas[0];
					const { altitud, latitud, longitud } = coordenadas;
		
					// Escribir las coordenadas en el archivo KML
					archivoKML.write(`${longitud},${latitud},${altitud}\n`);
				});

                epilogoKML(archivoKML);
                archivoKML.end();

            } catch (error) {
                console.error(`No se puede crear el archivo xml/${nombreArchivoKML}: ${error}`);
            }
        });

    } catch (error) {
        console.error(`Error procesando el archivo XML ${nombreArchivoXML}.xml: ${error}`);
    }

    console.log("FIN");
}

main();
