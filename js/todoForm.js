/* 변수 설정 */
let $addTodoForm = document.forms.addTodoForm;
let $addTodoFormWrap = document.getElementById("addTodoFormWrap");
let $groupName = document.getElementsByClassName("groupName");
let $groupList = document.querySelector(".groupList");
let $firstGroupName = document.querySelector(".firstGroupName");
let $todoInput = $addTodoFormWrap.querySelector("input");
let currentGroup;

/* 할일 추가 버튼 */
let $todoAddBtn = document.querySelector(".todoAddBtn");
$todoAddBtn.addEventListener("click", () => {
	// 입력폼 나타나기,입력창에 포커스
	$addTodoFormWrap.style.display = "block";
	$todoInput.focus();
	// groupList 처음이름 = 제일 처음 그룹의 이름
	$firstGroupName.innerHTML = $groupName[0].innerHTML;
	// groupList초기화
	$groupList.innerHTML = null;
	// groupName들 검색해서 groupList에 넣기
	for (i = 0; i < $groupName.length; i++) {
		$groupList.innerHTML += `<li class="groupItem">${$groupName[i].innerHTML}</li>`;
	}
	// 그룹선택하고 보여주기
	$groupList.querySelectorAll(".groupItem").forEach(($groupItem) => {
		$groupItem.addEventListener("click", (event) => {
			$firstGroupName.innerHTML = event.target.innerHTML;
		});
	});
	// 검은배경 클릭 시 닫기, 그룹선택하는 목록 초기화
	$addTodoFormWrap.addEventListener("click", (e) => {
		if (e.target.getAttribute("id") === "addTodoFormWrap") {
			e.target.style.display = "none";
			$selectGroup.classList.remove("active");
		}
	});
});

// 리스트 추가 함수
$addTodoForm.onsubmit = appendTodo;

function appendTodo(event) {
	event.preventDefault();
	let $newItem = document.createElement("li");

	if ($todoInput.value.trim() == "") {
		alert("할일을 적어주세요");
		$todoInput.value = "";
		$todoInput.focus();
	} else {
		$newItem.innerHTML = `
    <p>${$todoInput.value}</p>
    <button class="complete">
      <i
        class="fa-solid fa-square"
        style="color: rgb(239, 239, 239)"
      ></i>
    </button>
    `;
		for (i = 0; i < $groupName.length; i++) {
			if ($groupName[i].innerHTML === $firstGroupName.innerHTML) {
				currentGroup = $groupName[i].parentNode.nextElementSibling;
			}
		}
		currentGroup.insertBefore($newItem, currentGroup.querySelector(".comment"));
		$newItem.querySelector(".complete").onclick = toggleItem;
		$todoInput.value = "";
		$addTodoFormWrap.style.display = "none";
		$buttonGroupWrap.classList.remove("active");
	}
}
