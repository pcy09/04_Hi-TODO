const accordion = document.getElementsByClassName("group");
for (i = 0; i < accordion.length; i++) {
	accordion[i].addEventListener("click", (event) => {
		event.target.parentNode.classList.toggle("active");
	});
}
