var suits = ['Diamonds', 'Spads', 'Hearts', 'Clubs', 'Diamonds', 'Spads', 'Hearts', 'Clubs'];
var valueCards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var deck = new Array();
var shuffleDeck;
const weight = document.getElementById('weight');
var players = new Array();
var playerNum = 0;

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

function startGame(){
    createPlayers(3);
    dealCards();
}

function dealCards(){
    shuffleDeck = shuffle(deck);
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < players.length; j++){
            var card = shuffleDeck.pop();
            players[j].Hand.push(card);
            printCards(card, j);
        }
    }
    updatePoints();
    hideDealer();
    document.getElementById('turn').textContent = "Player " + playerNum + " Turn";
}

function hideDealer(){
    const dealerNum = players.length - 1;
    var pointText = document.getElementById('weight2');
    const dealer = document.getElementById('player2');
    dealer.removeChild(dealer.lastChild);
    let finalWeight = players[dealerNum].Points - players[dealerNum].Hand[1].Weight;
    console.log(finalWeight);
    players[dealerNum].Points = finalWeight;
    pointText.textContent = "House: " + finalWeight;
}

//get points
function getPoints(player){
    var point = 0;
    for(let i = 0; i < players[player].Hand.length; i++){
        point += players[player].Hand[i].Weight;
    }
    players[player].Points = point;
}

// update points
function updatePoints(){   
    for(let i = 0; i < players.length; i++){
        getPoints(i);
        var pointText = document.getElementById('weight' + i);
        pointText.textContent = "Player " + i + ": " + players[i].Points;
    }
}

function updatePointsOf(i){
    getPoints(i);
    var pointText = document.getElementById('weight' + i);
    pointText.textContent = "Player " + i + ": " + players[i].Points;
}

function printCards(card, j){
    const playerId = document.getElementById('player' + j);
    console.log(j + " " + card.Suits + " " + card.ValueCards);
    const li = document.createElement("LI");
    const span = document.createElement("SPAN");
    span.textContent = card.ValueCards + " " + card.Suits;

    li.appendChild(span);
    playerId.appendChild(li);
}

/*
function blackjackCheck(){
    if(players[playerNum].Points > 21){
        document.getElementById('weight' + playerNum).textContent = "Busted";
        playerNum++;
        document.getElementById('turn').textContent = "Player " + playerNum + " Turn";
    }
}*/

function clearTable(){
    for(let i = 0; i <= 1; i++){
        const playerId0 = document.getElementById('player' + i);
        while(playerId0.childNodes.length != 1){
            playerId0.removeChild(playerId0.lastChild);
        }
        while(players[i].Hand.length != 0){
            players[i].Hand.pop();
            players[i].Points = 0;
        }
    }
    playerNum = 0;
    dealCards();
}

function check(){
    if(players[0].Points > 21){
        document.getElementById('weight0').textContent = "Busted";
    }
    if(players[1].Points > 21){
        document.getElementById('weight1').textContent = "Busted";
    }
    if(players[0].Points > players[1].Points && players[0].Points <= 21){
        document.getElementById('weight0').textContent = "winner!";
    }else if (players[1].Points > players[0].Points && players[1].Points <= 21){
        document.getElementById('weight1').textContent = "Winner!";
    }
    if(playerNum >= 2){
        clearTable();
        //playerNum = 0;
    }
    document.getElementById('turn').textContent = "Player " + playerNum + " Turn";
}

function showDealer(){
    const dealerNum = players.length - 1;
    const dealer = document.getElementById('player2');
    const li = document.createElement("LI");
    const span = document.createElement("SPAN");

    span.textContent = players[dealerNum].Hand[1].ValueCards + " " + players[dealerNum].Hand[1].Suits;
    li.appendChild(span);
    dealer.appendChild(li);

    let finalWeight = players[dealerNum].Points + players[dealerNum].Hand[1].Weight;
    players[dealerNum].Points = finalWeight;
    document.getElementById('weight2').textContent = "House: " + players[dealerNum].Points;
}

function hit(){
    var hitCard = shuffleDeck.pop();
    players[playerNum].Hand.push(hitCard);
    printCards(hitCard, playerNum);
    updatePointsOf(playerNum);
   // blackjackCheck();
}

function stay(){
    document.getElementById('player'+playerNum).innerHTML = "Player" + playerNum + ": " + " Stay!";
    playerNum++;
    document.getElementById('turn').textContent = "Player: " + playerNum + " Turn";
    if(playerNum === players.length-1){
        console.log(playerNum);
        document.getElementById('turn').textContent = "House's Turn";
        showDealer();
    }
    //check();
}

function houseTurn(){

}