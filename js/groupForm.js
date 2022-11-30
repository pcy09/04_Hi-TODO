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
      <div class="commentContainer">
      <div class="commentWrapper">
        <div class="commentTopWrap">
          <p>댓글 0</p>
          <button class="close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="commentWrap">
          <ul class="commentList">
          </ul>
        </div>
        <div class="commentBottomWrap">
          <form action="" name="addCommentForm" class="addCommentForm">
            <img src="img/thumb1.png" alt="" />
            <input placeholder="댓글 추가..." type="text" />
          </form>
        </div>
      </div>
    </div>
    </ul>
    `;

		$todolist.insertBefore($newItem, $createGroup);
		$appender.value = "";
		$addGroupFormWrap.style.display = "none";
		$buttonGroupWrap.classList.remove("active");

		$newItem.querySelector(".group").addEventListener("click", (e) => {
			e.target.parentNode.classList.toggle("active");
		});

		// comment버튼 누르면 댓글창 불러오기
		$newItem.querySelector(".comment").addEventListener("click", (e) => {
			let $commentAppender = $newItem.querySelector("input");
			e.target.nextElementSibling.classList.toggle("active");
			$commentAppender.focus();
		});

		// 검은화면 누르면 댓글창 닫기
		$newItem
			.querySelector(".commentContainer")
			.addEventListener("click", (e) => {
				if (e.target.classList.contains("commentContainer")) {
					e.target.classList.toggle("active");
					e.target.querySelector("input").value = "";
				} else if (e.target.classList.contains("close")) {
					e.target.parentNode.parentNode.parentNode.classList.toggle("active");
					e.target.parentNode.parentNode.parentNode.querySelector(
						"input",
					).value = "";
				}
			});

		// 댓글추가 폼 전송하면 addComment함수 실행
		$newItem.querySelector(".addCommentForm").onsubmit = function addComment(
			event,
		) {
			event.preventDefault();
			let $newComment = document.createElement("li");
			let $commentAppender = $newItem.querySelector("input");
			let $commentList =
				event.target.parentNode.parentNode.querySelector(".commentList");
			let $commentTopWrap =
				event.target.parentNode.parentNode.querySelector(".commentTopWrap");
			let $commentBtn =
				event.target.parentNode.parentNode.parentNode.parentNode.querySelector(
					".comment",
				);

			$newComment.className = "comment";
			$newComment.innerHTML = `
  <img src="img/thumb1.png" alt="" />
  <p class="userId">pcy09</p>
  <p>
    <span></span>
    ${$commentAppender.value}
  </p>
  `;
			$commentList.appendChild($newComment);
			$commentAppender.value = "";
			let $commentCount = $commentList.getElementsByClassName("comment").length;
			$commentTopWrap.querySelector("p").innerHTML = `댓글 ${$commentCount}`;
			$commentBtn.innerHTML = `댓글 ${$commentCount}개 모두 보기`;
		};
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
