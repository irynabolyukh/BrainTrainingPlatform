const formDiv = document.getElementById('form');
const resDiv = document.getElementById('result');
const wordsDiv = document.getElementById('words');
const startDiv = document.getElementById('start');
const formArray = [];
formArray.push(document.getElementById('tiger'));
formArray.push(document.getElementById('violet'));
formArray.push(document.getElementById('sun'));
formArray.push(document.getElementById('hello'));
formArray.push(document.getElementById('forest'));
let score = 0;
formDiv.style.visibility = "hidden";
resDiv.style.visibility = "hidden";
startDiv.style.visibility = "hidden";

function displayForm() {
    // wordsDiv.style.visibility = "hidden";
    wordsDiv.remove();
    formDiv.style.visibility = "visible";
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
    // formDiv.style.visibility = "hidden";
    formDiv.remove();
    let resP = document.createElement("p");
    let text = document.createTextNode("You have scored "+ score + " out of 12.");
    resP.appendChild(text);
    resDiv.appendChild(resP);
    resDiv.style.visibility = "visible";
    startDiv.style.visibility = "visible";
}