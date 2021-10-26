"use strict";

const pathDraw = "./img/draw";
const pathNumber = "./img/number";

var jogo = [
  {
    number: "1",
    imageUrl: `${pathDraw}/1.png`,
    type: "squares",
  },
  {
    number: "1",
    imageUrl: `${pathNumber}/1.png`,
    type: "number",
  },
  {
    number: "2",
    imageUrl: `${pathDraw}/2.png`,
    type: "squares",
  },
  {
    number: "2",
    imageUrl: `${pathNumber}/2.png`,
    type: "number",
  },
  {
    number: "3",
    imageUrl: `${pathDraw}/3.png`,
    type: "squares",
  },
  {
    number: "3",
    imageUrl: `${pathNumber}/3.png`,
    type: "number",
  },
  {
    number: "4",
    imageUrl: `${pathDraw}/4.png`,
    type: "squares",
  },
  {
    number: "4",
    imageUrl: `${pathNumber}/4.png`,
    type: "number",
  },
  {
    number: "5",
    imageUrl: `${pathDraw}/5.png`,
    type: "squares",
  },
  {
    number: "5",
    imageUrl: `${pathNumber}/5.png`,
    type: "number",
  },
  {
    number: "6",
    imageUrl: `${pathDraw}/6.png`,
    type: "squares",
  },
  {
    number: "6",
    imageUrl: `${pathNumber}/6.png`,
    type: "number",
  },
  {
    number: "7",
    imageUrl: `${pathDraw}/7.png`,
    type: "squares",
  },
  {
    number: "7",
    imageUrl: `${pathNumber}/7.png`,
    type: "number",
  },
  {
    number: "8",
    imageUrl: `${pathDraw}/8.png`,
    type: "squares",
  },
  {
    number: "8",
    imageUrl: `${pathNumber}/8.png`,
    type: "number",
  },
  {
    number: "9",
    imageUrl: `${pathDraw}/9.png`,
    type: "squares",
  },
  {
    number: "9",
    imageUrl: `${pathNumber}/9.png`,
    type: "number",
  },
  {
    number: "10",
    imageUrl: `${pathDraw}/10.png`,
    type: "squares",
  },
  {
    number: "10",
    imageUrl: `${pathNumber}/10.png`,
    type: "number",
  },
];

var buttonPlayAgain = document.getElementById("jogar-novamente");
var cards = document.querySelectorAll(".card");
var audio = document.getElementById("palmas");
var acertos = 0;
var clicked = false;
var iterator = 0;
var imagemAtual = null;
var frontAtual = null;
var paused = false;

function game() {
  var images = document.querySelectorAll(".memoria");
  var sceneWin = document.getElementById("win");

  var shuffledObject = shuffle(jogo);

  sceneWin.style.display = "none";

  function setImagesAndDataAttribute(card) {
    var imageTemp = card.querySelector(".memoria");
    var frontTemp = card.querySelector(".front");

    if (shuffledObject[iterator].type === "number") {
      frontTemp.style.backgroundColor = "#04A04E";
    }

    imageTemp.style.backgroundImage = "url(".concat(
      shuffledObject[iterator].imageUrl,
      ")"
    );
    imageTemp.dataset.number = "".concat(shuffledObject[iterator].number);
    imageTemp.dataset.type = "".concat(shuffledObject[iterator].type);
    iterator++;
  }

  function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex; // While there remain elements to shuffle...

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1; // And swap it with the current element.

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  cards.forEach(function (card) {
    setImagesAndDataAttribute(card);
  });

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      if (paused == false) {
        var frontCard = card.querySelector(".front");
        frontCard.classList.add("remove_front");
        var imageCard = card.querySelector(".memoria");
        clicked = true;

        if (imagemAtual == null) {
          imagemAtual = imageCard;
          frontAtual = frontCard;
        } else {
          if (
            imageCard.dataset.number == imagemAtual.dataset.number &&
            imageCard.dataset.type != imagemAtual.dataset.type
          ) {
            acertos += 1;
            card.classList.add("acertou");
            imagemAtual.parentElement.classList.add("acertou");
            imagemAtual = null;
            paused = true;
            setTimeout(function () {
              paused = false;
            }, 1000);
          } else {
            imagemAtual = null;
            paused = true;
            setTimeout(function () {
              frontAtual.classList.remove("remove_front");
              frontCard.classList.remove("remove_front");
              paused = false;
            }, 1000);
          }
        }
        if (acertos >= 10) {
          sceneWin.style.display = "block";
          palmas.play();
          palmas.volume = 0.5;
        }
      }
    });
  });
}

buttonPlayAgain.addEventListener("click", function () {
  acertos = 0;
  clicked = false;
  iterator = 0;
  imagemAtual = null;
  frontAtual = null;
  paused = false;
  resetGame();
  game();
});

function resetGame() {
  cards.forEach(function (card) {
    card.classList.remove("acertou");
    card.children[0].classList.remove("remove_front");
  });
}

game();
