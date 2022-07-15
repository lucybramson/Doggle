
const masterDogsList = [
    {
        breed: "Rhodesian Ridgeback",
        id: 1,
        url: "img/1.jpg"
    },
    {
        breed: "Dalmation",
        id: 2,
        url: "img/2.jpg"
    },
    {
        breed: "Beagle",
        id: 3,
        url: "img/3.jpg"
    },
    {
        breed: "Golden Retriever",
        id: 4,
        url: "img/4.jpg"
    },
    {
        breed: "German Shepherd",
        id: 5,
        url: "img/5.jpg"
    },
    {
        breed: "French Bulldog",
        id: 6,
        url: "img/6.jpg"
    },
    {
        breed: "Pug",
        id: 7,
        url: "img/7.jpg"
    },
    {
        breed: "Daschund",
        id: 8,
        url: "img/8.jpg"
    },
    {
        breed: "Poodle",
        id: 9,
        url: "img/9.jpg"
    },
    {
        breed: "Cocker Spaniel",
        id: 10,
        url: "img/10.jpg"
    },
    {
        breed: "Norfolk Terrier",
        id: 11,
        url: "img/11.jpg"
    },
    {
        breed: "Labrador",
        id: 12,
        url: "img/12.jpg"
    },
    {
        breed: "Cockapoo",
        id: 13,
        url: "img/13.jpg"
    },
    {
        breed: "Chihuahua",
        id: 14,
        url: "img/14.jpg"
    },
    {
        breed: "Shiba Inu",
        id: 15,
        url: "img/15.jpg"
    },
    {
        breed: "Husky",
        id: 16,
        url: "img/16.jpg"
    },
    {
        breed: "Greyhound",
        id: 17,
        url: "img/17.jpg"
    },
    {
        breed: "Jack Russel",
        id: 18,
        url: "img/18.jpg"
    },
    {
        breed: "Pomeranian",
        id: 19,
        url: "img/19.jpg"
    },
    {
        breed: "Bichon Frise",
        id: 20,
        url: "img/20.jpg"
    },
    {
        breed: "Weimerana",
        id: 21,
        url: "img/21.jpg"
    },
    {
        breed: "Border Collie",
        id: 22,
        url: "img/22.jpg"
    },
    {
        breed: "Yorkshire Terrier",
        id: 23,
        url: "img/23.jpg"
    },
    {
        breed: "Shih Tzu",
        id: 24,
        url: "img/24.jpg"
    },
    {
        breed: "Boxer",
        id: 25,
        url: "img/25.jpg"
    },
    {
        breed: "Springer Spaniel",
        id: 26,
        url: "img/26.jpg"
    },
    {
        breed: "Cavalier King Charles Spaniel",
        id: 27,
        url: "img/27.jpg"
    },
    {
        breed: "Chow Chow",
        id: 28,
        url: "img/28.jpg"
    },
    {
        breed: "Corgi",
        id: 29,
        url: "img/29.jpg"
    },
    {
        breed: "Labradoodle",
        id: 30,
        url: "img/30.jpg"
    }
];


// Select all available spaces for dogs to appear on the cards 
let card1ids = document.querySelectorAll('.innerDiv1 > img');
let card2ids = document.querySelectorAll('.innerDiv2 > img');
let score = 0;

// GenerateCards function - generates 2 lists of randomly generated IDs, with one randomly generated ID matching between the 2 lists, inserted at a random index. 
// For use in changeCards(), the list IDs are used to populate the images on the 2 planet cards 
function generateCards () {
// Create a variable for number of dogs on card
const dogsOnCard = card1ids.length;
// Make a new array, holding the IDs of all the dogs from the list 
let idList = []
masterDogsList.forEach(dog => idList.push((dog.id)));

// Generate a random number to be used as the index for the idList
function doggyId() {
    return Math.floor(Math.random() * idList.length);
}
// Generate a random number to be used as the index for inserting the matching ID
function doggyMatchId() {
    return Math.floor(Math.random() * numbersCardRef.length);
}

// Create two empty arrays to populate with IDs for each of the cards. IDs will correspond to images from the master dogs list
let numbersCardRef = [];
let numbersCardPlayer = [];

// Loop through array of avalaiable spaces for images, adding in a randomly generated ID to the first array.
// Splice the ID out from the main list to avoid duplicates
for (let i = 0; i < dogsOnCard; i++) {
    dogId = doggyId();
    numbersCardRef.push(idList[dogId]);
    idList.splice(dogId, 1);
} 

// Generate a second array with one space for the matching ID
for (let i = 0; i < dogsOnCard - 1; i++) {
    dogId = doggyId();
    numbersCardPlayer.push(idList[dogId]);
    idList.splice(dogId, 1);   
}
    
// Define random index to insert matching ID at, generate matching ID, splice in matching ID
let dogMatchIndex = doggyMatchId();
let dogMatchId = numbersCardRef[doggyMatchId()];
numbersCardPlayer.splice(dogMatchIndex, 0, dogMatchId); 

// Return the IDs for each card, and the one matching ID
let cardsArray = [numbersCardPlayer, numbersCardRef, dogMatchId];
return cardsArray
}

