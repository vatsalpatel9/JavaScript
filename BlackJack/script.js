var suits = ['Diamonds', 'Spads', 'Hearts', 'Clubs', 'Diamonds', 'Spads', 'Hearts', 'Clubs'];
var valueCards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var deck = new Array();
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
var shuffleDeck;
const weight = document.getElementById('weight');
var players = new Array();

function buildDeck(){
    deck = new Array();
    for(let i = 0; i < valueCards.length; i++){
        for(let j =0; j < suits.length; j++){
            var weight = parseInt(valueCards[i]);
            if(valueCards[i] === 'J' || valueCards[i] === 'Q' || valueCards[i] === 'K'){
                weight = 10;
            }else if (valueCards[i] === 'A'){
                weight = 11;
            }
            var card = {ValueCards: valueCards[i], Suits: suits[j], Weight: weight}
            deck.push(card);
        }
    }
}

function testDeck(){
    console.log(deck.length);
}

buildDeck();
var pickCard = deck[Math.floor(Math.random() * deck.length)];
console.log(pickCard);
if(pickCard.Suits === 'Diamonds'){
    console.log("lucky");
}else{
    console.log("unlucky");
}

testDeck();

function shuffle(array){
    var currIndex = array.length, temporaryValue, randomIndex;
    while (0 != currIndex){
        randomIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        temporaryValue = array[currIndex];
        array[currIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue; 
    }
    return array;
}

function createPlayers(num){
    players = new Array();
    for (let i = 1; i <= num; i++){
        var hand = new Array();
        var player = {Name: "Player " + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

function dealCards(){
    shuffleDeck = shuffle(deck);
    createPlayers(2);
    console.log(players.length);
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < players.length; j++){
            var card = shuffleDeck.pop();
            players[i].Hand.push(card);
            printCards(card, j);
            updatePoints();
        }
    }
    console.log(players[0].Hand.length);
}

//get points
function getPoints(player){
    var point = 0;
    for(let i = 0; i < players[player].Hand.length; i++){
        point += players[player].Hand[i].Weight;
        console.log(players[player].Hand[i].Weight);
    }
    players[player].Points = point;
    return point;
}

// update points
function updatePoints(){    
    for(let i = 0; i < players.length; i++){
        var points = getPoints(i);
        var pointText = document.getElementById('weight' + i);
        pointText.textContent = points;
    }
}

function printCards(card, j){
   // shuffleDeck = shuffle(deck);
   // for(let i = 0; i < shuffleDeck.length; i++){
       /*
    for(let i = 0; i < 2; i++){
        var player1Card = shuffleDeck.pop();
        const player1Li = document.createElement("LI");
        const span1 = document.createElement("SPAN");
        span1.textContent = player1Card.ValueCards + " " + player1Card.Suits;
        player1Weight += player1Card.Weight;
        weight.textContent = player1Weight;

        player1Li.appendChild(span1);
        player1.appendChild(player1Li);
    }*/
    //}
    const playerId = document.getElementById('player' + j);
    const li = document.createElement("LI");
    const span = document.createElement("SPAN");
    span.textContent = card.ValueCards + " " + card.Suits;

    li.appendChild(span);
    playerId.appendChild(li);
}

function hit(){
    var hitCard = shuffleDeck.pop();
    player1Weight += hitCard.Weight;
    weight.textContent = player1Weight;
    const player1Li2 = document.createElement("LI");
    const span2 = document.createElement("SPAN");
    span2.textContent = hitCard.ValueCards + " " + hitCard.Suits;
    
    player1Li2.appendChild(span2);
    player1.appendChild(player1Li2);
}
