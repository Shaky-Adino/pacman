import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from "./index";

class GameBoard{
   
    static createGrid(board,layout){
        layout.style.cssText = `grid-template-columns: repeat(${GRID_SIZE},${CELL_SIZE}px);`
        board.foreach((item)=>{
            const div = document.createElement('div');
            div.classList.add('square', CLASS_LIST[item]);
            div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`
            layout.appendChild(div);

        })
    }
   
}

export default GameBoard;