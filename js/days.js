// 최근 한달 구하기
const days = [];
const weekday = ["일", "월", "화", "수", "목", "금", "토"];
const day = [];

for (let i = 0; i < 31; i++) {
	let now = new Date();
	days[i] = new Date(now.setDate(now.getDate() - i)).getDate();
	day[i] = weekday[now.getDay()];
}
let daysLength = days.length;
let text = "";
for (let i = 0; i < daysLength; i++) {
	if (i === 0) {
		text += `
    <div class="swiper-slide" >
      <a href="#" class="checked">
        <p>${day[i]}</p>
        <p>${days[i]}</p>
      </a>
    </div>
    `;
	} else {
		text += `
  <div class="swiper-slide">
    <a href="#">
      <p>${day[i]}</p>
      <p>${days[i]}</p>
    </a>
  </div>
  `;
	}
}
document.getElementById("days").innerHTML = text;
