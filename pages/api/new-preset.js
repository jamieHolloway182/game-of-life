import {MongoClient} from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log("hey")
        const client = await MongoClient.connect('mongodb+srv://jamieholloway:tvM06MwAzvtsM8TE@cluster0.nfbha.mongodb.net/presets?retryWrites=true&w=majority');
        const db = client.db();
        
        const presetsCollections = db.collection('presets');
        console.log(presetsCollections)
        
        const result = await presetsCollections.insertOne(data);
        console.log(result)

        client.close()

        res.status(201);
    }
}

export default handler