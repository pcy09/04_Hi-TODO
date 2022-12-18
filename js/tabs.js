/*
  tab-content 안의 div들 모두 안보이도록 한다.
  링크를 클릭하면 클릭한 그 요소의 href속성의 값을 변수 tabTarget에 저장.
  저장된 값에서 #을 삭제
  tabTarget = tabs-1

  document.getElementById(tabTarget).style.display ='block'
*/
let targetLink = document.querySelectorAll(".tabMenu a");
let tabContent = document.querySelectorAll("#tabContent > div");
for (let i = 0; i < targetLink.length; i++) {
	targetLink[i].addEventListener("click", (e) => {
		e.preventDefault();
		let orgTarget = e.target.getAttribute("href");
		let tabTarget = orgTarget.replace("#", "");
		for (let i = 0; i < tabContent.length; i++) {
			tabContent[i].style.display = "none";
		}
		document.getElementById(tabTarget).style.display = "block";
		for (let i = 0; i < targetLink.length; i++) {
			targetLink[i].classList.remove("active");
			e.target.classList.add("active");
		}
	});
}
