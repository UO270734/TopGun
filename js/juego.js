"use strict";
class Juego {
    constructor(preguntas) {
        this.questions = preguntas;
        this.score = 0;
        this.$main = $('main');
        this.$quizForm = $('<form></form>');
        this.$submitButton = $('<button>Enviar</button>');
        this.$result = $('<p></p>');
		this.$warning = $('<p></p>');
        this.init();
    }

    init() {
        this.$main.append(this.$quizForm);
        this.$main.append(this.$submitButton);
        this.$main.append(this.$result);
		this.$main.append(this.$warning);
        this.loadQuiz();
        this.bindEvents();
    }

    loadQuiz() {
        this.$quizForm.empty();
        this.questions.forEach((q, index) => {
            const $questionHeader = $('<h3>').text(`${index + 1}. ${q.question}`);
            this.$quizForm.append($questionHeader);
            
            const $optionsList = $('<ul>');
            
            q.options.forEach((option, i) => {
                const $optionItem = $('<li>');
                
                const $optionInput = $('<input>', {
                    type: 'radio',
                    name: `question${index}`,
                    value: i,
                    id: `question${index}_option${i}`
                });
                
                const $optionLabel = $('<label>', {
                    for: `question${index}_option${i}`
                }).text(option);
                
                $optionItem.append($optionInput).append($optionLabel);
                $optionsList.append($optionItem);
            });
            
            this.$quizForm.append($optionsList);
        });
    }

	allQuestionsAnswered() {
        for (let index = 0; index < this.questions.length; index++) {
            if (!$(`input[name="question${index}"]:checked`).val()) {
                return false;
            }
        }
        return true;
    }

    checkAnswers() {
        this.score = 0;
        this.questions.forEach((q, index) => {
            const selectedOption = $(`input[name="question${index}"]:checked`).val();
            if (selectedOption && parseInt(selectedOption) === q.answer) {
                this.score++;
            }
        });
    }

	bindEvents() {
        this.$submitButton.on('click', () => {
            if (this.allQuestionsAnswered()) {
                this.$warning.text(''); // Limpiar advertencia si todas las preguntas están respondidas
                this.checkAnswers();
                this.$result.text(`Tu puntuación es: ${this.score} / 10`);
            } else {
                this.$warning.text('Por favor, responda todas las preguntas antes de enviar.');
            }
        });
    }
}

const preguntas = [
    {
        question: "¿Cuál es el título de este sitio web?",
        options: ["Proyecto convocatoria extraordinaria", "Proyecto convocatoria ordinaria", "Proyecto", "Escritorio virtual", "Convocatoria extraordinaria"],
        answer: 0
    },
    {
        question: "¿Cuál es el nombre del desarrollador del proyecto?",
        options: ["Daniel", "Mauro", "Javier", "Álvaro", "Alejandro"],
        answer: 1
    },
	{
        question: "¿Cuántas opciones tiene la barra de navegación?",
        options: ["19", "5", "6", "4", "2"],
        answer: 2
    },
	{
        question: "¿Cuál es la comunidad autónoma española que aparece en páginas como Gastronomía o Rutas?",
        options: ["Principado de Asturias", "Castilla y León", "Castilla-La Mancha", "Comunidad Valenciana", "Islas Baleares"],
        answer: 3
    },
	{
        question: "¿Cuántos productos con denominación de origen aparecen enumerados en la página de Gastronomía?",
        options: ["11", "8", "20", "16", "18"],
        answer: 4
    },
	{
        question: "¿Cuántas preguntas tiene este juego?",
        options: ["10", "11", "8", "20", "15"],
        answer: 0
    },
	{
        question: "¿Cuántas rutas hay en la página Rutas?",
        options: ["2", "3", "1", "5", "6"],
        answer: 1
    },
	{
        question: "¿Qué colores comparte la bandera de España con la que aparece en la página Gastronomía?",
        options: ["Rojo y azul", "Amarillo y azul", "Rojo y amarillo", "Marrón", "Negro y naranja"],
        answer: 2
    },
	{
        question: "¿De qué ciudad son las previsiones meteorológicas que se muestran en la página Meteorología?",
        options: ["Alicante", "Peñíscola", "Benidorm", "Valencia", "Castellón de la Plana"],
        answer: 3
    },
	{
        question: "¿?",
        options: ["2015", "2016", "2017", "2018", "2019"],
        answer: 4
    }
];

$(document).ready(() => {
    new Juego(preguntas);
});
