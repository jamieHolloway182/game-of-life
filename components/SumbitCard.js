import SumbitCardStyles from '../styles/SubmitCard.module.css'
import Canvas from './Canvas/Canvas'
import { useState, useRef } from 'react'

const SumbitCard = ({cells, onSubmit, onClose}) => {
    const nameRef = useRef();
    const authorRef = useRef();
    const descriptionRef = useRef();

    const submit = (event) => {
        event.preventDefault();
        const validCells = validateCellsForDatabase(cells);
        const nameInput = nameRef.current.value;
        const authorInput = authorRef.current.value;
        const descriptionInput = descriptionRef.current.value;

        const submitData = {
            cells: validCells,
            name : nameInput,
            author : authorInput,
            description : descriptionInput
        }

        onSubmit(submitData);
    }

    const validateCellsForDatabase = (cells) => {
        let arr = [].concat(...cells)
        let encoding = [];

        let count = 1
        let previous = arr[0];
        
        for ( let i = 1; i < arr.length; i++) {
            if (arr[i] !== previous) {
                encoding.push(count, previous);
                count = 1;
                previous = arr[i];
            } else {
                count++;
            }
        }
        encoding.push(count, previous);
        return encoding;
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
                <Canvas cells={cells} displayDimensions={canvasDimensions} cellSize={cellSize}/>
                <button onClick={submit}>Submit</button>
            </div>
            <button onClick={onClose}>Return</button>
        </div>
        
    )
}

export default SumbitCard
