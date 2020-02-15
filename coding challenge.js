/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the 
next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they 
can change the predefined score of 100. (Hint: you can read that value with the .
value property in JavaScript. This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current
score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a
look at the CSS code for the first one.)
*/

var score,activePlayer,roundScore,gamePlaying,lastValue=0,winningScore;

init();
function init(){
    gamePlaying=true;
    score=[0,0];
    activePlayer=0;
    roundScore=0;
    document.querySelector("#name-0").textContent="Player1"
    document.querySelector("#name-1").textContent="Player2"
    hideDice();
    document.querySelector("#score-0").textContent="0";
    document.querySelector("#score-1").textContent="0";
    document.querySelector("#current-0").textContent="0";
    document.querySelector("#current-1").textContent="0";
}

document.querySelector(".btn-roll").addEventListener("click",function(){

    if(gamePlaying){
        // Random number
        var dice0=Math.floor(Math.random()*6)+1;
        var dice1=Math.floor(Math.random()*6)+1;
        
        if(lastValue==6 && (lastValue==dice0 || lastValue==dice1)){
            document.querySelector("#score-"+activePlayer).textContent="0"
            document.querySelector("#current-"+activePlayer).textContent="0"
            score[activePlayer]=0;
            lastValue=0;
            nextPlayer();
        }
        else{
            // Update the dice variable in images of dice.
            document.querySelector("#dice-0").style.display="block";
            document.querySelector("#dice-0").src="./static/dice-"+dice0+".png";
            document.querySelector("#dice-1").style.display="block";
            document.querySelector("#dice-1").src="./static/dice-"+dice1+".png";

            // Update the roundScore if the dice value is not 1
            if(dice0!=1 && dice1!=1){
                //Add score
                roundScore+=dice0+dice1;
                document.querySelector("#current-"+activePlayer).textContent=roundScore;
            }
            else{
                nextPlayer();

            }
            lastValue=dice0;
        }
        
    }

});
document.querySelector(".btn-hold").addEventListener("click",function(){

    if(gamePlaying){
        lastValue=0;
        // Global score
        score[activePlayer]+=roundScore;
        document.querySelector("#score-"+activePlayer).textContent=score[activePlayer];
        roundScore=0;
        document.querySelector("#current-"+activePlayer).textContent=roundScore;

        var input=document.querySelector(".final-score").value;
        if(input){
            winningScore=input;
        }
        else{
            winningScore=100;
        }

        // Check winner
        if(score[activePlayer]>=winningScore){
            document.querySelector("#name-"+activePlayer).textContent="Winner!";
            hideDice();
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            gamePlaying=false;
        }
        else{
                // Next player
                nextPlayer();
        }
    }
});

function nextPlayer(){
    roundScore=0;
    document.querySelector("#current-"+activePlayer).textContent=roundScore;

    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");

    activePlayer===0 ? activePlayer=1 : activePlayer=0;

    document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");

    hideDice();
}

document.querySelector(".btn-new").addEventListener("click",function(){
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
    init();
});
function hideDice(){
    document.querySelector("#dice-0").style.display="none";
    document.querySelector("#dice-1").style.display="none";
}
