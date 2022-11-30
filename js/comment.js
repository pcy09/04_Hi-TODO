// comment버튼 누르면 댓글창 불러오기
$todolist.querySelectorAll(".comment").forEach(($comment) => {
	$comment.onclick = (e) => {
		e.target.nextElementSibling.classList.toggle("active");
		e.target.nextElementSibling.querySelector("input").focus();
	};
});

// 검은화면 누르면 댓글창 닫기
$todolist.querySelectorAll(".commentContainer").forEach(($commentContainer) => {
	$commentContainer.onclick = (e) => {
		if (e.target.classList.contains("commentContainer")) {
			e.target.classList.toggle("active");
			e.target.querySelector("input").value = "";
		} else if (e.target.classList.contains("close")) {
			e.target.parentNode.parentNode.parentNode.classList.toggle("active");
			e.target.parentNode.parentNode.parentNode.querySelector("input").value =
				"";
		}
	};
});

// 댓글추가 폼 전송하면 addComment함수 실행
$todolist.querySelectorAll(".addCommentForm").forEach(($addCommentForm) => {
	$addCommentForm.onsubmit = function addComment(event) {
		event.preventDefault();
		let $newComment = document.createElement("li");
		let $commentAppender = $addCommentForm.querySelector("input");
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
});
