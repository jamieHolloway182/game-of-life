import PresetCard from './PresetCard'
import { useEffect } from 'react';

const PresetList = ({presets, decrypt, pageNum}) => {

    return (
        <div>
            {presets.length > 0 ? presets.map((preset, index) => (
                (index >= (pageNum - 1) * 5 && index < pageNum * 5) ?
                <PresetCard key={preset.id} id={preset.id} name={preset.name} date={preset.date} views={preset.views} likes={preset.likes} dislikes={preset.dislikes} description={preset.description} cells={decrypt(preset.cells)}/>
                : ""
            )): <p style = {{textAlign: 'center'}}>No Presets Found...</p>}
        </div>
    )
}

export default PresetList
