let captions1 = document.querySelectorAll("#tabs-1 p");
let captions2 = document.querySelectorAll("#tabs-2 h3");
let myArray1 = [];
let myArray2 = [];
let counter = 1;
for (const caption of captions1) {
	myArray1.push({
		id: counter++,
		text: caption.textContent,
	});
}
counter = 1;
for (const caption of captions2) {
	myArray2.push({
		id: counter++,
		text: caption.textContent,
	});
}
const searchInput = document.querySelector('input[type ="search"]');

searchInput.addEventListener("keyup", keyupHandler);

function keyupHandler() {
	const captions1Wrap = document.querySelectorAll("#tabs-1 .todoList");
	const captions2Wrap = document.querySelectorAll("#tabs-2 .todoList");

	for (const item of captions1Wrap) {
		item.classList.add("dNone");
	}
	for (const item of captions2Wrap) {
		item.classList.add("dNone");
	}
	const keywords = this.value;
	const filteredArray1 = myArray1.filter((e1) =>
		e1.text
			.toLowerCase()
			.replace(/(\s*)/g, "")
			.includes(keywords.toLowerCase().replace(/(\s*)/g, "")),
	);
	if (filteredArray1.length > 0) {
		for (const el of filteredArray1) {
			document
				.querySelector(`#tabContent>#tabs-1 .todoList:nth-child(${el.id})`)
				.classList.remove("dNone");
		}
	}
	const filteredArray2 = myArray2.filter((e1) =>
		e1.text
			.toLowerCase()
			.replace(/(\s*)/g, "")
			.includes(keywords.toLowerCase().replace(/(\s*)/g, "")),
	);
	if (filteredArray2.length > 0) {
		for (const el of filteredArray2) {
			document
				.querySelector(`#tabContent>#tabs-2 .todoList:nth-child(${el.id})`)
				.classList.remove("dNone");
		}
	}
}
