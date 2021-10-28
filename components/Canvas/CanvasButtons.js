import Button from './Button'

const CanvasButtons = ({openForm, onRun, onPause, onSlide}) => {

    const onChange = (event) => {
        onSlide(event.target.value)
    }

    return (
        <div style={{display:'flex'}}>
            <Button text="Run" onClick={onRun}/>
            <Button text="Pause" onClick={onPause}/>
            <Button text="Submit" onClick={openForm}/>
            <input type="range" min="1" max="100" onChange={onChange}></input>
        </div>
    )
}

export default CanvasButtons
