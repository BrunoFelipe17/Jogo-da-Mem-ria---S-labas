"use strict";

var jogo = [{
  silaba: 'bo',
  imageUrl: './img/boliche.jpg',
  texto: 'Boliche'
}, {
  silaba: 'bo',
  imageUrl: './img/boneca.png',
  texto: 'Boneca'
}, {
  silaba: 'ca',
  imageUrl: './img/cachorro.jpg',
  texto: 'Cachorro'
}, {
  silaba: 'ca',
  imageUrl: './img/casa.jpg',
  texto: 'Casa'
}, {
  silaba: 'co',
  imageUrl: './img/cola.png',
  texto: 'Cola'
}, {
  silaba: 'co',
  imageUrl: './img/copo.png',
  texto: 'Copo'
}, {
  silaba: 'li',
  imageUrl: './img/limao.png',
  texto: 'Limão'
}, {
  silaba: 'li',
  imageUrl: './img/livro.jpg',
  texto: 'Livro'
}, {
  silaba: 'tri',
  imageUrl: './img/triangulo.png',
  texto: 'Triângulo'
}, {
  silaba: 'tri',
  imageUrl: './img/trilho.png',
  texto: 'Trilho'
}];


var buttonPlayAgain = document.getElementById('jogar-novamente');
var cards = document.querySelectorAll('.card');
var audio = document.getElementById('palmas');
var acertos = 0;
var clicked = false;
var iterator = 0;
var imagemAtual = null;
var frontAtual = null;
var paused = false;

function game() {

    var images = document.querySelectorAll('.memoria');
    var sceneWin = document.getElementById('win');

    var shuffledObject = shuffle(jogo);
    
    
    
    sceneWin.style.display = 'none';

function setImagesAndDataAttribute(card) {
    var imageTemp = card.querySelector('.memoria');
    var textTemp = card.querySelector('.texto');
    imageTemp.style.backgroundImage = "url(".concat(shuffledObject[iterator].imageUrl, ")");
    imageTemp.dataset.silaba = "".concat(shuffledObject[iterator].silaba);
    textTemp.innerHTML = "".concat(shuffledObject[iterator].texto);
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
              card.addEventListener('click', function () {
                if (paused == false) {
                  console.log(paused);
                  var frontCard = card.querySelector('.front');
                  frontCard.classList.add('remove_front');
                  var imageCard = card.querySelector('.memoria');
                  console.log(imageCard, imagemAtual);
                  clicked = true;
            
                  if (imagemAtual == null) {
                    imagemAtual = imageCard;
                    frontAtual = frontCard;
                  } else {
                    if (imageCard == imagemAtual) {
                      console.log('oi');
                    } else if (imageCard.dataset.silaba == imagemAtual.dataset.silaba) {
                      console.log('você acertou');
                      acertos += 1;
                      card.classList.add('acertou');
                      imagemAtual.parentElement.classList.add('acertou');
                      imagemAtual = null;
                      paused = true;
                      setTimeout(function () {
                        paused = false;
                      }, 1000);
                    } else {
                      console.log('você errou');
                      imagemAtual = null;
                      paused = true;
                      setTimeout(function () {
                        frontAtual.classList.remove('remove_front');
                        frontCard.classList.remove('remove_front');
                        paused = false;
                      }, 1000);
                    }
                  }
                  if (acertos >= 5) {
                      sceneWin.style.display = 'block';
                      palmas.play();
                  }
                }
              });
            });
            
}

buttonPlayAgain.addEventListener('click', function() {
    acertos = 0;
    clicked = false;
    iterator = 0;
    imagemAtual = null;
    frontAtual = null;
    paused = false;
    resetGame();
    game();
})

function resetGame() {
    cards.forEach(function(card) {
        card.classList.remove('acertou');
    })
}



game();