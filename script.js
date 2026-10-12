function openFeatures() {

  let allElms = document.querySelectorAll('.elm');

  let fullElms = document.querySelectorAll('.fullelm');

  let fullElmsBackBtn = document.querySelectorAll('.fullelm .back');


  allElms.forEach((elm) => {

    elm.addEventListener('click', () => {

      fullElms[elm.id].style.display = 'block'
    })
  });

  fullElmsBackBtn.forEach((btn) => {

    btn.addEventListener('click', () => {

      fullElms[btn.id].style.display = 'none'

    });

  });


};


openFeatures();


function todoList() {

  let form = document.querySelector('.addTask form');

  let taskInput = document.querySelector('.addTask form input');

  let taskDetails = document.querySelector('.addTask form textarea');

  let taskMark = document.querySelector('.addTask form #mark');

  let myTasks = [];


  if (localStorage.getItem('task')) {

    myTasks = JSON.parse(localStorage.getItem('task'));

  } else {

    console.log('No tasks have been added');
  }


  function renderTask() {

    let allTasks = document.querySelector('.allTask');

    let sum = '';

    myTasks.forEach((e, idx) => {

      sum = sum + `  <div class="task">

      <h5>${e.task} <span class = ${e.imp} >imp</span></h5>

            <button id=${idx}>Mark as completed</button>
          </div>`

    });


    allTasks.innerHTML = sum;

    localStorage.setItem('task', JSON.stringify(myTasks));

    let markCompletedBtn = document.querySelectorAll('.task button');

    markCompletedBtn.forEach((btn) => {

      btn.addEventListener('click', () => {

        myTasks.splice(btn.id, 1);

        renderTask();
      })
    })
  };

  renderTask();

  form.addEventListener('submit', (e) => {

    e.preventDefault();

    myTasks.push(
      {
        task: taskInput.value,
        details: taskDetails.value,
        imp: taskMark.checked
      }
    );

    renderTask();

    taskInput.value = '';

    taskDetails.value = '';

    taskMark.checked = false;
  });

};

todoList();

function dayPlanner() {

  let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};

  let dayPlanner = document.querySelector('.day-planner');


  let hours = Array.from({ length: 18 }, (e, idx) => `${6 + idx}:00 - ${7 + idx}:00`);


  let wholeDaySum = '';


  hours.forEach((e, idx) => {

    let savedData = dayPlanData[idx] || '';


    wholeDaySum = wholeDaySum + ` <div class="day-planner-time">

          <p>${e}</p>

          <input id=${idx} type="text" placeholder="..." value= '${savedData}'>

        </div>`
  })

  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll('.day-planner input');

  dayPlannerInput.forEach((e) => {

    e.addEventListener('input', () => {

      console.log('hello');

      dayPlanData[e.id] = e.value;

      localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
    })
  });

};

dayPlanner();

function motivationalQuote() {

  let motivationQuoteContent = document.querySelector('.motivation-2 h1');

  let motivationAuthor = document.querySelector('.motivation-3 h2');

  async function fetchQuote() {

    let abc = await fetch('https://dummyjson.com/quotes/random');

    let result = await abc.json();

    motivationQuoteContent.innerHTML = result.quote;

    motivationAuthor.innerHTML = result.author
  }

  fetchQuote();

}

motivationalQuote();


