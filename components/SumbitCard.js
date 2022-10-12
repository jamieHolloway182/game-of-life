import SumbitCardStyles from '../styles/SubmitCard.module.css'
import Canvas from './Canvas/Canvas'
import { useState, useRef } from 'react'

const SumbitCard = ({cells, onSubmit, onClose}) => {
    const nameRef = useRef();
    const authorRef = useRef();
    const descriptionRef = useRef();

    const getDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

        return formattedToday;
    }

    const submit = (event) => {
        event.preventDefault();
        const nameInput = nameRef.current.value;
        const authorInput = authorRef.current.value;
        const descriptionInput = descriptionRef.current.value;
        
        if (nameInput.length > 2 && authorInput.length > 2 && descriptionInput.length > 2){
            const validCells = validateCellsForDatabase(cells);
            const submitData = {
                cells: validCells,
                name : nameInput,
                author : authorInput,
                description : descriptionInput,
                date : getDate(),
                views : 0,
                likes : 0,
                dislikes : 0
            }

            onSubmit(submitData);
            onClose();
        }else{
            alert("Fill out all fields with at least 3 characters")
        }
    }

    const validateCellsForDatabase = (cells) => {
        let arr = [].concat(...cells)
        let encoding = "";

        let count = 1
        let previous = arr[0];
        
        for ( let i = 1; i < arr.length; i++) {
            if (arr[i] !== previous) {
                encoding += count + previous;
                count = 1;
                previous = arr[i];
            } else {
                count++;
            }
        }
        encoding += count + previous;
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
