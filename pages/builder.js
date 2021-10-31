import {useState} from 'react'
import CanvasContainer from '../components/Canvas/CanvasContainer'
import SumbitCard from '../components/SumbitCard'

const builder = () => {

    const [formOpen, toggleForm] = useState(false);
    const [cells, updateCells] = useState([]);

    const openForm = (canvasCells) => {
        toggleForm(!formOpen);
        updateCells(canvasCells);
        console.log(canvasCells);
    }

    const updateCanvas = () => {
        updateCells()
    }

    const addToPresets = (data) => {
        console.log(data);
    }

    return (
        <div>
            {formOpen &&<SumbitCard cells={cells}onSubmit={addToPresets}/>}

            {!formOpen &&
            <div>
                <CanvasContainer openForm={openForm}/>
            </div>};
        </div>
    )
}

export default builder
