var kérdések;
var jelenlegikérdés = 0;
var jóválasz;

function letöltés(){
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));

    function letöltésBefejeződött(d){
        console.log('Sikeres letöltés');
        console.log(d);
        kérdések = d;
        kérdésMegjelenítes(0);
    }
}

function kérdésMegjelenítes(kérdés){
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kérdés].questionText;
    document.getElementById("válasz1").innerHTML = kérdések[kérdés].answer1;
    document.getElementById("válasz2").innerHTML = kérdések[kérdés].answer2;
    document.getElementById("válasz3").innerHTML = kérdések[kérdés].answer3;
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
    if(kérdések[kérdés].image == ""){
        document.getElementById("kép1").alt = "";
    } else{
        document.getElementById("kép1").alt = "Hajóvizsga kép";
    }
    jóválasz = kérdések[kérdés].correctAnswer;
}

window.onload = function() {
    letöltés();

    document.getElementById("vissza").onclick = function () {
        if(jelenlegikérdés == 0){
            jelenlegikérdés = kérdések.length-1;
        }
        else{
            jelenlegikérdés--;
        }
        kérdésMegjelenítes(jelenlegikérdés);
        document.getElementById("válasz1").classList.remove('jó', 'rossz');
        document.getElementById("válasz2").classList.remove('jó', 'rossz');
        document.getElementById("válasz3").classList.remove('jó', 'rossz');
    }

    document.getElementById("előre").onclick = function () {
        if(jelenlegikérdés == kérdések.length-1){
            jelenlegikérdés = 0;
        }
        else{
            jelenlegikérdés++;
        }
        kérdésMegjelenítes(jelenlegikérdés);
        document.getElementById("válasz1").classList.remove('jó', 'rossz');
        document.getElementById("válasz2").classList.remove('jó', 'rossz');
        document.getElementById("válasz3").classList.remove('jó', 'rossz');
    }

    document.getElementById("válasz1").onclick = function () {
        if(jóválasz == 1){
            document.getElementById("válasz1").classList.add('jó');
        }
        else{
            document.getElementById("válasz1").classList.add('rossz');
        }
    }

    document.getElementById("válasz2").onclick = function () {
        if(jóválasz == 2){
            document.getElementById("válasz2").classList.add('jó');
        }
        else{
            document.getElementById("válasz2").classList.add('rossz');
        }
    }

    document.getElementById("válasz3").onclick = function () {
        if(jóválasz == 3){
            document.getElementById("válasz3").classList.add('jó');
        }
        else{
            document.getElementById("válasz3").classList.add('rossz');
        }
    }
}

