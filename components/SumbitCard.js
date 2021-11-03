import SumbitCardStyles from '../styles/SubmitCard.module.css'
import Canvas from './Canvas/Canvas'
import { useState, useRef } from 'react'

const SumbitCard = ({cells, onSubmit, onClose}) => {
    const nameRef = useRef();
    const authorRef = useRef();
    const descriptionRef = useRef();

    const submit = (event) => {
        event.preventDefault();

        const nameInput = nameRef.current.value;
        const authorInput = authorRef.current.value;
        const descriptionInput = descriptionRef.current.value;

        const submitData = {
            name : nameInput,
            author : authorInput,
            description : descriptionInput
        }

        onSubmit(submitData);
    }

    const [canvasDimensions, updateDimensions] = useState([92, 30]);
    const [cellSize, updateCellSize] = useState(5);

    return (
        <div className={SumbitCardStyles.container}>
            <div className={SumbitCardStyles.card}>
                <h4>Sumbit Configuration:</h4>
                <form>
                    <input type = "text" placeholder="Configuration Name..." ref={nameRef}></input>
                    <input type = "text" placeholder="Configuratuon Author..." ref={authorRef}></input>
                    <textarea maxLength={300} placeholder="Configuration Description..." ref={descriptionRef}></textarea>
                </form>
                <Canvas cells={cells} canvasDimensions={canvasDimensions} cellSize={cellSize}/>
                <button onClick={submit}>Submit</button>
            </div>
            <button onClick={onClose}>Return</button>
        </div>
        
    )
}

export default SumbitCard
