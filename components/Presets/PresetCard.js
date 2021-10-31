import presetCardStyle from '../../styles/Presets/PresetCard.module.css';
import Canvas from '../Canvas/Canvas';
import { useState } from 'react';
import Link from 'next/link';

const PresetCard = ({id, name, date, views, likes, dislikes, description}) => {
    
    const [canvasDimensions, updateDimensions] = useState([50, 15])
    const [cellSize, updateCellSize] = useState(10);
    const [defaultCells, updateCells] = useState(Array(canvasDimensions[0] * canvasDimensions[1]).fill(true));
    const link = "/presets/" + id.toString();

    return (
        <Link href ={link}>
            <div className={presetCardStyle.card}>
                <div className={presetCardStyle.top}>
                    <div className={presetCardStyle.container}>
                        <h3><b>{name +":"}</b></h3>
                        <div className = {presetCardStyle.stats}>
                            <p className = {presetCardStyle.point}>Date Created: {date}</p><br></br>
                            <p>Views: {id}</p>
                            <p>Likes: {likes}</p>
                            <p>Dislikes: {dislikes}</p>
                        </div>
                        <h4>Description:</h4>
                    </div>
                    <div className= {presetCardStyle.canvas}>
                        <Canvas cells={defaultCells} canvasDimensions={canvasDimensions} cellSize={cellSize}/>
                    </div> 
                </div>
                <div className={presetCardStyle.bottom}>
                    <p>{description}</p>
                </div>
            </div>
        </Link> 
        
    )
}
export default PresetCard
