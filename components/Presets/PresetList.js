import PresetCard from './PresetCard'

const PresetList = ({presets}) => {
    return (
        <div>
            {presets.length > 0 ? presets.map((preset, index) => (
                <PresetCard key={preset.id} id={preset.id} name={preset.name} date={preset.date} views={preset.views} likes={preset.views} dislikes={preset.dislikes} description={preset.description}/>
            )): <p style = {{textAlign: 'center'}}>No Presets Found...</p>}
        </div>
    )
}

export default PresetList
