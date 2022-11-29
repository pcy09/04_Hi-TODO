let accordion = document.getElementsByClassName("group");
for (i = 0; i < accordion.length; i++) {
	accordion[i].addEventListener("click", (event) => {
		event.target.parentNode.classList.toggle("active");
	});
}

let $selectGroup = document.querySelector(".selectGroup");
$selectGroup.addEventListener("click", () => {
	$selectGroup.classList.toggle("active");
});
