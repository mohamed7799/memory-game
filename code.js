"use strict"
//var
let symbols = document.getElementById("symbols-js");
let game = { icon1: "", onhold: false };
let agian = document.getElementById("play-again-js");
let icons = [...document.getElementsByClassName("fab")]
let win = document.getElementById("win-js");

//fun
let remove = (e) => {
    e.classList.add("remove-layer");
}

let add = (e) => {
    e.classList.remove("remove-layer");
}

let shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let randomizeIcons = () => {

    let tempArray = [];

    for (let i = 0; i < icons.length; i++) {
        tempArray[i] = icons[i].className;
    }

    shuffleArray(tempArray);

    for (let i = 0; i < icons.length; i++) {
        icons[i].className = tempArray[i];
    }

}


let render = () => {
    randomizeIcons();
    setTimeout(() => {
        icons.forEach(ele => {
            add(ele.previousElementSibling);
        });
    }, 1500)

}

let checkWin = () => {
    let count = 0;
    icons.forEach((ele) => {
        if (ele.previousElementSibling.classList.contains("remove-layer")) {
            count++;
        }
    })
    if (count >= 8) {
        win.style = "display:block";
    }
}

agian.addEventListener("click", () => {
    win.style = "display:none";
    render();
})

symbols.addEventListener("click", (e) => {
    if (e.target.classList.contains("layer")) {
        if (!game.onhold) {
            remove(e.target);
            let currentIcon = e.target.nextElementSibling;
            if (game.icon1 === "") {
                game.icon1 = currentIcon;
            }
            else {
                if (currentIcon.classList.value !== game.icon1.classList.value) {
                    game.onhold = true;
                    setTimeout(() => {
                        alert("Wrong try agian");
                        add(currentIcon.previousElementSibling);
                        add(game.icon1.previousElementSibling);
                        game.icon1 = "";
                        game.onhold = false;
                    }, 500);
                }
                else {
                    game.icon1 = "";
                }
            }
            checkWin();
        }

    }

})

render()