import {useState} from 'react'
import CanvasContainer from '../components/Canvas/CanvasContainer'
import SumbitCard from '../components/SumbitCard'

const builder = () => {

    const [formOpen, toggleForm] = useState(false);

    const openForm = () => {
        toggleForm(!formOpen)
    }

    const updateCanvas = () => {
        updateCells()
    }

    const addToPresets = (data) => {
        console.log(data);
    }

    return (
        <div>
            {formOpen &&<SumbitCard cells={defaultCells} onSubmit={addToPresets}/>}

            {!formOpen &&
            <div>
                <CanvasContainer openForm={openForm}/>
            </div>};
        </div>
    )
}

export default builder
