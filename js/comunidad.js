"use strict";
class Comunidad {
    constructor(nombre, capital, latCapital, lonCapital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.latCapital = latCapital;
        this.lonCapital = lonCapital;
		this.poblacion = poblacion;

		this.apiKeyMeteo = '8fa3dabcab848bd262b8fee40ae456b5';		
		this.apiUrlDias = 'https://api.openweathermap.org/data/2.5/forecast';
		//this.apiUrlDias = 'https://api.openweathermap.org/data/2.5/onecall';
		this.apiUrlActual = 'https://api.openweathermap.org/data/2.5/weather';
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

	// Página Meteorología
	mostrarMeteorologia() {
        var url = `${this.apiUrlDias}?lat=${this.latCapital}&lon=${this.lonCapital}&units=metric&appid=${this.apiKeyMeteo}`;

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
                    var diaHtml = '<table>';
                    diaHtml += `<caption>${dia.dt_txt.split(' ')[0]}</caption>`;
					diaHtml += `<tbody>`;
					diaHtml += `<tr>`;
					diaHtml += `<td>Temperatura máxima</td>`;
					diaHtml += `<td>${dia.main.temp_max} ºC</td>`
					diaHtml += `<td rowspan="0"><img src="https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png" alt="${dia.weather[0].main}"/></td>`;
					diaHtml += `</tr>`;
					diaHtml += `<tr>`;
					diaHtml += `<td>Temperatura mínima</td>`;
					diaHtml += `<td>${dia.main.temp_min}</td>`;
					diaHtml += `</tr>`;
					diaHtml += `<tr>`;
					diaHtml += `<td>Sensación térmica:</td>`;
					diaHtml += `<td>${dia.main.feels_like} ºC</td>`;
					diaHtml += `</tr>`;
					diaHtml += `<tr>`;
					diaHtml += `<td>Humedad</td>`;
					diaHtml += `<td>${dia.main.humidity}%</td>`;
					diaHtml += `</tr>`;
					diaHtml += `<tr>`;
					diaHtml += `<td>Presión atmosférica</td>`;
					diaHtml += `<td>${dia.main.pressure} hPa</td>`;
					diaHtml += `</tr>`;
					diaHtml += `<tr>`;
					diaHtml += `<td>Velocidad del viento</td>`;
					diaHtml += `<td>${dia.wind.speed} m/s</td>`;
					diaHtml += `</tr>`;
                    if (dia.pop !== undefined) {
						diaHtml += `<tr>`;
						diaHtml += `<td>Probabilidad de precipitación</td>`;
						diaHtml += `<td>${(dia.pop * 100).toFixed(0)}%</td>`;
						diaHtml += `</tr>`;
                    }
                    diaHtml += `</tbody>`;
					diaHtml += '</table>';     

                    $("section").append(diaHtml);
                });
            },
            error: function() {
                $('section').append("<p>Ha ocurrido un error al cargar la meteorología.</p>");
            }
        });
    }

	// Página principal
	mostrarMeteorologiaActual() {
        var url = `${this.apiUrlActual}?lat=${this.latCapital}&lon=${this.lonCapital}&units=metric&appid=${this.apiKeyMeteo}`;
		var section = document.getElementsByTagName("section")[1];
		$.ajax({
            dataType: 'json',
            url: url,
            method: 'GET',
            success: function (data) {
				var previsionHtml = '<table>';
				previsionHtml += `<caption>${new Date(data.dt*1000).toLocaleDateString()} - ${new Date(data.dt*1000).toLocaleTimeString()}</caption>`;
				previsionHtml += `<tbody>`;
				previsionHtml += `<tr>`;
				previsionHtml += `<td>Temperatura actual</td>`;
				previsionHtml += `<td>${data.main.temp} ºC</td>`
				previsionHtml += `<td rowspan="0"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}"/></td>`;
				previsionHtml += `</tr>`;
				previsionHtml += `<tr>`;
				previsionHtml += `<td>Temperatura máxima</td>`;
				previsionHtml += `<td>${data.main.temp_max} ºC</td>`
				previsionHtml += `</tr>`;
				previsionHtml += `<tr>`;
				previsionHtml += `<td>Temperatura mínima</td>`;
				previsionHtml += `<td>${data.main.temp_min}</td>`;
				previsionHtml += `</tr>`;
				previsionHtml += `<tr>`;
				previsionHtml += `<td>Sensación térmica:</td>`;
				previsionHtml += `<td>${data.main.feels_like} ºC</td>`;
				previsionHtml += `</tr>`;
				previsionHtml += `<tr>`;
				previsionHtml += `<td>Humedad</td>`;
				previsionHtml += `<td>${data.main.humidity}%</td>`;
				previsionHtml += `</tr>`;
				previsionHtml += `<tr>`;
				previsionHtml += `<td>Presión atmosférica</td>`;
				previsionHtml += `<td>${data.main.pressure} hPa</td>`;
				previsionHtml += `</tr>`;
				previsionHtml += `<tr>`;
				previsionHtml += `<td>Velocidad del viento</td>`;
				previsionHtml += `<td>${data.wind.speed} m/s</td>`;
				previsionHtml += `</tr>`;
				if (data.pop !== undefined) {
					previsionHtml += `<tr>`;
					previsionHtml += `<td>Probabilidad de precipitación</td>`;
					previsionHtml += `<td>${(data.pop * 100).toFixed(0)}%</td>`;
					previsionHtml += `</tr>`;
				}
				previsionHtml += `</tbody>`;
				previsionHtml += '</table>';     

				$(section).append(previsionHtml);
            },
            error: function() {
                $(section).append("<p>Ha ocurrido un error al cargar la meteorología.</p>");
            }
        });
	}

	mostrarMapa() {
		var section = document.getElementsByTagName("section")[2];
		var apiUrlMapa = "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/";
		var apiKeyMapa = "pk.eyJ1IjoidW8yNzA3MzQiLCJhIjoiY2x4bTBmNWxvMDM3ejJoc2R6cWNidWpybSJ9.ukVmgjy0e7-v9BbmSmkaWw";
		var zoom = 8;
        var tamaño = "900x1280";
		var mapImg = `${apiUrlMapa}pin-l(${this.lonCapital},${this.latCapital})/${this.lonCapital},${this.latCapital},${zoom}/${tamaño}?access_token=${apiKeyMapa}`;
        $(section).append(`<img src="${mapImg}" alt="Mapa de Comunidad Valenciana"/>`);
	}

	mostrarNoticias(){
		var section = document.getElementsByTagName("section")[3];
		var apiUrlNoticias = "https://newsapi.org/v2/everything";
		var apiKeyNoticias = "580bfc4d12cd40e0bd59ef979697f125";
		var cantidad = 5;
		var url = `${apiUrlNoticias}?q=${this.nombre}&searchIn=title&language=es&pageSize=${cantidad}&apiKey=${apiKeyNoticias}`;
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function (data) {
				var ultimaActualizacion = new Date(Date.now());
				$(section).append(`<p>Última actualización: ${ultimaActualizacion.toLocaleString("es-ES")}.</p>`);
                var noticiaHtml = '';
                for (var i = 0; i < data.articles.length; i++) {
                    noticiaHtml += "<h4>" + data.articles[i].title + "</h4>";
                    noticiaHtml += "<p>" + data.articles[i].description + "</p>";
                    noticiaHtml += "<a href='" + data.articles[i].url + "'> Leer más... </a>";
                }
                $(section).append(noticiaHtml);
            },
            error: function () {
                $(section).append("<p>Ha ocurrido un error al cargar las noticias.</p>");
            }
        });
    }
	
}

var comunidadValenciana = new Comunidad("Comunidad Valenciana", "Valencia", 39.469166, -0.377621, 5319448);