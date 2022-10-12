import Canvas from "./Canvas"
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";


const PresetCanvasContainer = ({preset}) => {

    const [canvasDimensions, updateDimensions] = useState([100, 50]);
    const [displayDimensions, updateDisplayDimensions] = useState([100, 50])
    const [cellSize, updateCellSize] = useState(10);
    const Id = useRouter().query.presetId;

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

    async function updateLikesHandler(){
        const response = await fetch('/api/update-likes', {
            method: "POST",
            body: JSON.stringify(Id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
    }

    async function updateDislikesHandler(){
        const response = await fetch('/api/update-dislikes', {
            method: "POST",
            body: JSON.stringify(Id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
    }

    return (
        <div>
            <div>
                {"Name: " + preset.name + "    Views: " + preset.views + "    Likes: " + preset.likes + "    Dislikes: " + preset.dislikes + "    Date Created: " + preset.date}
                <button onClick={updateLikesHandler}>Like</button>
                <button onClick={updateDislikesHandler}>Dislike</button>
            </div>
            <Canvas cells={decryptCells(preset.cells)} displayDimensions={displayDimensions} cellSize={cellSize} onClick={() => {}}/>
        </div>
    )
}

export default PresetCanvasContainer