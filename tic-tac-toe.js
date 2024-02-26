let turnCount = 1;
let player2 = true;
let gameOver = false;

//results
let pastResults = JSON.parse(localStorage.getItem('score')) || {
  wins1: 0,
  ties: 0,
  wins2: 0
};
showResults();
//

let gameBoard = [null, null, null, null, null, null, null, null, null]

function resetGameBoard(){
  gameBoard = [null, null, null, null, null, null, null, null, null];
  for(let i = 0; i < 9; i++){
    document.querySelector(`[id="${i}"]`).innerHTML = '';
  }
  document.querySelector(`.round-result`).innerHTML = '...';
}
const boxButtons = document.querySelectorAll('.box');

boxButtons.forEach((button) =>{
    button.addEventListener('click', playGame);
});

function playGame(event){
  if(!gameOver){
    const clickedButton = event.target;
//!!!!!
    if(!clickedButton.innerHTML.trim()){
      if(turnCount % 2 === 0){
        clickedButton.innerHTML = 'o';
        gameBoard[clickedButton.id] = 'o';
      }
      else{
        clickedButton.innerHTML = 'x';
        gameBoard[clickedButton.id] = 'x';
      }
      turnCount++;
    }
    
    
    isGameover();
  
  if(!player2 && !gameOver && turnCount % 2 === 0){
    let remainingMoves = [];
    for(let i = 0; i < gameBoard.length; i++){
      if(gameBoard[i] === null){
        remainingMoves.push(i);
      }
    }
     let randomMoveIndex = Math.floor(Math.random() * remainingMoves.length);
     let randomMove = remainingMoves[randomMoveIndex];
     document.querySelector(`[id="${randomMove}"]`).innerHTML = 'o'
     gameBoard[randomMove] = 'o';
     turnCount++;
     isGameover();
  }
  }
}

function isGameover(){
  const winingPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for(const pattern of winingPatterns){
    const [a, b, c] = pattern;
    if(gameBoard[a] && gameBoard[a] == gameBoard[b] && gameBoard[a] == gameBoard[c]){
      if(gameBoard[a] === 'x'){
        pastResults.wins1++;
        showResults();
        gameOver = true;
        document.querySelector('.confetti').style.opacity = 1;
        setTimeout(function () {
          document.querySelector('.confetti').style.opacity = 0;
        }, 3000);
        return document.querySelector('.round-result').innerHTML = 'Player 1 Wins!';
      }
      else if(gameBoard[a] === 'o'){
        pastResults.wins2++;
        showResults();
        gameOver = true;
        document.querySelector('.confetti').style.opacity = 1;
        setTimeout(function () {
          document.querySelector('.confetti').style.opacity = 0;
        }, 3000);
        return document.querySelector('.round-result').innerHTML = 'Player 2 Wins!';
      }
    }
  }
  if(gameBoard.every(cell => cell!== null)){
    pastResults.ties++;
    showResults();
    gameOver = true;
    document.querySelector('.confetti').style.opacity = 1;
        setTimeout(function () {
          document.querySelector('.confetti').style.opacity = 0;
        }, 3000);
    return document.querySelector('.round-result').innerHTML = `It's a Tie!`
  }
}

function showResults(){
  document.querySelector('.results').innerHTML = `Player 1: ${pastResults.wins1}<br><br>Ties: ${pastResults.ties}<br><br>Player 2: ${pastResults.wins2}`;
  localStorage.setItem('score', JSON.stringify(pastResults));
};

//to do: easy normal hard