let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  renderCalendar(currentMonth, currentYear);

  // Навигация по мес
  document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });
});

// Функция получения цитаты из datыыыы
function getquote() {
  fetch("data.json")
    .then((response) => response.json())
    .then((json) => {
      const random = getRandomInt(0, json["quotes"].length);
      const quote = json["quotes"][random];
      document.getElementById(
        "quote"
      ).innerHTML = `${quote["quote"]} - ${quote["author"]}`;
    });
}

// Генерация случайного числа ТЯЖКО
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Рендеринг календаря ВОТ ЭТО ПОСМОТРЕТЬ, МОГУТ БЫТЬ БАГИ
function renderCalendar(month, year) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Заголовок месяца и года (НОРМАЛЬНО)
  const title = document.createElement("h3");
  title.textContent = `${monthNames[month]} ${year}`;
  calendar.appendChild(title);

  // Сетка календаря
  const daysContainer = document.createElement("div");
  daysContainer.style.display = "grid";
  daysContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
  daysContainer.style.gap = "5px";

  // Заголовки дней недели
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const el = document.createElement("div");
    el.textContent = day;
    el.style.fontWeight = "bold";
    daysContainer.appendChild(el);
  });

  // Пустые ячейки перед первым днём месяца (ПОСМОТРЕТЬ ЕЩЕ)
  for (let i = 0; i < firstDay; i++) {
    daysContainer.appendChild(document.createElement("div"));
  }

  // Дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElem = document.createElement("div");
    dayElem.textContent = day;
    dayElem.style.border = "1px solid #ccc";
    dayElem.style.padding = "10px";
    dayElem.style.textAlign = "center";
    dayElem.style.borderRadius = "5px";

    // Подсветка сегодняшнего дня
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayElem.style.backgroundColor = "#FFDAB9";
      dayElem.style.fontWeight = "bold";
    }

    daysContainer.appendChild(dayElem);
  }

  calendar.appendChild(daysContainer);
}




