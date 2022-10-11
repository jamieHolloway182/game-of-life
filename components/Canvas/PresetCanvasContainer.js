import Canvas from "./Canvas"
import { useState } from "react";


const PresetCanvasContainer = ({preset}) => {

    const [canvasDimensions, updateDimensions] = useState([100, 50]);
    const [displayDimensions, updateDisplayDimensions] = useState([100, 50])
    const [cellSize, updateCellSize] = useState(10);

    const decryptCells = (cellsString) => {
        let cells = []
        let num = "";
        for (let i = 0; i < cellsString.length; i++){
            let char = cellsString.charCodeAt(i)
            if (char >= 48 && char <= 57){
                num += cellsString[i];
            }else{
                cells = [...cells, ...Array(parseInt(num)).fill(cellsString[i])];
                num = "";
            }
        }
        const newArr = [];
        while(cells.length) newArr.push(cells.splice(0,100));
        return newArr;
    }

    return (
        <div>
            <Canvas cells={decryptCells(preset.cells)} displayDimensions={displayDimensions} cellSize={cellSize} onClick={() => {}}/>
        </div>
    )
}

export default PresetCanvasContainer