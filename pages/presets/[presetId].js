import { useState } from "react";
import Canvas from "../../components/Canvas/Canvas";

const RunPreset = () => {

    const [canvasDimensions, updateDimensions] = useState([100, 50])
    const [cellSize, updateCellSize] = useState(10);
    const [defaultCells, updateCells] = useState(Array(canvasDimensions[0] * canvasDimensions[1]).fill(true));

    return (
        <div>
            <Canvas cells={defaultCells} canvasDimensions={canvasDimensions} cellSize={cellSize}/>
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