var jelenlegikérdés = 1;
var jóválasz;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function előre() {
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

function válaszfeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    jóválasz = kérdés.correctAnswer;
}

window.onload = function () {
    //kérdésBetöltés(jelenlegikérdés);
    init();

    document.getElementById("vissza").onclick = function () {
        if (jelenlegikérdés != 1) {
            jelenlegikérdés--;
            //kérdésBetöltés(jelenlegikérdés);
            document.getElementById("válasz1").classList.remove('jó', 'rossz');
            document.getElementById("válasz2").classList.remove('jó', 'rossz');
            document.getElementById("válasz3").classList.remove('jó', 'rossz');
        }
    }

    document.getElementById("előre").onclick = function () {
        if (jelenlegikérdés != 859) {
            jelenlegikérdés++;
            //kérdésBetöltés(jelenlegikérdés);
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

