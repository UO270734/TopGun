import xml.etree.ElementTree as ET

def prologoKML(archivo, nombre):
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")    
    archivo.write("<LineString>\n")
    # La etiqueta <extrude> extiende la línea hasta el suelo 
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")

def epilogoKML(archivo):
    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n") 
    archivo.write("<LineStyle>\n") 
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")

def main():
    nombreArchivoXML = "rutasEsquema"
    nombreArchivoKML = "ruta"
    expresionXPathRutas = ".//{http://tempuri.org/rutas}ruta"
    expresionXPathCoordenadas = ".//{http://tempuri.org/rutas}coordenadas//"

    # Abrir XML y convertirlo en un árbol
    try:
        archivoXML = open("xml/" + nombreArchivoXML + ".xml",'r')
    except IOError:
        print ('No se encuentra el archivo ', nombreArchivoXML)
        exit()    

    try:        
        arbol = ET.parse(archivoXML)
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
    raiz = arbol.getroot()

    # Por cada ruta, un archivo
    listaRutas = raiz.findall(expresionXPathRutas)
    for ruta in listaRutas:
        nombreArchivoKML = "ruta" + str(listaRutas.index(ruta)+1)

        try:
            archivoKML = open("xml/" + nombreArchivoKML + ".kml",'w')
        except IOError:
            print ('No se puede crear el archivo ', "xml/" + nombreArchivoKML + ".kml")
            exit()

        prologoKML(archivoKML, nombreArchivoKML)

        # Coordenadas
        listaCoordenadas = ruta.findall(expresionXPathCoordenadas)
        for hijo in listaCoordenadas:
            archivoKML.write(hijo.text)
            if (listaCoordenadas.index(hijo) % 3 < 2):
                archivoKML.write(",") 
            else:
                archivoKML.write("\n")

        epilogoKML(archivoKML)
        archivoKML.close()

    archivoXML.close()

    print("FIN")

if __name__ == "__main__":
    main()