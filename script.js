const GRID_SIZE = 20;
const CELL_SIZE = 20;
const DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE,
    rotation: 270
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE,
    rotation: 90
  }
};

const OBJECT_TYPE = {
  BLANK: 'blank',
  WALL: 'wall',
  DOT: 'dot',
  BLINKY: 'blinky',
  PINKY: 'pinky',
  INKY: 'inky',
  CLYDE: 'clyde',
  PILL: 'pill',
  PACMAN: 'pacman',
  GHOST: 'ghost',
  SCARED: 'scared',
  GHOSTLAIR: 'lair'
};

// Lookup array for classes
const CLASS_LIST = [
  OBJECT_TYPE.BLANK,
  OBJECT_TYPE.WALL,
  OBJECT_TYPE.DOT,
  OBJECT_TYPE.BLINKY,
  OBJECT_TYPE.PINKY,
  OBJECT_TYPE.INKY,
  OBJECT_TYPE.CLYDE,
  OBJECT_TYPE.PILL,
  OBJECT_TYPE.PACMAN,
  OBJECT_TYPE.GHOSTLAIR
];

// prettier-ignore
const BOARD = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
  1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1,
  0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0,
  0, 0, 0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0,
  1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1,
  0, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2, 2, 2, 0, 0, 0, 0,
  1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1,
  0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0,
  0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0,
  1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1,
  1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];


//Gameboard
class GameBoard {

  createGrid(board, layout) {
    this.grid = [];
    layout.style.cssText = `grid-template-columns: repeat(${GRID_SIZE},${CELL_SIZE}px);`;
    board.forEach((item) => {
      let div = document.createElement('div');
      div.classList.add('square', CLASS_LIST[item]);
      if (item == 2)
        div.style.cssText = `width: 40%; height: 40%;`
      else if (item == 7)
        div.style.cssText = `width: 60%; height: 60%;`
      else
        div.style.cssText = `width: 80%; height: 80%;`
      layout.appendChild(div);
      this.grid.push(div);
    });

  }

  addClass = (position, classes) => {
    this.grid[position].classList.add(...classes);
  }

  removeClass = (position, classes) => {
    this.grid[position].classList.remove(...classes);
  }

  objectExist = (position, classes) => {
    return this.grid[position].classList.contains(...classes);
  }

  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }
};

//Pacman
class Pacman {
  constructor(speed, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = 0;
    this.rotation = 0;
  }

  shouldMove() {
    if (!this.dir)
      return false;
    if (this.timer === this.speed) {
      this.timer = 0;
      return true; 
    }
    this.timer++;
  }

  getNextMove(objectExist) {
    let nextMove = this.pos + this.dir.movement;
    if (objectExist(nextMove, OBJECT_TYPE.WALL) ||
      objectExist(nextMove, OBJECT_TYPE.GHOSTLAIR)) 
    {
      nextMove = this.pos;
    }
    return {
      nextMove,
      direction: (void 0).pos
    };
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return {
      classesToRemove,
      classesToAdd
    };
  }

  setNewPos(nextMovePos) {
    this.pos = nextMovePos;
  }

  handleKeyInput(e, objectExist,addClass,removeClass) {
    let dir = DIRECTIONS[e.key];
    if (e.keyCode >= 37 && e.keyCode <= 40){
      
      const nextMovePos = this.pos + dir.movement;

      removeClass(this.pos,[OBJECT_TYPE.PACMAN]);

      switch(e.keyCode){
        //left key
        case 37: 
                if(this.pos % GRID_SIZE !== 0 && !objectExist(nextMovePos, [OBJECT_TYPE.WALL]) && !objectExist(nextMovePos, [OBJECT_TYPE.GHOSTLAIR]))
                    this.pos = nextMovePos;
                break;
        //up key
        case 38:
                if(nextMovePos >= 0 && !objectExist(nextMovePos, [OBJECT_TYPE.WALL]) && !objectExist(nextMovePos, [OBJECT_TYPE.GHOSTLAIR]))
                    this.pos = nextMovePos;
                break;
        //right key
        case 39:
                if(this.pos % GRID_SIZE != GRID_SIZE - 1 && !objectExist(nextMovePos, [OBJECT_TYPE.WALL]) && !objectExist(nextMovePos, [OBJECT_TYPE.GHOSTLAIR]))
                    this.pos = nextMovePos;
                break;
        //down key
        case 40:
                if(nextMovePos <= 459 && !objectExist(nextMovePos, [OBJECT_TYPE.WALL]) && !objectExist(nextMovePos, [OBJECT_TYPE.GHOSTLAIR]))
                    this.pos = nextMovePos;
                break;
      }

      addClass(this.pos,[OBJECT_TYPE.PACMAN]);
    }
  }
}









let flag = 0;
const gameBox = document.querySelector('.game-box');
var gameBoard = new GameBoard();
gameBoard.createGrid(BOARD, gameBox);
gameBox.classList.add('flip');

function startGame() {

  if (flag == 0) {
    document.querySelector("h2").style.display = 'none';
    //start();
    flag = 1;
    gameBoard.addClass(290, [OBJECT_TYPE.PACMAN]);

  }
  const pacman = new Pacman(2, 290);
  document.addEventListener('keydown', (e) => {
    pacman.handleKeyInput(e, gameBoard.objectExist,gameBoard.addClass,gameBoard.removeClass);
  })
}

document.addEventListener('click', startGame);