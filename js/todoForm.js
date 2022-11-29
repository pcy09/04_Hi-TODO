// 추가 폼 관련 변수
let $addTodoForm = document.forms.addTodoForm;
let $addTodoFormWrap = document.getElementById("addTodoFormWrap");
let $groupName = document.getElementsByClassName("groupName");
let $addTodogroupList = $addTodoForm.querySelector(".groupList");
let $addTodofirstGroupName = $addTodoForm.querySelector(".firstGroupName");
let $addTodoselectGroup = $addTodoForm.querySelector(".selectGroup");
let $todoInput = $addTodoFormWrap.querySelector("input");
let $todoAddBtn = document.querySelector(".todoAddBtn");
let currentGroup;

// 할일 추가 버튼 함수
function todoAddBtn() {
	// 입력폼 나타나기,입력창에 포커스
	$addTodoFormWrap.style.display = "block";
	$todoInput.focus();
	// groupList 처음이름 = 제일 처음 그룹의 이름
	$addTodofirstGroupName.innerHTML = $groupName[0].innerHTML;
	// groupList초기화
	$addTodogroupList.innerHTML = null;
	// groupName들 검색해서 groupList에 넣기
	for (i = 0; i < $groupName.length; i++) {
		$addTodogroupList.innerHTML += `<li class="groupItem">${$groupName[i].innerHTML}</li>`;
	}
	//그룹 선택하면 리스트 보이기 / 숨기기
	$addTodoselectGroup.onclick = () => {
		$addTodoselectGroup.classList.toggle("active");
	};
	// 그룹선택하고 보여주기
	$addTodogroupList.querySelectorAll(".groupItem").forEach(($groupItem) => {
		$groupItem.addEventListener("click", (event) => {
			$addTodofirstGroupName.innerHTML = event.target.innerHTML;
		});
	});
	// 검은배경 클릭 시 닫기, 그룹선택하는 목록 초기화
	$addTodoFormWrap.addEventListener("click", (e) => {
		if (e.target.getAttribute("id") === "addTodoFormWrap") {
			e.target.style.display = "none";
			$todoInput.value = "";
			$addTodoselectGroup.classList.remove("active");
		}
	});
}
$todoAddBtn.onclick = todoAddBtn;

// 리스트 추가 함수
function appendTodo(event) {
	event.preventDefault();
	let $newItem = document.createElement("li");

	if ($todoInput.value.trim() == "") {
		alert("할일을 적어주세요");
		$todoInput.value = "";
		$todoInput.focus();
	} else {
		$newItem.classList.add("listItem");
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
			if ($groupName[i].innerHTML === $addTodofirstGroupName.innerHTML) {
				currentGroup = $groupName[i].parentNode.nextElementSibling;
			}
		}
		currentGroup.insertBefore($newItem, currentGroup.querySelector(".comment"));
		$newItem.querySelector(".complete").onclick = toggleItem;
		$todoInput.value = "";
		$addTodoFormWrap.style.display = "none";
		$buttonGroupWrap.classList.remove("active");

		$newItem.onclick = (e) => {
			if (e.target.getAttribute("class") === "listItem") {
				editItem(e);
			}
		};
	}
}
$addTodoForm.onsubmit = appendTodo;

/* 할일 수정 함수 */

// 수정 폼 관련 변수
let $editTodoForm = document.forms.editTodoForm;
let $editTodoFormWrap = document.getElementById("editTodoFormWrap");
let $editTodoInput = $editTodoFormWrap.querySelector("input");
let $removeBtn = $editTodoForm.querySelector(".remove");
// let $editTodofirstGroupName = $editTodoForm.querySelector(".firstGroupName");
// let $editTodogroupList = $editTodoForm.querySelector(".groupList");
// let $editTodoselectGroup = $editTodoForm.querySelector(".selectGroup");

function editItem(event) {
	let $currentValue = event.target.querySelector("p");
	// 입력폼 나타나기,입력창에 포커스
	$editTodoFormWrap.style.display = "block";
	$editTodoInput.value = $currentValue.innerHTML;
	$editTodoInput.focus();
	/* 그룹편집
	// groupList 처음이름 = 제일 처음 그룹의 이름
	$editTodofirstGroupName.innerHTML = $groupName[0].innerHTML;
	// groupList초기화
	$editTodogroupList.innerHTML = null;
	// groupName들 검색해서 groupList에 넣기
	for (i = 0; i < $groupName.length; i++) {
		$editTodogroupList.innerHTML += `<li class="groupItem">${$groupName[i].innerHTML}</li>`;
	}
	//그룹 선택하면 리스트 보이기 / 숨기기
	$editTodoselectGroup.onclick = () => {
		$editTodoselectGroup.classList.toggle("active");
	};
	// 그룹선택하고 보여주기
	$editTodogroupList.querySelectorAll(".groupItem").forEach(($groupItem) => {
		$groupItem.addEventListener("click", (event) => {
			$editTodofirstGroupName.innerHTML = event.target.innerHTML;
		});
	});
   */

	// 검은배경 클릭 시 닫기, 그룹선택하는 목록 초기화
	$editTodoFormWrap.addEventListener("click", (e) => {
		if (e.target.getAttribute("id") === "editTodoFormWrap") {
			e.target.style.display = "none";
			// $editTodoselectGroup.classList.remove("active");
		}
	});
	$editTodoForm.onsubmit = (event) => {
		event.preventDefault();
		let newContent = $editTodoInput.value;
		$currentValue.innerHTML = newContent;
		$editTodoFormWrap.style.display = "none";
		$buttonGroupWrap.classList.remove("active");
	};
	$removeBtn.onclick = () => {
		let result = confirm("정말로 삭제할까요?");
		result;
		if (result) {
			event.target.remove();
			$editTodoFormWrap.style.display = "none";
		} else {
		}
	};
	// $removeBtn.addEventListener("click", () => {
	// 	event.target.remove();
	// 	$editTodoFormWrap.style.display = "none";
	// });
}

$todolist.querySelectorAll(".listItem").forEach(($listItem) => {
	$listItem.onclick = (e) => {
		if (e.target.getAttribute("class") === "listItem") {
			editItem(e);
		}
	};
});
