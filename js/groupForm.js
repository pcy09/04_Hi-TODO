let $addGroupForm = document.forms.addGroupForm;
let $addGroupBtn = document.querySelector(".createGroupBtn");
let $addGroupFormWrap = document.getElementById("addGroupFormWrap");
let groupColor = "purple";
let $appender = $addGroupForm.querySelector("input");

let $todolist = document.getElementById("todolist");

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

		$groupList.querySelectorAll(".groupItem").forEach(($groupItem) => {
			$groupItem.addEventListener("click", (event) => {
				$firstGroupName.innerHTML = event.target.innerHTML;
			});
		});
	}
}

/* 이벤트 */
$todolist.querySelectorAll(".complete").forEach(($complete) => {
	$complete.onclick = toggleItem;
});

$addGroupForm.onsubmit = appendItem;

// 그룹추가 버튼 누르면 그룹추가 폼창 불러오기
$addGroupBtn.addEventListener("click", () => {
	$addGroupFormWrap.style.display = "block";
	$appender.focus();
});

// 검은화면 누르면 그룹추가 폼창 닫기
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
let $groupAddBtn = document.querySelector(".groupAddBtn");

// 버튼그룹을 누르면 버튼화면 활성화/비활성화
$buttonGroup.addEventListener("click", () => {
	$buttonGroupWrap.classList.toggle("active");
});
// 검은화면 누르면 버튼화면 비활성화
$buttonGroupWrap.addEventListener("click", (e) => {
	if (e.target.classList.value === "buttonGroupWrap active") {
		e.target.classList.remove("active");
	}
});
// 버튼그룹 > 그룹추가 버튼 누르면 그룹추가 폼창 불러오기
$groupAddBtn.addEventListener("click", () => {
	$addGroupFormWrap.style.display = "block";
	$appender.focus();
});
