function calcTime() {
    var now = new Date();
    var nextYear = new Date("Apr 20, 2018 17:15:00").getTime();
    var diffMs = nextYear - now;
    var days = Math.floor(diffMs / 1000 / 60 / (60 * 24));
    var diff = new Date(diffMs);
    var dw = days == 1 ? " jour " : " jours ";
    var hw = diff.getHours() == 1 ? " heure " : " heures ";

    return days + dw +
        diff.getHours() + hw +
        diff.getMinutes() + " min ";
}

function setTime() {
    document.getElementById("demo")
        .innerText = calcTime();
}

setInterval(setTime, 1000);