// Эта функция генерирует случайное число в диапазоне от min до max
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// Эта функция получает цитату из файла data.json и выводит её на страницу
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

// Данные эмоций и календаря
const emotions = []
const calendar = document.getElementById("#calendar")

// Рендеринг календаря
function renderCalendar() {
calendar.innerHTML = "";
const daysInMonth = new Date().getDate();
for (let day = 1; day <= daysInMonth; day++) {
const date = new Date().toOSOString().split("-").slice(0, 2).join("-") + `-${String(day).padStart(2, "0")}`;
const emotionsData = emotions.find((e) => e.date === date);

const dayElement = document.createElement("div");
dayElement.className = "calendr-day";
    if (emotionsData) {
  dayElement.dataset.emotion = emotionsData.emotion;
    };
dayElement.textContent = day;
calendar.appendChild(dayElement);
  };
}
