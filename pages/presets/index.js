import PresetList from "../../components/Presets/PresetList"
import PageNav from "../../components/Presets/PageNav"
import presetPageStyle from '../../styles/Presets/Presets.module.css'
import {useState} from 'react'

const presetList = [
    {
        id : 1,
        name : "so cool",
        views : 0,
        likes : 0,
        dislikes : 0,
        date : "date",
        description : "Considered an invitation do introduced sufficient understood instrument it. Of decisively friendship in as collecting at. No affixed be husband ye females brother garrets proceed. Least child who seven happy yet balls young. Discovery sweetness principle discourse shameless bed one excellent. Sentim"
    }
]

const presets = () => {
    const [numPerPage, updateNumPerPage] = useState(5);
    const [pageNumberSelected, updatePageNumber] = useState(1);

    const [presets, filterList] = useState(presetList.filter((preset, index) => index >= (pageNumberSelected-1) * numPerPage && index < pageNumberSelected * numPerPage));

    const handleInput = (event) => {
        filterList(presetList.forEach((preset, index) => presets[index] = preset));
        filterList(presets.filter((preset) => preset.name.includes(event.target.value)));
    }

    const switchPage = (newNum) => {
        const pageNumberSelected = newNum;
        filterList(presetList.forEach((preset, index) => presets[index] = preset));
        filterList(presets.filter((preset, index) => index >= (pageNumberSelected-1) * numPerPage && index < pageNumberSelected * numPerPage));
        updatePageNumber(pageNumberSelected);
    };
    
    return (
        <div className={presetPageStyle.container}>
            <PageNav length={Math.ceil(presetList.length / numPerPage)} onChange={switchPage} selected ={pageNumberSelected}/>
            <form onInput={handleInput}>
                <input type="textarea" id="searchBox" style = {{margin:'5px'}} placeholder = "Search for preset..."/>
            </form>
            <PresetList presets={presets} />
        </div>
    )
}

export default presets
