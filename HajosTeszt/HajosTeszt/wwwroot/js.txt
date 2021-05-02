var jelenlegikérdés = 1;
var jóválasz;

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(válaszfeldolgozás)
        .then(kérdésMegjelenítés);
}

function válaszfeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    jóválasz = kérdés.correctAnswer;
}

window.onload = function () {
    kérdésBetöltés(jelenlegikérdés);

    document.getElementById("vissza").onclick = function () {
        if (jelenlegikérdés != 1) {
            jelenlegikérdés--;
            kérdésBetöltés(jelenlegikérdés);
            document.getElementById("válasz1").classList.remove('jó', 'rossz');
            document.getElementById("válasz2").classList.remove('jó', 'rossz');
            document.getElementById("válasz3").classList.remove('jó', 'rossz');
        }
    }

    document.getElementById("előre").onclick = function () {
        if (jelenlegikérdés != 859) {
            jelenlegikérdés++;
            kérdésBetöltés(jelenlegikérdés);
            document.getElementById("válasz1").classList.remove('jó', 'rossz');
            document.getElementById("válasz2").classList.remove('jó', 'rossz');
            document.getElementById("válasz3").classList.remove('jó', 'rossz');
        }
    }

    document.getElementById("válasz1").onclick = function () {
        if (jóválasz == 1) {
            document.getElementById("válasz1").classList.add('jó');
            document.getElementById("válasz2").classList.add('rossz');
            document.getElementById("válasz3").classList.add('rossz');
        }
        else {
            document.getElementById("válasz1").classList.add('rossz');
        }
    }

    document.getElementById("válasz2").onclick = function () {
        if (jóválasz == 2) {
            document.getElementById("válasz1").classList.add('rossz');
            document.getElementById("válasz2").classList.add('jó');
            document.getElementById("válasz3").classList.add('rossz');
        }
        else {
            document.getElementById("válasz2").classList.add('rossz');
        }
    }

    document.getElementById("válasz3").onclick = function () {
        if (jóválasz == 3) {
            document.getElementById("válasz1").classList.add('rossz');
            document.getElementById("válasz2").classList.add('rossz');
            document.getElementById("válasz3").classList.add('jó');
        }
        else {
            document.getElementById("válasz3").classList.add('rossz');
        }
    }
}