// ChangeCards function - calls generateCards() to produce 2 lists of IDs, with one randomly matching ID between the two lists, at a random index.
// Replace the available spacd on each planet card on the page with corresponding images for each ID list
// Add event listener for the matching cards to increment the score.

function changeCards() { 

let $allImages = $('.image');
$allImages.removeClass('match').addClass('noMatch');

let twoNewCards = (generateCards());

// Replace the ID supplied from the arrays returned from generateCards function into the img src attricbute for both planet cards
card1ids.forEach((id, index)  => {
let playerCard = twoNewCards[0]
let i = playerCard[index];
id.setAttribute('src', `img/${i}.jpg`);
});
card2ids.forEach((id, index)  => {
let refCard = twoNewCards[1]
let j = refCard[index];
id.setAttribute('src', `img/${j}.jpg`);
});

// Using the matchID returned from generateCards, set the class attribute of the matching cards to 'match'
let testIndex = twoNewCards[2];

let $matchingImage = $(`img[src="img/${testIndex}.jpg"]`);
$matchingImage.addClass('match').removeClass('noMatch');

// Add event listener to the matching dogs, in order to increment score on click
let winningCards = document.querySelectorAll('.match');
winningCards.forEach(card => {
    card.addEventListener('click', incrementScore);
});

// Add event listener to the non-matching dogs, in order to increment score on click
let wrongCards = document.querySelectorAll('.noMatch');
wrongCards.forEach(card => {
    card.addEventListener('click', wrongDog);
});
}

// Removes event listener from both matching cards upon clicking one of the winning pair
function removeListener() {
    const removalCards = document.querySelectorAll('.match');
    removalCards.forEach(card => {
        card.removeEventListener('click', incrementScore)
    });
}

// Called by event listener on winning pair. Removes matching pair, increments score and calls changeCards() to display two new planet cards
function incrementScore() {
    removeListener()
    removeWrongListener();
    score += 1;
    document.querySelector('#score-counter').innerHTML = score;
    scoreAnimate();
    changeCards();
};

// Removes event listener from wrong cards upon clicking one of the winning pair
function removeWrongListener() {
    const removalWrongCards = document.querySelectorAll('.noMatch');
    removalWrongCards.forEach(card => {
        card.removeEventListener('click', wrongDog)
    });
}

// Called by event listener on non-matching pair. 
function wrongDog() {
    $tryAgain.velocity("fadeIn", { duration: 250 })
    .velocity("fadeOut", { delay: 650, duration: 500 });
};

// Set the display property of the wrappers on page load
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#pre-play').style.setProperty('display', 'flex');
    document.querySelector('#countdown').style.setProperty('display', 'none');
    document.querySelector('#play').style.setProperty('display', 'none');
    document.querySelector('#game-over').style.setProperty('display', 'none');
});

// Select start and play again buttons and add event listeners
const startButtons = document.querySelectorAll('.play-buttons');
    startButtons.forEach(button => {
    button.addEventListener('click', countdownTimer);
});

// Set the display property of the wrappers and trigger countdown timer; call gameStart() function
function countdownTimer() {
    dogsAnimate();
    document.querySelector('#pre-play').style.setProperty('display', 'none');
    document.querySelector('#game-over').style.setProperty('display', 'none');
    document.querySelector('#countdown').style.setProperty('display', 'flex');
    const countdownDuration = 3;
    const countdownDisplay = document.querySelector('.countdown-number');
    let timer = countdownDuration, seconds;
    function intervalFunction () {
        seconds = parseInt(timer % 60, 10);
        countdownDisplay.textContent = seconds;
        countdownDisplay.style.setProperty('display', 'flex');
        if (--timer < 0) {
            clearInterval(intervalID2);
            gameStart();
            countdownDisplay.style.setProperty('display', 'none');
        }
    }
    const intervalID2 = setInterval(intervalFunction, 1000);   
}

// Set the display property of the wrappers and start the main timer
function gameStart (){
    document.querySelector('#play').style.setProperty('display', 'flex');
    document.querySelector('#countdown').style.setProperty('display', 'none');
    changeCards();
    score = 0;
    document.querySelector('#score-counter').innerHTML = score;
    const gameDuration = 120;
    display = document.querySelector('#time');
    gameTimer(gameDuration, display);
  };

// Main game timer; calls gameOver() function on completion
function gameTimer(duration, display) {
    let timer = duration, minutes, seconds;
    function intervalFunction () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(intervalID);
            removeListener();
            gameOver();
        }
    }
    const intervalID = setInterval(intervalFunction, 1000);  
}

