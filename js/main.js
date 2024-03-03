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

  // playthe game
  play.addEventListener("click", levelUp);

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
        highScore.innerText++;
        if (highScore == 12) {
        }
      } else {
        restart();
      }
    }
  }

  function restart() {
    userSeq = [];
    gameSeq = [];
    level.innerText = 0;
  }
};
