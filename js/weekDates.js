// 달력 연도
let calendarYear = date.getFullYear();
// 달력 월
let calendarMonth = date.getMonth() + 1;
// 달력 일
let calendarToday = date.getDate();

let monthLastDate = new Date(calendarYear, calendarMonth, 0);
// 달력 월의 마지막 일
let calendarMonthLastDate = monthLastDate.getDate();

// 달력 이전 월의 마지막 일
let prevMonthLastDate = new Date(calendarYear, calendarMonth - 1, 0);

// 달력 현재 요일
let calendarMonthTodayDay = date.getDay();

// 주간 배열
let arWeek = [0, 0, 0, 0, 0, 0, 0];

// 현재 요일부터 주간 배열에 날짜를 추가
let weekDay = calendarToday;
for (let index = calendarMonthTodayDay; index < 7; index++) {
	arWeek[index] = weekDay++;
	// 날짜가 현재 월의 마지막 일보다 크면 다음 월의 1일로 변경
	if (weekDay > calendarMonthLastDate) {
		weekDay = 1;
	}
}

// 현재 요일부터 꺼꾸로 주간 배열에 날짜를 추가
weekDay = calendarToday;
for (let index = calendarMonthTodayDay - 1; index >= 0; index--) {
	weekDay--;
	// 날짜가 현재 월의 1일이면 작으면 이전 월의 마지막 일로 변경
	if (weekDay == 0) {
		weekDay = prevMonthLastDate.getDate();
	}
	arWeek[index] = weekDay;
}

let weekDays = "";

for (let i = 0; i < arWeek.length; i++) {
	weekDays += `
    <p class='weekDaysDate'>${arWeek[i]}</p>
  `;
}

document.querySelector(".weekDays").innerHTML = weekDays;

const today = new Date();
for (let date of document.querySelectorAll(".this")) {
	if (+date.innerText === today.getDate()) {
		date.classList.add("today");
		break;
	}
}

const weekDaysDate = document.querySelectorAll(".weekDaysDate");
for (let value of weekDaysDate) {
	if (Number(value.innerText) === today.getDate()) {
		value.classList.add("today");
		break;
	}
}

const $dates = document.querySelector(".dates");
const $weekDays = document.querySelector(".weekDays");
const $headerNav = document.querySelector(".header .nav");

$dates.addEventListener("click", (e) => {
	goToday();
	$weekDays.classList.add("active");
	$dates.classList.remove("active");
	$headerNav.classList.remove("active");
});
$weekDays.addEventListener("click", (e) => {
	$dates.classList.add("active");
	$weekDays.classList.remove("active");
	$headerNav.classList.add("active");
});
