let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, loses: 0, draw: 0 };
// if (!score) {
//   score = {
//     wins: 0,
//     loses: 0,
//     draw: 0
//   };
// }


updatescoreElement();
let isAutoplaying = false;
let intervalId;
function autosave() {
  if (!isAutoplaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 2000)
    isAutoplaying = true;
    document.querySelector('.js-auto-button').innerHTML = 'Stop Playing'
  }
  else {
    clearInterval(intervalId);
    isAutoplaying = false;
    document.querySelector('.js-auto-button').innerHTML = 'Auto play'

  }
}
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
})
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
})
document.querySelector('.js-auto-button').addEventListener('click', () => {
  autosave();
})
document.querySelector('.js-reset-button').addEventListener('click', () => {
  runderTodolistDelete();

})
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }
  else if (event.key === 'p') {
    playGame('paper')
  }
  else if (event.key === 's') {
    playGame('scissors')
  }
  else if (event.key === 'a') {
    autosave()
  }
  else if (event.key === 'Backspace') {
    score.wins = 0;
    score.loses = 0;
    score.draw = 0;
    localStorage.removeItem('score');
    updatescoreElement();

  }
})
function runderTodolistDelete() {
  let todoListHtmlDelet = '';

  // const todoObject = todoList[i];
  // //const name = todoObject.name;
  // const { name } = todoObject
  // //const dueDate = todoObject.dueDate
  // const { dueDate } = todoObject

  //generating the html
  const html = `
    <div class="js-prg">Are you sure you want to reset the score?</div> 
    <button onclick=" score.wins = 0;
    score.loses = 0;
    score.draw = 0;
    localStorage.removeItem('score');
    updatescoreElement();
    document.querySelector('.js-check').innerHTML =''" class="js-button">yes</button>
    <button onclick="document.querySelector('.js-check').innerHTML ='';" class="js-button2">no</button>`
  todoListHtmlDelet += html;


  document.querySelector('.js-check').innerHTML = todoListHtmlDelet;
}





function playGame(playerMove) {

  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'you lose';
    }
    else if (computerMove === 'paper') {
      result = 'you win';
    }
    else if (computerMove === 'scissors') {
      result = 'you draw';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'you win';
    }
    else if (computerMove === 'paper') {
      result = 'you draw';
    }
    else if (computerMove === 'scissors') {
      result = 'you lose';
    }
  }
  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'you draw';
    }
    else if (computerMove === 'paper') {
      result = 'you lose';
    }
    else if (computerMove === 'scissors') {
      result = 'you win';
    }
  }

  if (result === 'you win') {
    score.wins += 1;
  }
  else if (result === 'you lose') {
    score.loses += 1;
  }
  else if (result === 'you draw') {
    score.draw += 1;
  }
  //on utilise json.stringify parceque  localStorage suport seleument string
  localStorage.setItem('score', JSON.stringify(score));

  updatescoreElement();
  document.querySelector('.js-result').innerHTML = `${result}`;
  document.querySelector('.js-moves').innerHTML = `You
      <img src="icon/${playerMove}-emoji.png" class="icon">
      <img src="icon/${computerMove}-emoji.png" class="icon"> Computer`;

  // alert(`you picked ${playerMove}.computer picked ${computerMove}.${result}.you wins:${score.wins},you losses:${score.loses},you draw:${score.draw}`);


}
// function resultMove() {
//   document.querySelector('.js-result').innerHTML = result;
// }
function updatescoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins:${score.wins},Losses:${score.loses},Draw:${score.draw}`;

}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) { computerMove = 'rock'; }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper'
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors'
  }
  return computerMove;
}