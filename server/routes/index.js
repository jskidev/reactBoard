require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
var express = require('express');
const CONNECTION = process.env.CONNECTION;
const CONNECTION2 = process.env.CONNECTION2;
const CONNECTION3 = process.env.CONNECTION3;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://"+CONNECTION+":"+CONNECTION2+"@cluster0.jdz5p.mongodb.net/"+CONNECTION3+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var router = express.Router();
client.connect();

router.post('/api/create', async function(req, res) {
    const id = uuidv4();
    const sid = uuidv4();
    if(req.body['participants'].length){
        for(var i = 0 ; i < req.body['participants'].length ; i ++){
            req.body['participants'][i].name = sanitizeString(req.body['participants'][i].name);
            req.body['participants'][i].score = sanitizeString(req.body['participants'][i].score.toString());
        }
    }
    //await client.connect();
    const db = client.db("leadtheboard");
    const col = db.collection("boards");
    let docToInsert = {
        id: id,
        sid: sid,
        title: sanitizeString(req.body['boardName']),
        description: sanitizeString(req.body['boardDescription']),
        participants: req.body['participants']
    }
    const myDoc = await col.insertOne(docToInsert)
    .then(result=>{
        res.json(result)
    })
})

router.get('/api/view/:id', async function(req, res) {
    //await client.connect();
    const db = client.db("leadtheboard");
    const col = db.collection("boards");
    const myDoc = await col.find({"id":req.params.id}).toArray(function(err, documents) {
        if (err) throw error;
        res.json(documents);
    });
});

router.post('/api/edit/:id', async (req, res) => {
    //await client.connect();
    const db = client.db("leadtheboard");
    const col = db.collection("boards");
    if(req.body['participants'].length){
        for(var i = 0 ; i < req.body['participants'].length ; i ++){
            req.body['participants'][i].name = sanitizeString(req.body['participants'][i].name);
            req.body['participants'][i].score = sanitizeString(req.body['participants'][i].score.toString());
        }
    }
    var o_id = new ObjectId.ObjectID(req.body.id);
    const myDoc = await col.updateOne(
        {'_id': o_id}, 
        {
            $set: { title: req.body.boardName, description: req.body.boardDescription, participants: req.body.participants }
        }
        ).then(result=>{
            res.json(result);
    })
});

router.get('/api/board/:id', async function(req, res) {
    //await client.connect();
    const db = client.db("leadtheboard");
    const col = db.collection("boards");
    const myDoc = await col.find({"sid":req.params.id}).toArray(function(err, documents) {
        if (err) throw error;
        res.json(documents);
    });
});

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

module.exports = router;