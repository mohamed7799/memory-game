//variables
let playAgain = document.getElementById('play-again-js');
let winMassage = document.getElementById('win-js');
let symbols = document.getElementById('symbols-js');
let icons = document.getElementsByClassName('fab');
let layers = document.getElementsByClassName('layer');
let icon1 = null;
let icon2 = null;

//functions

function addLayer() {
    for (let i = 0; i < layers.length; i++) {
        layers[i].classList.remove('remove-layer');
        layers[i].classList.add('add-layer');
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function randomizeIcons() {
    addLayer();
    let array = Array.from(icons);
    let tempArray = [];

    for (let i = 0; i < array.length; i++) {
        tempArray[i] = array[i].className;
    }

    shuffleArray(tempArray);

    for (let i = 0; i < array.length; i++) {
        icons[i].className = tempArray[i];
    }

    winMassage.style = "display:none";

}

function win() {
    let counter = 0;
    for (let i = 0; i < layers.length; i++) {
        if (layers[i].classList.contains('remove-layer')) {
            counter++;
        }
    }
    if (counter === layers.length) {
        winMassage.style = "display:block";
    }

}

function match(event) {

    let layer = event.target;
    if (layer.classList.contains('layer')) {
        layer.classList.remove('add-layer');
        layer.classList.add('remove-layer');

        if (icon1 === null) {
            icon1 = layer.nextElementSibling;

        }
        else if (icon2 === null) {
            icon2 = layer.nextElementSibling;
            if (icon1.className != icon2.className) {
                setTimeout(function () {
                    icon1.previousElementSibling.classList.add('add-layer');
                    icon1.previousElementSibling.classList.remove('remove-layer');
                    icon2.previousElementSibling.classList.add('add-layer');
                    icon2.previousElementSibling.classList.remove('remove-layer');
                    icon1 = null;
                    icon2 = null;
                }, 1000);

            }
            else {
                icon1 = null;
                icon2 = null;
                win();
            }
        }
    }
}



//event listeners
playAgain.addEventListener("click", randomizeIcons);


symbols.addEventListener("click", match);

