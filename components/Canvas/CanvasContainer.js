import Canvas from "./Canvas"
import CanvasButtons from "./CanvasButtons"
import { useState, useEffect } from "react"

const CanvasContainer = ({openForm, showButtons}) => {

    const [canvasDimensions, updateDimensions] = useState([1000, 500]);
    const [displayDimensions, updateDisplayDimensions] = useState([100, 50])
    const [cellSize, updateCellSize] = useState(10);
    const [cells, updateCells] = useState(Array(canvasDimensions[1]).fill(Array(canvasDimensions[0]).fill('a')));
    const [running, start] = useState(false);
    const [intervalSecs, changeInterval] = useState(10);
    const [originalCells, updateOriginalCells] = useState(cells);
    const [generationNumber, updateGeneration] = useState(0);
    const [populationSize, updatePopulation] = useState(0);

    const isUpperCase = (string) => /^[A-Z]*$/.test(string)

    useEffect(() => {

        const interval = setInterval(() => {
            let num = Math.min(100, Math.floor((window.visualViewport.width - 50) /cellSize));
            updateDisplayDimensions([num, displayDimensions[1]]);
            if (running){
                update();
            }
        }, intervalSecs);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        window.onresize = () => {
            let num = Math.min(100, Math.floor((window.visualViewport.width - 50) /cellSize));
            updateDisplayDimensions([num, 50]);
            console.log(displayDimensions);
        }
    }, [])

    const submitCells = () => {
        openForm(originalCells);
    }

    const onCanvasClick = (x, y) => {
        if (!running) {
            updateCells(cells.map((elem, yIndex) => elem.map((cell, xIndex) => xIndex == x && yIndex == y ? isUpperCase(cells[y][x]) ? cells[y][x].toLowerCase() : cells[y][x].toUpperCase() : cells[yIndex][xIndex])));
            if (isUpperCase(cells[y][x])) {
                updatePopulation(populationSize - 1);
            }else {
                updatePopulation(populationSize + 1);
            }
            updateOriginalCells(cells);
        }
    }

    const startRunning = () =>{
        start(true);
    }

    const stopRunning = () =>{
        start(false);
    }

    const resetCanvas = () => {
        updateCells(cells.map((elem) => elem.map(() => 'a')));
        updateGeneration(0);
        updatePopulation(0);
        start(false);
    }

    const step = () => {
        update();
    }

    const update = () => {
        updateCells(cells.map((elem, yIndex) => elem.map((cell, xIndex) => check(xIndex, yIndex))));
        updateGeneration(generationNumber + 1);
        let count = 0;
        cells.forEach((elem) => elem.forEach((cell) => {if(isUpperCase(cell)){
            count++;
        }}));
        updatePopulation(count);
    }

    const updateInterval = (value) => {
        changeInterval(1000 / value);
    }

    const check = (x, y) => {
        let num = getNumAround(x, y);
        let cell = cells[y][x];
        if (isUpperCase(cell)) {
            if (!(num == 3 || num == 2)) {
                return cell.toLowerCase();
            }
        }else {
            if (num == 3) {
                return cell.toUpperCase();
            }
        }
        return cell;
    } 

    const getNumAround = (xC, yC) => {
        let num = 0
        for (let x = xC - 1; x <= xC + 1; x ++) {
            for (let y = yC - 1; y <= yC + 1; y ++){
                if (!(x == xC && y == yC)){
                    if (x >= 0 && x < canvasDimensions[0] && y >= 0 && y< canvasDimensions[1]) {
                        if (isUpperCase(cells[y][x])) {
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
            <CanvasButtons onRun={startRunning} onPause={stopRunning} onSlide={updateInterval} reset={resetCanvas} step={step} openForm={submitCells} gen={generationNumber} pop={populationSize}/>
            <Canvas cells={cells} displayDimensions={displayDimensions} cellSize={cellSize} onClick={onCanvasClick}/>
        </div>
    )
}

export default CanvasContainer
