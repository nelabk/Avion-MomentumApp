const time = document.getElementById('current-time')

setInterval(() => {
    let d = new Date()
    time.innerHTML = d.toLocaleTimeString("en-GB", {
        hour: '2-digit',
        minute: '2-digit'
    });
}, 1000)
