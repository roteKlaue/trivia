Array.prototype.shuffle = function () {
	let currentIndex = this.length, randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[this[currentIndex], this[randomIndex]] = [this[randomIndex], this[currentIndex]];
	}
}

const state = { correct: 0, wrong: 0, currentQuesions: [], currentIndex: 0, sus: true, selected: null };
const diffi = document.querySelectorAll('button[group="difficulty"]');
const awnsers = Array.from(document.querySelectorAll(".anwser"));
const question = document.querySelector("#question");
let difficulty = "easy";

diffi.forEach(elm =>
	elm.addEventListener("click", (e) => {
		e.preventDefault();
		diffi.forEach(elm => elm.removeAttribute("disabled"));
		document.querySelector(`#${e.target.id}`).setAttribute("disabled", true);
		difficulty = e.target.id;
	}));

document.querySelector("#easy").setAttribute("disabled", true);

const highlight = (e) => {
	e.preventDefault();
	awnsers.forEach(el => el.removeAttribute("disabled"));
	document.querySelector(`#${e.target.id}`).setAttribute("disabled", true);
	state.selected = e.target.id;
}

const request = (callback) => {
	const limit = document.querySelector("#limit").value;
	const category = document.querySelector("#category").value;
	const requestBody = `https://the-trivia-api.com/api/questions?limit=${limit}&difficulty=${difficulty}&categories=${category}`
	axios.get(requestBody).then(async response => response.data).then(callback);
}

const loadQuestion = (index) => {
	if(index >= state.currentQuesions.length) {
		document.querySelector("#game").style.display = "none";
		document.querySelector(".end").style.display = "block";
		document.querySelector("#total").innerText = state.currentQuesions.length;
		document.querySelector("#solved").innerText = state.correct;
		return;
	}
	state.selected = null;
	const currentQuestion = state.currentQuesions[index];
	state.sus = true;
	document.querySelector("#go").innerText = "submit";
	awnsers.forEach(e => {e.removeAttribute("disabled");e.removeAttribute("state");e.addEventListener("click", highlight)});
	awnsers.shuffle();

	question.innerText = currentQuestion.question;
	awnsers[0].innerText = currentQuestion.correctAnswer;
	for(let i = 1; i < awnsers.length; i++) {
		awnsers[i].innerText = currentQuestion.incorrectAnswers[i - 1];
	}
}

document.querySelector("#limit").addEventListener("input", (e) => {
	document.querySelector("#sus").innerText = +e.target.value < 10 ? "0" + e.target.value : e.target.value;
});

document.querySelector("#sus").innerText = "05";

document.querySelector("#start").addEventListener("click", request.bind(null, (questions) => {
		document.querySelector("#pregame").style.display = "none";
		document.querySelector("#game").style.display = "block";
		state.currentQuesions = questions;
		document.querySelector("#score").innerHTML = '<span class="square gray"></span>'.repeat(questions.length);
		loadQuestion(0);
	}));

document.querySelector("#go").addEventListener("click", () => 
	(state.sus? () => {
		if(!state.selected) return;
		const correct = awnsers.find(e => e.innerHTML.toLowerCase() === state.currentQuesions[state.currentIndex].correctAnswer.toLowerCase());
		correct.setAttribute("state", "correct");
		document.querySelectorAll(".square")[state.currentIndex].classList.add(correct.id !== state.selected? "red": "green");
		state.correct++;
		if(correct.id !== state.selected) {
			document.querySelector(`#${state.selected}`).setAttribute("state", "wrong");
			state.correct--;
			state.wrong++;
		}
		state.sus = false;
		state.currentIndex++;
		document.querySelector("#go").innerText = "next";
		awnsers.forEach(elm => elm.removeEventListener("click", highlight));
	} : loadQuestion.bind(null, state.currentIndex))());

document.querySelector(".back").addEventListener("click", () => {
	state.sus = true;
	state.currentIndex = 0;
	state.currentQuesions = [];
	state.wrong = 0;
	state.selected = null;
	state.correct = 0;
	document.querySelector(".end").style.display = "none";
	document.querySelector("#pregame").style.display = "block";
});