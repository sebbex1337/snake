"use strict";

import { Queue } from "./queue.js";

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

const GRID_ROWS = 20;
const GRID_COLS = 30;
let isGameOver = false;
let tickTimeoutId;

function start() {
  console.log(`Javascript kører`);
  document.addEventListener("keydown", handleKeyPress);

  createSnake();

  initModel(GRID_ROWS, GRID_COLS);

  createBoard();

  // start ticking
  tick();
}

function tick() {
  // setup next tick
  if (!isGameOver) {
    tickTimeoutId = setTimeout(tick, 500);
  }

  let currentSnakeBodyPart = snake.head;

  const head = {
    row: snake.tail.data.row,
    col: snake.tail.data.col,
  };

  while (currentSnakeBodyPart !== null) {
    writeToCell(currentSnakeBodyPart.data.row, currentSnakeBodyPart.data.col, 0);
    currentSnakeBodyPart = currentSnakeBodyPart.next;
  }

  moveSnake(head);

  snake.enqueue(head);

  snake.dequeue();

  currentSnakeBodyPart = snake.head;

  while (currentSnakeBodyPart !== null) {
    writeToCell(currentSnakeBodyPart.data.row, currentSnakeBodyPart.data.col, 1);
    currentSnakeBodyPart = currentSnakeBodyPart.next;
  }

  // display the model in full
  displayBoard();

  if (isGameOver) {
    clearTimeout(tickTimeoutId);
    loseGame();
  }
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
}

// #endregion controller

// ****** MODEL ******
// #region model
let model;

let snake;

let direction = "right";

function createSnake() {
  let newSnake = new Queue();
  newSnake.enqueue({
    row: Math.floor(GRID_ROWS / 2),
    col: Math.floor(GRID_COLS / 2),
  });
  newSnake.enqueue({
    row: Math.floor(GRID_ROWS / 2),
    col: Math.floor(GRID_COLS / 2) - 1,
  });
  newSnake.enqueue({
    row: Math.floor(GRID_ROWS / 2),
    col: Math.floor(GRID_COLS / 2) - 2,
  });

  snake = newSnake;
}

function moveSnake(head) {
  switch (direction) {
    case "up":
      {
        head.row--;
        if (head.row < 0) {
          isGameOver = true;
        }
      }
      break;
    case "down":
      {
        head.row++;
        if (head.row > GRID_ROWS - 1) {
          isGameOver = true;
        }
      }
      break;
    case "left":
      {
        head.col--;
        if (head.col < 0) {
          isGameOver = true;
        }
      }
      break;
    case "right":
      {
        head.col++;
        if (head.col > GRID_COLS - 1) {
          isGameOver = true;
        }
      }
      break;
  }
}

function initModel(rows, cols) {
  const newGrid = Array(rows);

  for (let row = 0; row < newGrid.length; row++) {
    newGrid[row] = Array(cols).fill(0);
  }

  model = newGrid;
}

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// #endregion model

// ****** VIEW ******
// #region view

function createBoard() {
  const grid = document.querySelector("#grid");

  grid.style.setProperty("--GRID_COLUMNS", GRID_COLS);

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
    }
  }
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const index = row * GRID_COLS + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

function loseGame() {
  document.querySelector("#game-status").innerHTML = "You lost!";
  document.removeEventListener("keydown", handleKeyPress);
}

// #endregion view
