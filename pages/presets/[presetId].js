import { useState } from "react";
import CanvasContainer from "../../components/Canvas/CanvasContainer";

const RunPreset = () => {

    const [canvasDimensions, updateDimensions] = useState([100, 50])
    const [cellSize, updateCellSize] = useState(10);
    const [defaultCells, updateCells] = useState(Array(canvasDimensions[1]).fill(Array(canvasDimensions[0]).fill('a')));

    return (
        <div>
            <CanvasContainer showButtons={false}/>
        </div>
    )
}

export default RunPreset

export async function getStaticPaths(){
    return {
        paths : [
            {
                params : {
                    presetId : "1"
                }  
            }   
        ],
        fallback : false
    }
}

export async function getStaticProps(context){
    return {
        props : {
            cum : "yeah"
        },
        revalidate : 10
    }
}