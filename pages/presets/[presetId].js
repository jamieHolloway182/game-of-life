import { useEffect, useState } from "react";
import PresetCanvasContainer from "../../components/Canvas/PresetCanvasContainer";
import { MongoClient } from "mongodb";

const PresetDisplay = (props) => {

    useEffect(()=> {console.log("YAY: " + props.presetData.id)})

    return (
        <div>
            <PresetCanvasContainer preset = {props.presetData}/>
        </div>
    )
}

export default PresetDisplay

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://jamieholloway:tvM06MwAzvtsM8TE@cluster0.nfbha.mongodb.net/presets?retryWrites=true&w=majority');
    const db = client.db();
    const presetsCollections = db.collection('presets');

    const presets = await presetsCollections.find({}, {_id: 1}).toArray();

    client.close();

    return {
        paths : presets.map((preset) => ({
            params: {presetId: preset._id.toString()}
        })),
        fallback : false
    };
}

export async function getStaticProps(context){

    const presetId = context.params.presetId;

    const client = await MongoClient.connect('mongodb+srv://jamieholloway:tvM06MwAzvtsM8TE@cluster0.nfbha.mongodb.net/presets?retryWrites=true&w=majority');
    const db = client.db();
    const presetsCollections = db.collection('presets');

    let presets = await presetsCollections.find().toArray();

    presets = presets.map((preset) => ({
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

    let selectedPreset;

    presets.forEach((preset) => {if(preset.id == presetId){
        selectedPreset = preset
    }});

    client.close();

    return {
        props : {
            presetData: selectedPreset
        }
    };
}