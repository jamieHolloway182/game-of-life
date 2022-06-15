import {MongoClient} from 'mongodb';

async function addPresetHandler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://jamieholloway:tvM06MwAzvtsM8TE@cluster0.nfbha.mongodb.net/presets?retryWrites=true&w=majority');
        const db = client.db();

        const presetsCollections = db.collection('presets');

        const result = await presetsCollections.insertOne(data);

        client.close()

        res.status(201);
    }
}

export default addPresetHandler