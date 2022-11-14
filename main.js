const questions = [
	{
		question: "В какой стране, и в каком городе проходил Финал Клубного чемпионата мира 2019?",
		answers: [
			"Иокогама (Япония)",
			"Абу-Даби (ОАЭ)",
			"Лондон (Англия)",
			"Доха (Катар)"],
		correct: 4,
	},
	{
		question: "Кто признан лучшим вратарём вы 2019 году по версии ФИФА?",
		answers: [
			"Алиссон из «Ливерпуля»",
			"Тибо Куртуа из «Реала»",
			"Ян Облак из «Атлетико»",
			"Давид де Хеа из «Манчестер Юнайтед»",
		],
		correct: 1,
	},
	{
		question: "Кто является лучшим бомбардиром за всю историю сборной Португалии?",
		answers: [
			"Луиш Фигу",
			"Криштиану Роналду",
			"Фернанду Сантуш",
			"Деку",
		],
		correct: 2,
	},
	{
		question: "Команда из какой страны чаще всего становилась победителем чемпионата мира и сколько раз?",
		answers: [
			"Бразилия (5 побед)",
		 	"Англия (4 победы)",
		  	"Испания (4 победы)",
			"Германия (3 победы)"],
		correct: 1,
	},
	{
		question: "Назовите самую титулованную команду в истории советского и российского футбола?",
		answers: [
			"Динамо",
		 	"ЦСКА",
		  	"Спартак Москва",
			"Зенит"],
		correct: 3,
	}
];

// находим элементы.
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const answerOk = document.querySelector('.answerOk');


// переменные игры.
let score = 0; // количество правильных ответов
let questionIndex = 0; // текущий вопрос.

clearPage();
showQuestion();

submitBtn.addEventListener('click', () => {
	checkAnswer();
});

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	// вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']); // Возвращает новую строку с заменой на наш вопрос. Метод replace().
	headerContainer.innerHTML = title;

	// варианты ответа
	const answers = (questions[questionIndex]['answers']);

	answers.forEach((answerText, index) => {
		const questionTemplate = `
		<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

		const answerHTML = questionTemplate
											.replace('%answer%', answerText)
											.replace('%number%', index + 1, answerText);

		listContainer.innerHTML += answerHTML;
	});
}


function checkAnswer() {
	console.log('checkanswer');

	// находим выбранную радио-кнопку.
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (!checkedRadio) {
		submitBtn.blur();
		return;	
	}

	// узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value);

	// если ответил верно - увеличиваем счёт
	if(userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if(questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		showResults();
	}
}	

function showResults() {

	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
		`;
	
	let title, message;

	if(score === questions.length) {
		title = 'Поздравляем!!! 	&#128525; &#128175; &#128104;&#8205;&#127891;';
		message = 'Вы ответили на все вопросы!';
	} else if(score * 100 / questions.length >= 50) {
		title = 'Неплохой резульат &#128076; &#128015;';
		message = 'Вы дали более половины правильных вопросов';
	} else {
		title = 'Стоит постараться &#128405; 	&#128580; 	&#128104;&#8205;&#9992;&#65039;';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	// результат
	let result = `${score} из ${questions.length}`;

	// финальный ответ. Подставляем данные в шаблон.
	const finalMessage = resultsTemplate
										.replace('%title%', title)
										.replace('%message%', message)
										.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;
	
	submitBtn.blur(); // меняем активность кнопки
	submitBtn.innerText = 'Начать заново'; // меняем назавание кнопки.
	
	submitBtn.addEventListener('click', () => { // по клику перезагружаем заново викторину.
		history.go();
	});

}
