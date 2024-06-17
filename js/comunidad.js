class Comunidad {
    constructor(nombre, capital, latCapital, lonCapital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.latCapital = latCapital;
        this.lonCapital = lonCapital;
		this.poblacion = poblacion;

		this.apiKey = '8fa3dabcab848bd262b8fee40ae456b5';
		this.apiUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily';
		this.idValencia = 2509954;
		this.days = 7;
    }

    getName() {
        return this.nombre;
    }

    getCapital() {
        return this.capital;
    }

    getPoblacion() {
        return this.poblacion.toString();
    }

	getMeteo() {
		const url = `${this.apiUrl}?id=${this.cityId}&cnt=${this.days}&units=metric&appid=${this.apiKey}`;
        $.getJSON(url, (data) => {
            this.displayWeatherData(data);
        }).fail(() => {
            $('#prevision-meteorologica').html('<p>Error al obtener los datos meteorológicos.</p>');
        });
    }

    displayWeatherData(data) {
        let htmlContent = '';
        data.list.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString();
            htmlContent += `
                <article>
                    <h3>${date}</h3>
                    <p>Temperatura: ${day.temp.day} °C</p>
                    <p>Condición: ${day.weather[0].description}</p>
                </article>
            `;
        });
        $('#prevision-meteorologica').html(htmlContent);
    }
	
}

var comunidadValenciana = new Comunidad("Comunidad Valenciana", "Valencia", 39.469166, -0.377621, 5319448);