// VARIABLES

const section = document.getElementById("heading");
const time = document.getElementById("time");
const date = document.getElementById("date");
const greeting = document.querySelector(".greeting");
const greetingText = document.getElementById("greeting_text");
const moreBtn = document.getElementById("btn");
const details = document.querySelector(".details");
const head = document.querySelector(".head");
const day = document.getElementById("day");
const monthDate = document.getElementById("month_date");
const dayCount = document.getElementById("day_count");
const weekCount = document.getElementById("week_count");
const settings = document.querySelector(".settings");
const icon = document.querySelector(".icon");
const saveBtn = document.getElementById("save_btn");
const hour = document.getElementsByName("hour");
const seconds = document.getElementsByName("seconds");
const settingsDate = document.getElementsByName("date");
const color = document.getElementsByName("color");

// setting the default value in localStorage
let localStorageData = ["24Hour", "show", "hide", "white"];
if (localStorage.getItem("settings") == null) {
  localStorage.setItem("settings", JSON.stringify(localStorageData));
}
// Getting data from api

function getData() {
  fetch(
    "https://api.nasa.gov/planetary/apod?api_key=cqcqIdlUedeNCESy07IHTtrabB1OdSUzSY4VuOfU"
  )
    .then((data) => {
      return data.json();
    })
    .then((actualData) => {
      console.log(actualData);
      // section.style.backgroundImage = `url(${actualData.hdurl})`;
    });
}
getData();

// setting the greeting
function setGreeting() {
  let hrs = new Date().getHours();
  if (hrs < 12) {
    greetingText.innerText = "GOOD MORNING";
  } else if (hrs >= 12 && hrs <= 17) {
    greetingText.innerText = "GOOD AFTERNOON";
  } else if (hrs >= 17 && hrs <= 24) {
    greetingText.innerText = "GOOD EVENING";
  }
}
setGreeting();

// setting the day of the year
const dayOfTheYear = () => {
  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  dayCount.innerText = day;
};
dayOfTheYear();
// setting the week of the year
const weekOfTheYear = () => {
  const todaydate = new Date();
  let oneJan = new Date(todaydate.getFullYear(), 0, 1);
  let numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));

  // adding 1 since to current date and returns value starting from 0
  let weekNumber = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7);
  weekCount.innerText = weekNumber;
};
weekOfTheYear();

// setting the time for the inital clock

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const arr = JSON.parse(localStorage.getItem("settings"));
const timeVal = arr[0];
const secondsVal = arr[1];
const dateVal = arr[2];
const ColorVal = arr[3];

function markChecked(radios, val) {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].value == val) {
      radios[i].checked = true; // marking the required radio as checked
    }
  }
}
markChecked(hour, timeVal);
markChecked(seconds, secondsVal);
markChecked(settingsDate, dateVal);
markChecked(color, ColorVal);

let intervalId;
let intervalId3;
const setTime = () => {
  clearInterval(intervalId);
  console.log("Local Storage 12 Hour");
  if (timeVal === "12Hour") {
    intervalId3 = setInterval(() => {
      if (secondsVal === "show") {
        time.innerText = new Date().toLocaleTimeString();
      } else {
        time.innerText = new Date().toLocaleTimeString([], {
          timeStyle: "short",
        });
      }
    }, 1000);
  } else {
    clearInterval(intervalId3);
    console.log("Local Storage 24 Hour");

    intervalId = setInterval(() => {
      const d = new Date();
      let hour = addZero(d.getHours());
      let min = addZero(d.getMinutes());
      let sec = addZero(d.getSeconds());
      if (secondsVal === "show") {
        time.innerText = hour + ":" + min + ":" + sec;
      } else {
        time.innerText = hour + ":" + min;
      }
    }, 1000);
  }
};
setTime();

// setting the inital Color
function setInitalColor(colorValue) {
  if (colorValue === "yellow") {
    time.style.color = "#feda15";
    greeting.style.color = "#feda15";
    date.style.color = "#feda15";
  } else if (colorValue === "blue") {
    time.style.color = "#00bec5";
    greeting.style.color = "#00bec5";
    date.style.color = "#00bec5";
  } else {
    time.style.color = "#fff";
    greeting.style.color = "#fff";
    date.style.color = "#fff";
  }
}
setInitalColor(ColorVal);

