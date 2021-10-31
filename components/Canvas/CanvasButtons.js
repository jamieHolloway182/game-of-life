import Button from './Button'
import Link from 'next/link'

const CanvasButtons = ({openForm, onRun, onPause, onSlide, reset, step}) => {

    const onChange = (event) => {
        onSlide(event.target.value)
    }

    return (
        <div style={{display:'flex'}}>
            <Button text="Run" onClick={onRun}/>
            <Button text="Pause" onClick={onPause}/>
            <Button text="Submit" onClick={openForm}/>
            <input type="range" min="1" max="100" onChange={onChange}></input>
            <Button text="Reset" onClick={reset}/>
            <Button text="Step" onClick={step}/>
            <Link href="/presets">
                <Button text="Presets"/>
            </Link>
        </div>
    )
}

export default CanvasButtons
