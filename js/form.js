const $todolist = document.getElementById("todolist");

/* 함수 */
// (1) 토글 함수 (완료/취소)
function toggleItem(event) {
	const $content = event.target.parentNode.querySelector("p");
	const completed =
		event.target.innerHTML.trim() ===
		`<i class="fa-solid fa-square" style="color: rgb(239, 239, 239)"></i>`;

	event.target.innerHTML = completed
		? `<i class="fa-solid fa-square-check" style="color: rgb(52, 120, 246);"></i>`
		: `<i class="fa-solid fa-square" style="color: rgb(239, 239, 239)"></i>`;
	$content.style.color = completed ? "#c4c4c4" : "#333";
	$content.style.textDecoration = completed ? "line-through" : "none";
	event.target.querySelector("i").style.color = completed
		? "#3478F6"
		: "#efefef";
}

/* 이벤트 */
$todolist.querySelectorAll(".complete").forEach(($complete) => {
	$complete.onclick = toggleItem;
});
