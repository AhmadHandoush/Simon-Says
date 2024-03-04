window.onload = function () {
  let cells = document.querySelectorAll(".tile");
  let highScore = document.getElementById("high-score");
  let play = document.getElementById("play");
  let level = document.getElementById("level");
  let board = document.querySelector(".board");

  let simonSays = Math.floor(Math.random() * 12);

  let gameSeq = [];
  let userSeq = [];
  let colors = ["red", "green", "yellow", "blue"];

  // for win and game over

  // play the game
  play.addEventListener("click", function () {
    play.classList.add("unclickable");
    levelUp();
  });

  function flashCell(btn) {
    btn.classList.remove("inactive");
    setTimeout(function () {
      btn.classList.add("inactive");
    }, 700);
  }

  function userFlash(btn) {
    btn.classList.remove("inactive");
    setTimeout(function () {
      btn.classList.add("inactive");
    }, 400);
  }

  function levelUp() {
    userSeq = [];
    level.innerText++;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = colors[randomNumber];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    board.classList.remove("unclickable");
    flashCell(randomBtn);
    for (color of gameSeq) {
      let audio = new Audio(`../sounds/${color}.mp3`);
      audio.play();
    }
  }

  let buttons = document.querySelectorAll(".tile");
  buttons.forEach((btn) => {
    btn.addEventListener("click", userPress);
  });

  // press function
  function userPress() {
    userFlash(this);
    let userColor = this.getAttribute("data-tile");
    let audio = new Audio(`../sounds/${userColor}.mp3`);
    audio.play();
    userSeq.push(userColor);
    checkColor(userSeq.length - 1);
  }

  // check
  function checkColor(id) {
    if (userSeq[id] === gameSeq[id]) {
      if (userSeq.length == gameSeq.length) {
        setTimeout(levelUp, 400);
        if (level.innerText == 12) {
          let audio = new Audio("../sounds/game-win.wav");
          audio.play();

          setTimeout(restart, 2000);
        }
      }
    } else {
      setTimeout(function () {
        let audio = new Audio(`../sounds/game-over.wav`);
        audio.play();
      }, 100);
      endGame();
    }
  }

  function endGame() {
    let audio = new Audio("../sounds/wrong.mp3");
    audio.play();
    restart();
  }

  function restart() {
    userSeq = [];
    gameSeq = [];
    level.innerText = 0;
    play.classList.remove("unclickable");
  }
};
