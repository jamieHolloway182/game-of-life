import Canvas from "./Canvas"
import CanvasButtons from "./CanvasButtons"
import { useState, useEffect } from "react"

const CanvasContainer = ({openForm}) => {

    const [canvasDimensions, updateDimensions] = useState([100, 50])
    const [cellSize, updateCellSize] = useState(10);
    const [cells, updateCells] = useState(Array(canvasDimensions[1]).fill(Array(canvasDimensions[0]).fill(false)));
    const [running, start] = useState(false);
    const [intervalSecs, changeInterval] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            if (running){
                update();
            }
        }, intervalSecs);
        return () => clearInterval(interval);
    });

    const onCanvasClick = (x, y) => {
        updateCells(cells.map((elem, yIndex) => elem.map((cell, xIndex) => xIndex == x && yIndex == y ? !cells[y][x] : cells[yIndex][xIndex])));
    }

    const startRunning = () =>{
        start(true)
    }

    const stopRunning = () =>{
        start(false)
    }

    const update = () => {
        updateCells(cells.map((elem, yIndex) => elem.map((cell, xIndex) => check(xIndex, yIndex))));
    }

    const updateInterval = (value) => {
        changeInterval(1000 / value);
        console.log(value)
    }

    const check = (x, y) => {
        let num = getNumAround(x, y);
        if (cells[y][x]) {
            if (!(num == 3 || num == 2)) {
                return false;
            }
        }else {
            if (num == 3) {
                return true;
            }
        }
        return cells[y][x];
    } 

    const getNumAround = (xC, yC) => {
        let num = 0
        for (let x = xC - 1; x <= xC + 1; x ++) {
            for (let y = yC - 1; y <= yC + 1; y ++){
                if (!(x == xC && y == yC)){
                    if (x >= 0 && x < canvasDimensions[0] && y >= 0 && y< canvasDimensions[1]) {
                        if (cells[y][x]) {
                            num = num + 1
                        }
                    }
                }
            }
        }
        return num
    }

    return (
        <div>
            <CanvasButtons onRun={startRunning} onPause={stopRunning} onSlide={updateInterval} openForm={openForm}/>
            <Canvas cells={cells} canvasDimensions={canvasDimensions} cellSize={cellSize} onClick={onCanvasClick}/>
        </div>
    )
}

export default CanvasContainer
