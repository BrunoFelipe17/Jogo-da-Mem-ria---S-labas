const jogo = [
    {
        silaba: 'bo',
        imageUrl: './img/boliche.jpg',
        texto: 'Boliche'
    },
    {
        silaba: 'bo',
        imageUrl: './img/boneca.png',
        texto: 'Boneca'
    },
    {
        silaba: 'ca',
        imageUrl: './img/cachorro.jpg',
        texto: 'Cachorro'
    },
    {
        silaba: 'ca',
        imageUrl: './img/casa.jpg',
        texto: 'Casa'
    },
    {
        silaba: 'co',
        imageUrl: './img/cola.png',
        texto: 'Cola'
    },
    {
        silaba: 'co',
        imageUrl: './img/copo.png',
        texto: 'Copo'
    },
    {
        silaba: 'li',
        imageUrl: './img/limao.png',
        texto: 'Limão'
    },
    {
        silaba: 'li',
        imageUrl: './img/livro.jpg',
        texto: 'Livro'
    },
    {
        silaba: 'tri',
        imageUrl: './img/triangulo.png',
        texto: 'Triângulo'
    },
    {
        silaba: 'tri',
        imageUrl: './img/trilho.png',
        texto: 'Trilho'
    }   
]

const cards = document.querySelectorAll('.card');
const images = document.querySelectorAll('.memoria');
const shuffledObject = shuffle(jogo);
let iterator = 0;
let imagemAtual = null;shuffledObject
let frontAtual = null;
let paused = false;
let clicked = false;

cards.forEach(function(card) {
    setImagesAndDataAttribute(card)

    console.log(image.dataset.silaba)
})


cards.forEach(function(card) {
    card.addEventListener('click', function() {
            if (paused == false) {
                console.log(paused)
                
                let frontCard = card.querySelector('.front');
                frontCard.classList.add('remove_front');
                let imageCard = card.querySelector('.memoria');
                console.log(imageCard, imagemAtual)
                clicked = true;
                if (imagemAtual == null) {
                    imagemAtual = imageCard;
                    frontAtual = frontCard;
                } else {
                    if (imageCard == imagemAtual) {
                        console.log('oi');
                    } else if(imageCard.dataset.silaba == imagemAtual.dataset.silaba) {
                        
                        console.log('você acertou');

                        card.classList.add('acertou');
                        imagemAtual.parentElement.classList.add('acertou');

                        imagemAtual = null;
         
                        paused = true;
                        setTimeout(function() {
                            paused = false;
                        }, 1000)
                    } else {
                        console.log('você errou');
                        imagemAtual = null;
                        paused = true;
                        setTimeout(function() {
                            frontAtual.classList.remove('remove_front');
                            frontCard.classList.remove('remove_front');
                            paused = false;
                        }, 1000)
                    }
                }
            }
        })
})

function setImagesAndDataAttribute(card) {
    image = card.querySelector('.memoria')
    text = card.querySelector('.texto');
    console.log(text)
    image.style.backgroundImage = `url(${shuffledObject[iterator].imageUrl})`
    image.dataset.silaba = `${shuffledObject[iterator].silaba}`
    text.innerHTML = `${shuffledObject[iterator].texto}`
    iterator++;
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}