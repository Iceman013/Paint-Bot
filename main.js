var intervalId = window.setInterval(function() {
    tick();
}, TICK);

function stop() {
    clearInterval(intervalId);
}

/* Tick function
 * All timing functions here
 */
function tick() {
    console.log("Tick");
    var a = 0;
    while (a < vats.length) {
        vats[a].tick();
        a = a + 1;
    }
    table.update();
    store.update();
    showStats()
}

function showStats() {
    var elem = document.getElementById("moneyBox");
    elem.innerHTML = Math.floor(money);
}