function pomodoroTimer() {

  let timer = document.querySelector('.pomo-timer h1');

  let start = document.querySelector('.pomo-timer .start-timer');

  let pause = document.querySelector('.pomo-timer .pause-timer');

  let reset = document.querySelector('.pomo-timer .reset-timer');

  let session = document.querySelector('.timer-fullpage .session')

  let timerInterval = null;

  let isWorkSession = true;

  let totalSecs = 25 * 60;

  function updateTimer() {

    let minutes = Math.floor(totalSecs / 60);

    console.log(minutes);

    let seconds = totalSecs % 60;

    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  }


  function startTimer() {

    clearInterval(timerInterval);

    if (isWorkSession) {

      timerInterval = setInterval(() => {

        if (totalSecs > 0) {

          totalSecs--

          updateTimer();

        } else {

          isWorkSession = false

          clearInterval(timerInterval);

          timer.innerHTML = '05:00'

          session.innerHTML = 'Break'

          session.style.backgroundColor = 'var(--blue)'

          totalSecs = 5 * 60;
        }

      }, 1000);

    } else {

      timerInterval = setInterval(() => {

        if (totalSecs > 0) {

          totalSecs--

          updateTimer();

        } else {

          isWorkSession = true

          clearInterval(timerInterval);

          timer.innerHTML = '25:00'

          session.innerHTML = 'Work Session';

          session.style.backgroundColor = 'var(--green)'

          totalSecs = 25 * 60;
        }

      }, 1000);
    }

  }

  function pauseTimer() {

    clearInterval(timerInterval);
  }

  function resetTimer() {

    totalSecs = 25 * 60;

    clearInterval(timerInterval);

    updateTimer();
  }


  start.addEventListener('click', startTimer);

  pause.addEventListener('click', pauseTimer);

  reset.addEventListener('click', resetTimer);
}


pomodoroTimer();


function myHeader() {

  let api_key = '107b4776f03a4f47a4112510252710';

  let data = null;

  let headerTime = document.querySelector('.header1 h1');

  let headerDate = document.querySelector('.header1 h2');

  let header2Temp = document.querySelector('.header2 h2');

  let header2Condition = document.querySelector('.header2 h4');

  let header2FeelsLike = document.querySelector('.header2 .feelsLike');

  let header2Humid = document.querySelector('.header2 .humid');

  let header2Wind = document.querySelector('.header2 .wind');

  let header2MaxTemp = document.querySelector('.header2 .maxTemp');


  let header2MinTemp = document.querySelector('.header2 .minTemp');


  console.log(headerDate.innerHTML);

  async function weatherApiCall(city) {

    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}`);

    let data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c} °C`;

    header2Condition.innerHTML = `${data.current.condition.text}`;

    header2FeelsLike.innerHTML = `Feels_Like: ${data.current.feelslike_c} °C`;

    header2Humid.innerHTML = `Humidity: ${data.current.humidity}`;

    header2Wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;

    header2MaxTemp.innerHTML = `Max Temp: ${data.forecast.forecastday[0].day.maxtemp_c
      } °C`;

    header2MinTemp.innerHTML = `Min Temp: ${data.forecast.forecastday[0].day.mintemp_c} °C`;
  }

  weatherApiCall('Burlington');


  function timeDate() {

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let date = new Date();

    let dayOfWeek = daysOfWeek[date.getDay()];

    let hours = date.getHours();

    let minutes = date.getMinutes();

    let seconds = date.getSeconds();

    let cuurentDate = date.getDate();

    let month = date.toLocaleDateString('en-CA', {

      month: 'long'
    });

    let year = date.getFullYear();

    headerDate.innerHTML = `${cuurentDate}/${month}, ${year}`;


    if (hours > 12) {

      headerTime.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0') - 12}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`;

    } else {

      headerTime.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`;
    }

  }

  setInterval(() => {
    timeDate();
  }, 1000)
}

myHeader();

function changeTheme() {

  let rootElement = document.documentElement;

  let theme = document.querySelector('.theme');

  let flag = 0;

  theme.addEventListener('click', () => {

    if (flag == 0) {

      rootElement.style.setProperty('--pri', '#F8F4E1');

      rootElement.style.setProperty('--sec', '#222831');

      rootElement.style.setProperty('--tri', '#948979');

      rootElement.style.setProperty('--tri2', '#393E46');

      flag = 1;

    } else if (flag == 1) {

      rootElement.style.setProperty('--pri', '#F1EFEC');

      rootElement.style.setProperty('--sec', '#030303');

      rootElement.style.setProperty('--tri', '#D4C9BE');

      rootElement.style.setProperty('--tri2', '#123458');

      flag = 2;

    } else if (flag == 2) {

      rootElement.style.setProperty('--pri', '#F8F4E1');

      rootElement.style.setProperty('--sec', '#381c0a');

      rootElement.style.setProperty('--tri', '#FEBA17');

      rootElement.style.setProperty('--tri2', '#74512D');

      flag = 0;
    }
  })
}

changeTheme();