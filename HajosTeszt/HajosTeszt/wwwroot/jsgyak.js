function faktorialis(n){
    let er = 1;
    for(var i=2; i<=n; i++){
        er = er * i;
    }
    return er;
}

function pascal(n, k){
    return faktorialis(n)/(faktorialis(k)*faktorialis(n-k));
}

window.onload = () => {
    console.log("betöltődött")
    for (var sor = 0; sor < 10; sor++) {
        var div = document.createElement('div');
        div.className = 'sor';
        document.getElementById('pascal').appendChild(div);

        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var div2 = document.createElement('div');
            div.appendChild(div2);
            div2.className = 'elem';
            div2.innerHTML = `${pascal(sor, oszlop)}`;
            div2.style.backgroundColor = `rgb(${255-pascal(sor, oszlop)}, ${255-pascal(sor, oszlop)}, ${255-pascal(sor, oszlop)})`;
        }
    }
}