// sets the display property of the wrappers and shows the final score and play again/scoreboard options (scoreboard to come later)
function gameOver() {
    reverseAnimate();
    document.querySelector('#play').style.setProperty('display', 'none');
    document.querySelector('#game-over').style.setProperty('display', 'flex');
    document.querySelector('.final-score-number').innerHTML = score;
}

// animation - variables
const $planet1 = $('.innerDiv1');
const $planet2 = $('.innerDiv2');
const $littleDoggies = $('.image');
const $topLeft = $('.top-left');
const $topRight = $('.top-right');
const $bottomLeft = $('.bottom-left');
const $bottomRight = $('.bottom-right');
const $topMiddle = $('.top-middle');
const $middleLeft = $('.middle-left');
const $middleRight = $('.middle-right');
const $bottomMiddle = $('.bottom-middle');
const $middleMiddle = $('.middle-middle');
const $littleDoggies1 = $('.imageL');
const $littleDoggies2 = $('.imageR');
const $score = $('#score-counter');
const $goodBoy = $('.good-boy');
const $tryAgain = $('.try-again');

// animation - functions
function reverseAnimate() {
    $planet1.velocity('reverse', {duration: 1});
    $planet2.velocity('reverse', {duration: 1});
    $littleDoggies.velocity('reverse', {duration:1});
}

function dogsAnimate(){
   
    $planet1.velocity({rotateZ: '1000deg'}, {duration: 126000, easing: 'linear'});
    $planet2.velocity({rotateZ: '-1000deg'}, {duration: 126000, easing: 'linear'});
    $topLeft.velocity({translateX: '45%', translateY: '45%', scaleX: 0.65, scaleY: 0.65}); 
    $topRight.velocity({translateX: '-45%', translateY: '45%', scaleX: 0.65, scaleY: 0.65}); 
    $bottomLeft.velocity({translateX: '45%', translateY: '-45%', scaleX: 0.65, scaleY: 0.65}); 
    $bottomRight.velocity({translateX: '-45%', translateY: '-45%', scaleX: 0.65, scaleY: 0.65}); 
    $topMiddle.velocity({translateY: '18%', scaleX: 0.65, scaleY: 0.65}); 
    $middleLeft.velocity({translateX: '18%', scaleX: 0.65, scaleY: 0.65}); 
    $middleRight.velocity({translateX: '-18%', scaleX: 0.65, scaleY: 0.65}); 
    $bottomMiddle.velocity({translateY: '-18%', scaleX: 0.65, scaleY: 0.65});
    $middleMiddle.velocity({scaleX: 0.65, scaleY: 0.65});
    $littleDoggies1.velocity({rotateZ: '-5000deg'}, {duration: 126000});
    $littleDoggies2.velocity({rotateZ: '5000deg'}, {duration: 126000});

    $littleDoggies.mouseenter(function() {
        $(this).velocity({scaleX: 0.75, scaleY: 0.75}, {easing: "swing", duration: 250, queue:false});
    });

    $littleDoggies.mouseout(function() {
        $(this).velocity({scaleX: 0.65, scaleY: 0.65},{easing: [200, 14], delay: 50, queue: false});
    });
}

function scoreAnimate() {
    $score.velocity({scaleX: 1.3, scaleY: 1.4}, {duration: 400, easing: [0.68, -0.55, 0.265, 1.55]}).velocity('reverse');
    $goodBoy.velocity("fadeIn", { duration: 250 })
    .velocity("fadeOut", { delay: 650, duration: 500 });
};

// Modal window - Instructions

// Get the button that need to be hidden when the modal is displayed
const hideDoggle = document.querySelector(".doggle-logo");
const hidePressStart = document.querySelector(".press-start");
const hideHowToPlay = document.querySelector(".how-to-play");

// Get the modal
const modal = document.querySelector("#modal-pre-play");

// Get the button that opens the modal
const btn = document.querySelector("#modalBtn");

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName("back-button")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  hideDoggle.style.display = "none";
  hidePressStart.style.display = "none";
  hideHowToPlay.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
  hideDoggle.style.display = "block";
  hidePressStart.style.display = "block";
  hideHowToPlay.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    hideDoggle.style.display = "block";
    hidePressStart.style.display = "block";
    hideHowToPlay.style.display = "block";
  }
}

// inner Modal window - example image

// Get the modal
const modalInner = document.querySelector("#modal-image-window");

// Get the button that opens the modal
const btnInner = document.querySelector("#inner-modalBtn");

// Get the <span> element that closes the modal
const closeBtnInner = document.getElementsByClassName("back-button-inner")[0];

// When the user clicks on the button, open the modal
btnInner.onclick = function() {
  modalInner.style.display = "block";
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
closeBtnInner.onclick = function() {
  modalInner.style.display = "none";
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalInner) {
    modalInner.style.display = "none";
    hideDoggle.style.display = "block";
    hidePressStart.style.display = "block";
    hideHowToPlay.style.display = "block";
  }
}

// Viewport height (vh) unit manipulation
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Allow for resizing
window.addEventListener('resize', () => {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });


     

