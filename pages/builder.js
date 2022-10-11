import {useState} from 'react'
import CanvasContainer from '../components/Canvas/CanvasContainer'
import SumbitCard from '../components/SumbitCard'

const builder = () => {

    const [formOpen, toggleForm] = useState(false);
    const [cells, updateCells] = useState([]);

    const openForm = (canvasCells) => {
        toggleForm(!formOpen);
        updateCells(canvasCells);
    }

    const updateCanvas = () => {
        updateCells()
    }

    async function addPresetHandler(data){
        const response = await fetch('/api/new-preset', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
    }

    const closeForm = () => {
        toggleForm(!formOpen);
    }

    return (
        <div>
            {formOpen &&<SumbitCard cells={cells}onSubmit={addPresetHandler} onClose={closeForm}/>}

            {!formOpen &&
            <div>
                <CanvasContainer openForm={openForm} showButtons={true}/>
            </div>}
        </div>
    )
}

export default builder
