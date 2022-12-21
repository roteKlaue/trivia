const diffi = document.querySelectorAll('button[group="difficulty"]');
let difficulty = "easy";
diffi.forEach(elm =>
	elm.addEventListener("click", (e) => {
		e.preventDefault();
		diffi.forEach(elm => elm.removeAttribute("disabled"));
		document.querySelector(`#${e.target.id}`).setAttribute("disabled", true);
		difficulty = e.target.id;
	}));

document.querySelector("#easy").setAttribute("disabled", true);

const request = (callback) => {
	const limit = document.querySelector("#limit").value;
	const category = document.querySelector("#category").value;
	const requestBody = `https://the-trivia-api.com/api/questions?limit=${limit}&difficulty=${difficulty}&categories=${category}`
	axios.get(requestBody).then(async response => response.data).then(callback);
}

document.querySelector("#limit").addEventListener("input", (e) => {
	document.querySelector("#sus").innerText = +e.target.value < 10?  "0" + e.target.value: e.target.value;
});

document.querySelector("#sus").innerText = "05";

document.querySelector("#start").addEventListener("click", () => {
	document.querySelector("#pregame").style.display = "none";
	request((questions) => {
		console.log(questions);
	});
});