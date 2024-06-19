class Carrusel {
    constructor() {
        this.ruta = "multimedia/imagenes/";
        this.indice = 0;
        this.imagenes = [
            "ciudad_artes_ciencias.jpg",
            "albufera.jpg",
            "altea.jpg",
            "peñiscola.jpg",
            "puentes_colgantes.jpg"
        ];
		this.alts = [
            "Ciudad de las Artes y las Ciencias de Valencia",
            "Albufera de Valencia",
            "Altea",
            "Peñíscola",
            "Puentes Colgantes de Chulilla"
        ];
    }

    anterior() {
		console.log(this.indice)
        if (this.indice - 1 >= 0) {
			this.indice--;
        } else {
			this.indice = 4;
        }
        document.getElementsByTagName('img')[0].src = this.ruta + this.imagenes[this.indice];
		document.getElementsByTagName('img')[0].alt = this.alts[this.indice];
		document.getElementsByTagName('p')[0].innerText = this.alts[this.indice];
    }

    siguiente() {
        if (this.indice + 1 < this.imagenes.length) {
            this.indice++;
        } else {
            this.indice = 0;
        }
        document.getElementsByTagName('img')[0].src = this.ruta + this.imagenes[this.indice];
		document.getElementsByTagName('img')[0].alt = this.alts[this.indice];
		document.getElementsByTagName('p')[0].innerText = this.alts[this.indice];
    }
    
}

var carrusel = new Carrusel();