// setting the initial date to be shown or not
function setInitalDate(dateValue) {
  if (dateValue === "show") {
    const d = new Date();
    const month = d.toLocaleString("default", { month: "long" });
    const year = d.getFullYear();
    const day = d.getDate();
    date.innerText = month + " " + day + ", " + year;
  } else {
    date.innerText = "";
  }
}
setInitalDate(dateVal);

// adding event listener to the more button to show the other details about the date

moreBtn.addEventListener("click", function () {
  if (!details.classList.contains("overlay")) {
    details.classList.add("overlay");
    head.classList.add("overlay_hidden");
    moreBtn.innerText = "Less";
  } else {
    details.classList.remove("overlay");
    head.classList.remove("overlay_hidden");
    moreBtn.innerText = "More";
  }
});

// setting the day of the week

const setExtraDetails = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day.innerText = days[new Date().getDay()];
};
setExtraDetails();

// adding event listener to the cog ICON

icon.addEventListener("click", function () {
  settings.classList.toggle("setting_overlay");
  icon.classList.toggle("shift_icon");
});

monthDate.innerText = new Date().getDate();

// To show Seconds or Not
const isShowingSeconds = () => {
  for (let i = 0; i < seconds.length; i++) {
    if (seconds[i].checked) {
      return seconds[i].value;
    }
  }
};

// setting the Time Format of Clock

let intervalId1;
let intervalId2;
let arrValue = JSON.parse(localStorage.getItem("settings"));
const setTimeFormat = (timeFormat, isShowingSeconds) => {
  const timeValue = timeFormat();
  const secondsValue = isShowingSeconds();
  arrValue[0] = timeValue;
  arrValue[1] = secondsValue;

  if (timeValue === "12Hour") {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    clearInterval(intervalId1);
    clearInterval(intervalId3);
    intervalId1 = setInterval(() => {
      if (secondsValue === "show") {
        time.innerText = new Date().toLocaleTimeString();
      } else {
        time.innerText = new Date().toLocaleTimeString([], {
          timeStyle: "short",
        });
      }
    }, 1000);
  } else {
    clearInterval(intervalId1);
    clearInterval(intervalId);
    clearInterval(intervalId2);
    clearInterval(intervalId3);
    intervalId2 = setInterval(() => {
      const d = new Date();
      let hour = addZero(d.getHours());
      let min = addZero(d.getMinutes());
      let sec = addZero(d.getSeconds());
      if (secondsValue === "show") {
        time.innerText = hour + ":" + min + ":" + sec;
      } else {
        time.innerText = hour + ":" + min;
      }
    }, 1000);
  }
};

const timeFormat = () => {
  for (let i = 0; i < hour.length; i++) {
    if (hour[i].checked) {
      return hour[i].value;
    }
  }
};

// setting the Date to show on the home screen or not

const setDate = (showDate) => {
  const dateValue = showDate();
  arrValue[2] = dateValue;
  if (dateValue === "show") {
    const d = new Date();
    const month = d.toLocaleString("default", { month: "long" });
    const year = d.getFullYear();
    const day = d.getDate();
    date.innerText = month + " " + day + ", " + year;
  } else {
    date.innerText = "";
  }
};

// This function is returning the checked radio box value

const showDate = () => {
  for (let i = 0; i < settingsDate.length; i++) {
    if (settingsDate[i].checked) {
      return settingsDate[i].value;
    }
  }
};

// setting the Color
const colorName = () => {
  for (let i = 0; i < color.length; i++) {
    if (color[i].checked) {
      return color[i].value;
    }
  }
};

const setColor = (colorName) => {
  const colorValue = colorName();
  arrValue[3] = colorValue;
  if (colorValue === "yellow") {
    time.style.color = "#feda15";
    greeting.style.color = "#feda15";
    date.style.color = "#feda15";
  } else if (colorValue === "blue") {
    time.style.color = "#00bec5";
    greeting.style.color = "#00bec5";
    date.style.color = "#00bec5";
  } else {
    time.style.color = "#fff";
    greeting.style.color = "#fff";
    date.style.color = "#fff";
  }
};

// adding event listener to the Save button in the setting sidebar

saveBtn.addEventListener("click", function () {
  settings.classList.toggle("setting_overlay");

  setDate(showDate);
  setTimeFormat(timeFormat, isShowingSeconds);
  setColor(colorName);
  localStorage.setItem("settings", JSON.stringify(arrValue));
});
