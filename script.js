/////////// login with localstorage ////////////
const loginForm = document.getElementById("login-form");
const login = document.getElementById("login");
const loginInput = document.getElementById("login");
const loginName = document.getElementById("login-name");

function saveName(event) {
  event.preventDefault();
  const myName = loginInput.value;
  localStorage.setItem("username", myName);
  showName();
  console.log(myName);
}

function showName() {
  const username = localStorage.getItem("username");
  loginForm.classList.add("hidden");
  loginName.classList.remove("hidden-name");
  loginName.innerText = `Hello, ${username}`;
}

loginForm.addEventListener("submit", saveName);

const savedUsername = localStorage.getItem("username");

if (savedUsername !== null) {
  showName();
}

function removeName() {
  loginName.classList.add("hidden-name");
  loginForm.classList.remove("hidden");
  localStorage.removeItem("username");
  loginInput.value = "";
}

loginName.addEventListener("click", removeName);

/////////// random background ////////////

const images = [
  "https://images.unsplash.com/photo-1545431781-3e1b506e9a37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1614853035986-b230d7d5679c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1615716038858-2f9a60c330a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1615716175352-9a5a5e67c21b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
];

const givenImages = images[Math.floor(Math.random() * images.length)];

// const imgElement = document.getElementById("img");
const background = document.getElementById("background");

background.style.backgroundImage = `url('${givenImages}')`;

// imgElement.src = `images/${givenImages}`;

///////////// clock ///////////////

const clock = document.getElementById("clock");
const dayToday = document.getElementById("day");

setInterval(function () {
  const today = new Date();
  const getYear = today.getFullYear();
  const getMonth = today.getMonth() + 1;
  const getDate = today.getDate();
  const getDay = today.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saterday",
  ];

  let day = days[getDay];
  const getHour = today.getHours();
  const getMin = String(today.getMinutes()).padStart(2, "0");
  const getSec = String(today.getSeconds()).padStart(2, "0");
  dayToday.innerText = `${day}`;
  clock.innerText = `${getHour}:${getMin}:${getSec}`;
}, 1000);

//////////////// weather and location /////////

const weather = document.getElementById("weather");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const apiKey = "6394ef75e9a5a1af0599ccb87a131440";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `
https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;

      weather.innerText = `${data.weather[0].main}`;
      temp.innerText = `${data.main.temp}°C`;
    });
}

function onGeoError() {
  alert("No location");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//////// to do list with local storage ////////////////

const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "✧";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
