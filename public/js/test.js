const resDiv = document.getElementById('result');
const formArray = [];
formArray.push(document.getElementById('тигр'));
formArray.push(document.getElementById('фіалка'));
formArray.push(document.getElementById('сонце'));
formArray.push(document.getElementById('привіт'));
formArray.push(document.getElementById('ліс'));
formArray.push(document.getElementById('кульмінація'));
formArray.push(document.getElementById('магія'));
formArray.push(document.getElementById('свято'));
formArray.push(document.getElementById('золото'));
formArray.push(document.getElementById('успіх'));
formArray.push(document.getElementById('дружба'));
formArray.push(document.getElementById('помаранч'));
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
    let text = document.createTextNode("Ви набрали "+ score + " з 12.");
    resP.appendChild(text);
    resDiv.appendChild(resP);
    $( "#result" ).show();
    $( "#start" ).show();
}