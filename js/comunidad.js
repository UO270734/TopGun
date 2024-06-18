class Comunidad {
    constructor(nombre, capital, latCapital, lonCapital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.latCapital = latCapital;
        this.lonCapital = lonCapital;
		this.poblacion = poblacion;

		this.apiKey = '8fa3dabcab848bd262b8fee40ae456b5';		
		this.apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
		//this.apiUrl = 'https://api.openweathermap.org/data/2.5/onecall';
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

	mostrarMeteorologia() {
        var url = `${this.apiUrl}?lat=${this.latCapital}&lon=${this.lonCapital}&units=metric&appid=${this.apiKey}`;

        $('section').append("<h3>Previsión meteorológica en Valencia para los próximos 5 días</h3>");
        $.ajax({
            dataType: 'json',
            url: url,
            method: 'GET',
            success: function (data) {
                var previsiones = data.list;
                var dias = [];
                dias.push(previsiones[0]);

                previsiones.forEach(prevision => {
                    if (prevision.dt_txt.split(' ')[1] == '12:00:00') {
                        dias.push(prevision);
                    }                    
                });
                dias.forEach(dia => {
                    let diaHtml = '<table>';
                    diaHtml += `<caption>${dia.dt_txt.split(' ')[0]}</caption>`;
					diaHtml += `<tbody>`
					diaHtml += `<tr>`
					diaHtml += `<td>Temperatura máxima</td>`
					diaHtml += `<td>${dia.main.temp_max} ºC</td>`
					diaHtml += `<td rowspan="0"><img src="https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png" alt="${dia.weather[0].main}"/></td>`
					diaHtml += `</tr>`
					diaHtml += `<tr>`
					diaHtml += `<td>Temperatura mínima</td>`
					diaHtml += `<td>${dia.main.temp_min}</td>`
					diaHtml += `</tr>`
					diaHtml += `<tr>`
					diaHtml += `<td>Sensación térmica:</td>`
					diaHtml += `<td>${dia.main.feels_like} ºC</td>`
					diaHtml += `</tr>`
					diaHtml += `<tr>`
					diaHtml += `<td>Humedad</td>`
					diaHtml += `<td>${dia.main.humidity} %</td>`
					diaHtml += `</tr>`
					diaHtml += `<tr>`
					diaHtml += `<td>Presión atmosférica</td>`
					diaHtml += `<td>${dia.main.pressure} hPa</td>`
					diaHtml += `</tr>`
					diaHtml += `<tr>`
					diaHtml += `<td>Velocidad del viento</td>`
					diaHtml += `<td>${dia.wind.speed} m/s</td>`
					diaHtml += `</tr>`
                    if (dia.pop !== undefined) {
						diaHtml += `<tr>`
						diaHtml += `<td>Probabilidad de precipitación</td>`
						diaHtml += `<td>${(dia.pop * 100).toFixed(0)}%</td>`
						diaHtml += `</tr>`
                    }
                    diaHtml += `</tbody>`
					diaHtml += '</table>';     

                    $("section").append(diaHtml);
                });
            },
            error: function() {
                $('section').append("<p>Ha ocurrido un error al cargar la meteorología.</p>");
            }
        });
    }
	
}

var comunidadValenciana = new Comunidad("Comunidad Valenciana", "Valencia", 39.469166, -0.377621, 5319448);