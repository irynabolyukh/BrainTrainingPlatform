const resDiv = document.getElementById('result');
const formArray = [];
formArray.push(document.getElementById('tiger'));
formArray.push(document.getElementById('violet'));
formArray.push(document.getElementById('sun'));
formArray.push(document.getElementById('hello'));
formArray.push(document.getElementById('forest'));
formArray.push(document.getElementById('teapot'));
formArray.push(document.getElementById('magic'));
formArray.push(document.getElementById('holiday'));
formArray.push(document.getElementById('game'));
formArray.push(document.getElementById('success'));
formArray.push(document.getElementById('blossom'));
formArray.push(document.getElementById('orange'));
let score = 0;
$( "#form" ).hide();
$( "#result" ).hide();
$( "#start" ).hide();

function displayForm() {
    $( "#words" ).remove();
    $( "#form" ).show();
}

function checkForm() {
    let newScore = 10;
    formArray.forEach(element => ((element.value).toLowerCase() === element.name) ? score++ : score);
    if(score >= 5 && score <= 7){
        newScore = 1000;
    }
    if(score > 7){
        newScore = 10000;
    }
    // встановлюємо рівень користувача
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/update-score", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        score: newScore
    }));
    $( "#form" ).hide();
    let resP = document.createElement("p");
    let text = document.createTextNode("You have scored "+ score + " out of 12.");
    resP.appendChild(text);
    resDiv.appendChild(resP);
    $( "#result" ).show();
    $( "#start" ).show();
}