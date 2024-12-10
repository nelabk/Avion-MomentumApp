const time = document.getElementById('current-time')
const date = document.getElementById('current-date')
const greetingFormEl = document.getElementById('greeting-form')
const greetingEl = document.getElementById('greeting')
const nameInputEl = document.getElementById('name')
const goalInputEl = document.getElementById('goal-input')
const goalFormEl = document.getElementById('goal')
const goalEl = document.getElementById('goal-title')
const quoteEl = document.getElementById('quote')

const appState = {
    username: "",
    goal: "",
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
    return response.json ()
}) .then (function (data) {
    showElement(quoteEl, `"${data[0].content}"`)
}) 



