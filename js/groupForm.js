let $addGroupForm = document.forms.addGroupForm;
let $todolist = document.getElementById("todolist");
let $addGroupBtn = document.querySelector(".createGroupBtn");
let $addGroupFormWrap = document.getElementById("addGroupFormWrap");
let $addTodoFormWrap = document.getElementById("addTodoFormWrap");
let groupColor = "purple";
let $appender = $addGroupForm.querySelector("input");
let $todoInput = $addTodoFormWrap.querySelector("input");

/* 함수 */
// (1) 리스트 체크박스 토글 함수 (완료/취소)
function toggleItem(event) {
	const $content = event.target.parentNode.querySelector("p");
	const completed =
		event.target.innerHTML.trim() ===
		`<i class="fa-solid fa-square" style="color: rgb(239, 239, 239)"></i>`;

	event.target.innerHTML = completed
		? `<i class="fa-solid fa-square-check" style="color: rgb(133, 171, 246);"></i>`
		: `<i class="fa-solid fa-square" style="color: rgb(239, 239, 239)"></i>`;
	$content.style.color = completed ? "#c4c4c4" : "#333";
	$content.style.textDecoration = completed ? "line-through" : "none";
}
// (2) 리스트 추가 함수
function appendItem(event) {
	event.preventDefault();
	let $newItem = document.createElement("div");
	let $createGroup = document.querySelector(".createGroup");

	if ($appender.value.trim() == "") {
		alert("추가할 목록 이름을 적어주세요");
		$appender.value = "";
		$appender.focus();
	} else {
		$newItem.classList.add("groupWrap");
		$newItem.innerHTML = `
    <div class="group ${groupColor}">
      <p class="groupName">${$appender.value}</p>
      <span><i class="fa-solid fa-angle-down dropDown"></i></span>
    </div>
    <ul class="list">
      <button class="comment">댓글 0개 모두 보기</button>
    </ul>
    `;
		$todolist.insertBefore($newItem, $createGroup);
		$appender.value = "";
		$addGroupFormWrap.style.display = "none";
		$buttonGroupWrap.classList.remove("active");

		$newItem.querySelector(".group").addEventListener("click", (e) => {
			e.target.parentNode.classList.toggle("active");
		});
	}
}

/* 이벤트 */
$todolist.querySelectorAll(".complete").forEach(($complete) => {
	$complete.onclick = toggleItem;
});

$addGroupForm.onsubmit = appendItem;

/* 그룹추가 버튼 누르면 그룹추가 폼창 불러오기/닫기 */
$addGroupBtn.addEventListener("click", () => {
	$addGroupFormWrap.style.display = "block";
	$appender.focus();
});
$addGroupFormWrap.addEventListener("click", (e) => {
	if (e.target.getAttribute("id") === "addGroupFormWrap") {
		e.target.style.display = "none";
	}
});

/* 색상 버튼 누르면 아이콘 바뀌기 */
let $colorWrap = document.querySelector(".colorWrap");
$colorWrap.querySelectorAll(".colors").forEach(($colors) => {
	$colors.addEventListener("click", (e) => {
		$colorWrap.querySelectorAll(".colors").forEach((e) => {
			e.classList.replace("fa-circle-check", "fa-circle");
		});
		e.target.classList.replace("fa-circle", "fa-circle-check");
		$addGroupForm.style.backgroundColor = e.target.dataset.color;
		groupColor = e.target.dataset.name;
	});
});

/* 버튼 그룹 토글 */
let $buttonGroup = document.querySelector(".buttonGroupBtn");
let $buttonGroupWrap = document.querySelector(".buttonGroupWrap");
$buttonGroup.addEventListener("click", () => {
	$buttonGroupWrap.classList.toggle("active");
});
$buttonGroupWrap.addEventListener("click", (e) => {
	if (e.target.classList.value === "buttonGroupWrap active") {
		e.target.classList.remove("active");
	}
});

let $groupAddBtn = document.querySelector(".groupAddBtn");
$groupAddBtn.addEventListener("click", () => {
	$addGroupFormWrap.style.display = "block";
	$appender.focus();
});

let $todoAddBtn = document.querySelector(".todoAddBtn");
$todoAddBtn.addEventListener("click", () => {
	$addTodoFormWrap.style.display = "block";
	$todoInput.focus();
});

$addTodoFormWrap.addEventListener("click", (e) => {
	if (e.target.getAttribute("id") === "addTodoFormWrap") {
		e.target.style.display = "none";
	}
});

/* 할일 추가 > 그룹 리스트 설정 */
let $groupName = document.getElementsByClassName("groupName");
let $groupList = document.querySelector(".groupList");
let $firstGroupName = document.querySelector(".firstGroupName");

for (i = 0; i < $groupName.length; i++) {
	$groupList.innerHTML += `<li>${$groupName[i].innerHTML}</li>`;
}

$firstGroupName.innerHTML = $groupName[0].innerHTML;
