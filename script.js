const time = document.getElementById('current-time')
const date = document.getElementById('current-date')
const greetingFormEl = document.getElementById('greeting-form')
const greetingEl = document.getElementById('greeting')
const nameInputEl = document.getElementById('name')
const goalInputEl = document.getElementById('goal-input')
const goalFormEl = document.getElementById('goal')
const goalEl = document.getElementById('goal-title')
const quoteEl = document.getElementById('quote')
const taskFormEl = document.querySelector('.tasks')
const taskInputEl = document.getElementById('task-input')
const taskListEl =document.getElementById('task-list')
const myBtnEl = document.getElementById('myBtn')
const addQuoteBtnEl = document.getElementById('addQuote-btn')
const formQuoteEl = document.querySelector('.form-quote')
const quoteInputEl = document.getElementById('quoteInput')
const submitQuoteEl = document.getElementById('submit-btn-quote')


const appState = {
    username: "",
    goal: "",
    tasks: []
}

const AM_greeting_text = 'Good morning, '
const goal_for_today = "Today's goal: "

// time and date

setInterval(() => {
    let d = new Date()
    date.innerHTML = d.toDateString()
    time.innerHTML = d.toLocaleTimeString("en-GB", {
        hour: '2-digit',
        minute: '2-digit'
    });
}, 1000)

function showElement(element, content) {
    // greetingEl.classList.add("fade-in");
    element.innerHTML = content;
}

function renderElement(element, tasks) {
    element.innerHTML = "";
    tasks.forEach((task) => {
        const newTaskEl = document.createElement('li');

        const checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.checked = task.completed;

        checkboxEl.addEventListener('change', () => {
            task.completed = checkboxEl.checked;
            newTaskEl.classList.toggle('disabled', task.completed);
        });

        const taskTextEl = document.createElement('span');
        taskTextEl.textContent = task.text;

        if (task.completed) {
            newTaskEl.classList.add('disabled');
        }

        newTaskEl.appendChild(checkboxEl);
        newTaskEl.appendChild(taskTextEl);
        element.appendChild(newTaskEl);
    });
}


// greeting

greetingFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = nameInputEl.value.trim();
    if (inputValue) {
        appState.username = inputValue;
        showElement(greetingEl, `${AM_greeting_text} ${appState.username}`);
        nameInputEl.value = "";
        nameInputEl.style.display = 'none';
    }
    
})

// resizing the input for name and goal

function resizeInput() {
    this.style.width = this.value ? `${this.scrollWidth}px` : "";
}

nameInputEl.addEventListener('input', resizeInput)
resizeInput.call(nameInputEl)

goalInputEl.addEventListener('input', resizeInput)
resizeInput.call(goalInputEl)

// what is your main goal?

goalFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const goalInputValue = goalInputEl.value.trim();
    if (goalInputEl) {
        appState.goal = goalInputValue;
        showElement(goalEl, `${goal_for_today} <br> ${appState.goal}`);
        goalInputEl.value = "";
        goalInputEl.style.display = 'none';
    }
})

// quotes

fetch("http://api.quotable.io/quotes/random").then(function (response) {
    return response.json();
    }) .then(function (data) {
    showElement(quoteEl, `"${data[0].content}"`)
})

// my own quote modal

addQuoteBtnEl.addEventListener('click', () => {
    formQuoteEl.classList.toggle('tasks-show');
})

submitQuoteEl.addEventListener('click', (e) => {
    e.preventDefault();
    const customQuote = quoteInputEl.value.trim(); 

    if (customQuote) {
        showElement(quoteEl, `"${customQuote}"`); 
        quoteInputEl.value = ""; 
        formQuoteEl.classList.remove('tasks-show'); 
    }
});

quoteInputEl.addEventListener('input', resizeInput)
resizeInput.call(quoteInputEl)


// tasks

taskFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInputValue = taskInputEl.value.trim();

    if (taskInputValue) {
        appState.tasks.push({text: taskInputValue, completed: false}); //the task is not yest finished; if finished === true
        renderElement(taskListEl, appState.tasks);
        taskInputEl.value = "";
    }
})

taskInputEl.addEventListener('input', resizeInput)
resizeInput.call(taskInputEl)

// task modal
myBtnEl.addEventListener('click', () => {
    taskFormEl.classList.toggle('tasks-show');
})





