import {MongoClient, ObjectId} from 'mongodb';

async function handler(req, res) {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://jamieholloway:tvM06MwAzvtsM8TE@cluster0.nfbha.mongodb.net/presets?retryWrites=true&w=majority');
    const db = client.db();
    
    const presetsCollections = db.collection('presets');
    
    let e = await presetsCollections.updateOne({_id : ObjectId(data)}, {$inc: {
        likes: 1
    }})

    client.close()

    res.status(201);
}

export default handler