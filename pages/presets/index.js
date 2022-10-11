import PresetList from "../../components/Presets/PresetList"
import PageNav from "../../components/Presets/PageNav"
import presetPageStyle from '../../styles/Presets/Presets.module.css'
import {useState} from 'react'
import {MongoClient} from 'mongodb'

const presets = (props) => {
    const [numPerPage, updateNumPerPage] = useState(5);
    const [pageNumberSelected, updatePageNumber] = useState(1);

    const [presets, filterList] = useState(props.presets.filter((preset, index) => index >= (pageNumberSelected-1) * numPerPage && index < pageNumberSelected * numPerPage));

    const handleInput = (event) => {
        filterList(props.presets.forEach((preset, index) => presets[index] = preset));
        filterList(presets.filter((preset) => preset.name.includes(event.target.value)));
    }

    const switchPage = (newNum) => {
        const pageNumberSelected = newNum;
        filterList(presets.forEach((preset, index) => presets[index] = preset));
        filterList(presets.filter((preset, index) => index >= (pageNumberSelected-1) * numPerPage && index < pageNumberSelected * numPerPage));
        updatePageNumber(pageNumberSelected);
    };

    const decryptCells = (cellsString) => {
        let cells = []
        let num = "";
        for (let i = 0; i < cellsString.length; i++){
            let char = cellsString.charCodeAt(i)
            console.log(char)
            if (char >= 48 && char <= 57){
                num += cellsString[i];
            }else{
                console.log(num, cells)
                cells = [...cells, ...Array(parseInt(num)).fill(cellsString[i])];
                num = "";
            }
        }
        const newArr = [];
        while(cells.length) newArr.push(cells.splice(0,100));
        return newArr;
    }
    
    return (
        <div className={presetPageStyle.container}>
            <PageNav length={Math.ceil(presets.length / numPerPage)} onChange={switchPage} selected ={pageNumberSelected}/>
            <form onInput={handleInput}>
                <input type="textarea" id="searchBox" style = {{margin:'5px'}} placeholder = "Search for preset..."/>
            </form>
            <PresetList presets={presets} decrypt={decryptCells}/>
        </div>
    )
}

export async function getServerSideProps(){

    const client = await MongoClient.connect('mongodb+srv://jamieholloway:tvM06MwAzvtsM8TE@cluster0.nfbha.mongodb.net/presets?retryWrites=true&w=majority');
    const db = client.db();
    const presetsCollections = db.collection('presets');

    const presets = await presetsCollections.find().toArray();

    console.log(presets)

    return {
        props: {
            presets: presets.map((preset) => ({
                name: preset.name,
                author: preset.author,
                cells: preset.cells,
                description: preset.description,
                date: preset.date,
                views: preset.views,
                likes: preset.likes,
                dislikes: preset.dislikes,
                id: preset._id.toString()
            }))
        }
    }
}

export default presets