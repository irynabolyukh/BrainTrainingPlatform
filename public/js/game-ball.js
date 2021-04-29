const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
const timeLimit = document.querySelector('#timeLimit');
const circlesAmount = document.querySelector('#amount');
const btn = document.querySelector('#start');
const circleRadius = 40;

let h = canvas.height = innerHeight - 375;
let w = canvas.width = innerWidth - 375;
let circleArray;
let mouseCoords = { x: undefined, y: undefined };
let hasWon = false;
let isClicked = false;
let foundCirclesArray = [];
let scored;

//почати гру з натиском на кнопку старт
btn.addEventListener('click', () => {
    foundCirclesArray = [];
    init();
    displayTime(circleArray);
});

//позначити кружечок знайденим по кліку
canvas.addEventListener('click', (e) => {
    let canvasCoords = canvas.getBoundingClientRect();
    mouseCoords.x = e.x - canvasCoords.left;
    mouseCoords.y = e.y - canvasCoords.top;
    isClicked = true;
})

//встановлює час впродовж якого користувач може бачити розташування кружечків
function displayTime(arr) {
    setTimeout(() => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].hide();
        }
    }, timeLimit.value * 1000);
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

//кружечки
function makeCircle(x, y, identifier) {
        this.x = x,
        this.y = y,
        this.color = '#471010',
        this.textColor = '#FFFFFF',
        this.identifier = identifier;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, circleRadius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.fillStyle = this.textColor;
        c.font = '30px Georgia';
        c.fillText(this.identifier, this.x - 10, this.y + 10);
    }

    this.hide = () => {
        this.color = '#d68686';
        this.textColor = '#d68686';
    }

    this.update = () => {
        if (distance(mouseCoords.x, mouseCoords.y, this.x, this.y) <= circleRadius && isClicked === true) {
            // знайдені кружечки позначаємо у масиві як тру
            foundCirclesArray[this.identifier - 1] = true;
            this.color = '#000000';
            this.textColor = '#ffffff';
        }
        this.draw();
    }
}

//розприділяємо кружечку по канвасу так, щоб вони не накладались одне на одного
function init() {
    circleArray = [];

    for (let i = 0; i < circlesAmount.value; i++) {
        let x = Math.floor(Math.random() * (w - circleRadius * 2) + circleRadius),
            y = Math.floor(Math.random() * (h - circleRadius * 2) + circleRadius),
            n = i + 1;

        if (i !== 0) {
            for (let j = 0; j < circleArray.length; j++) {
                if (distance(x, y, circleArray[j].x, circleArray[j].y) - circleRadius * 2 < 0) {
                    x = Math.floor(Math.random() * (w - circleRadius * 2) + circleRadius),
                        y = Math.floor(Math.random() * (h - circleRadius * 2) + circleRadius);

                    j = -1;
                }
            }
        }
        circleArray.push(new makeCircle(x, y, n))
    }
}

//анімація канвасу за допомогою requestAnimationFrame
function animate() {

    if(parseInt(circlesAmount.value) === foundCirclesArray.length && (Object.values(foundCirclesArray).length === foundCirclesArray.length)){
        console.log(foundCirclesArray);
        hasWon = true;
    }

    // якщо гру було виграно, то відправляємо формочку для оновлення результатів користувача
    if(hasWon){
        scored = (circlesAmount.value * 10) / timeLimit.value;
        console.log(scored);
        if(alert('You have scored!')){}
        else {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/update-score", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                score: scored
            }));
            // почекаємо, щоб оновився рахунок
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
    else{
        requestAnimationFrame(animate);
    }
    c.clearRect(0, 0, w, h);

    //гра починається спочатку, якщо було натиснуто неправильний кружечок
    if (foundCirclesArray.length > 0) {
        for (let i = 0; i < foundCirclesArray.length; i++) {
            if (foundCirclesArray[i] !== true) {
                foundCirclesArray = [];
                init();
                displayTime(circleArray);
            }
        }
    }

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

    isClicked = false;

}
init();
displayTime(circleArray);
animate();