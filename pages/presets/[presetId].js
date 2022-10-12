import { useEffect, useState } from "react";
import PresetCanvasContainer from "../../components/Canvas/PresetCanvasContainer";
import { MongoClient, ObjectId } from "mongodb";

var client = "";
var Id = ""

const PresetDisplay = (props) => {

    return (
        <div>
            <PresetCanvasContainer preset = {props.presetData}/>  
        </div>
    )
}

export default PresetDisplay

async function connectToDatabase(){
    client = await MongoClient.connect('mongodb+srv://jamieholloway:tvM06MwAzvtsM8TE@cluster0.nfbha.mongodb.net/presets?retryWrites=true&w=majority');
    const db = client.db();
    return db.collection('presets');
}


export async function getStaticPaths(){

    const presetsCollections = await connectToDatabase();
    const presets = await presetsCollections.find({}, {_id: 1}).toArray();

    client.close()

    return {
        paths : presets.map((preset) => ({
            params: {presetId: preset._id.toString()}
        })),
        fallback : false
    };
}

export async function getStaticProps(context){

    const presetId = context.params.presetId;
    Id = presetId

    const presetsCollections = await connectToDatabase();
    
    await presetsCollections.updateOne({_id : ObjectId(presetId)}, {$inc: {
        views: 1
    }})

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
        },
        revalidate: 10
    };
}