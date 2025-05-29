let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;
let selectedEmotion = null;
let currentUser = null;

// Функция логина/регистрации
function showLogin() {
  const login = prompt("Enter login:");
  const password = prompt("Enter password:");
  if (!login || !password) {
    alert("Login and password cannot be empty.");
    return;
  }

  
// Проверка наличия пользователя в localStorage
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[login]) {
    if (users[login].password !== password) {
      alert("Incorrect password.");
      return;
    }
  } else {
    users[login] = { password: password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered.");
  }

  currentUser = login;
  document.addEventListener("DOMContentLoaded", mainApp); // Запускаем основное приложение
}

showLogin();

// Основная функция приложения
function mainApp() {
  renderCalendar(currentMonth, currentYear);

  // Переключение месяца назад
  document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  // Переключение месяца вперёд
  document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  // Сохранение заметки
  document.getElementById("savenote").addEventListener("click", () => {
    const note = document.getElementById("note").value;
    if (!selectedDate) {
      alert("Please select a date in the calendar.");
      return;
    }
    if (!selectedEmotion) {
      alert("Please select an emotion.");
      return;
    }
    if (!note.trim()) {
      alert("Please enter a note.");
      return;
    }


// Проверка наличия пользователя
    const allData = JSON.parse(localStorage.getItem("emotionData") || "{}");
    if (!allData[currentUser]) allData[currentUser] = {};
    if (!allData[currentUser][selectedDate]) allData[currentUser][selectedDate] = [];

    allData[currentUser][selectedDate].push({
      emotion: selectedEmotion,
      note: note.trim(),
    });


// Сохранение данных в localStorage
    localStorage.setItem("emotionData", JSON.stringify(allData));
    alert("Note saved!");
    document.getElementById("note").value = "";
    displayNotesForDate(selectedDate);
  });

  // Обработка выбора эмоции
  const emotionButtons = document.querySelectorAll(".emotions button");
  emotionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedEmotion = btn.textContent;
      emotionButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
}

// Получение цитаты из файла data.json
function getquote() {
  fetch("data.json")
    .then((response) => response.json())
    .then((json) => {
      const random = getRandomInt(0, json["quotes"].length);
      const quote = json["quotes"][random];
      document.getElementById("quote").innerHTML = `${quote["quote"]} - ${quote["author"]}`;
    });
}

// Получение случайного числа
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Отображение заметок для выбранной даты
function displayNotesForDate(dateStr) {
  let block = document.getElementById("dayNotes");
  if (!block) {
    block = document.createElement("div");
    block.id = "dayNotes";
    block.style.marginTop = "20px";
    document.getElementById("calendar").appendChild(block);
  }

  block.innerHTML = `<h4>Notes for ${dateStr}:</h4>`;
// Проверка наличия заметок для выбранной даты
  const allData = JSON.parse(localStorage.getItem("emotionData") || "{}");
  const data = allData[currentUser] || {};
  if (!data[dateStr] || data[dateStr].length === 0) {
    block.innerHTML += "<p>No notes.</p>";
    return;
  }
// Создание списка заметок
  const ul = document.createElement("ul");
  data[dateStr].forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.emotion}: ${entry.note}`;
    ul.appendChild(li);
  });

  block.appendChild(ul);
}

// Отрисовка календаря (get from internet ^_^)
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

  const title = document.createElement("h3");
  title.textContent = `${monthNames[month]} ${year}`;
  calendar.appendChild(title);

  const daysContainer = document.createElement("div");
  daysContainer.style.display = "grid";
  daysContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
  daysContainer.style.gap = "5px";

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const el = document.createElement("div");
    el.textContent = day;
    el.style.fontWeight = "bold";
    daysContainer.appendChild(el);
  });

// Заполнение пустых ячеек до первого дня месяца
  for (let i = 0; i < firstDay; i++) {
    daysContainer.appendChild(document.createElement("div"));
  }

// Заполнение дней месяца
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElem = document.createElement("div");
    dayElem.textContent = day;
    dayElem.style.border = "1px solid #ccc";
    dayElem.style.padding = "10px";
    dayElem.style.textAlign = "center";
    dayElem.style.borderRadius = "5px";
    dayElem.style.cursor = "pointer";

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

// Проверка, является ли день сегодняшним
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayElem.style.backgroundColor = "#d9cee2"; // выделение сегодняшнего дня
      dayElem.style.fontWeight = "bold";
    }
// Добавление обработчика клика для выбора дня
    dayElem.addEventListener("click", () => {
      selectedDate = dateStr;
      const allDays = daysContainer.querySelectorAll("div");
      allDays.forEach((d) => d.style.outline = "none");
      dayElem.style.outline = "3px solid purple"; // выделение выбранного дня
      displayNotesForDate(selectedDate);
    });

    daysContainer.appendChild(dayElem);
  }

  calendar.appendChild(daysContainer);
}
