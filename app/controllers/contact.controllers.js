const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../../config/dbClient');
const client = new MongoClient(dbConfig.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db

client.connect(err => {
    if (err) return console.log(err)
    db = client.db("test");
    client.close();
});

exports.show_contact = (req, res) => {
    db.collection('contact').find().toArray().then((result) => {
            res.status(200)
                .send({
                    status: true,
                    result: result,
                    error: null
                })
            console.log(result)
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })
}

exports.add_contact = (req, res) => {
    const contact = {
        'name': req.body.name,
        'picture': req.body.picture,
        'phoneNumber': req.body.phoneNumber,
        'address': req.body.address
    }

    db.collection('contact').insertOne(contact).then(result => {
            res.status(200)
                .send({
                    status: true,
                    result: result.ops,
                    error: null
                })
            console.log(result.ops)
            console.log("Data tersimpan")
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })
}

exports.edit_contact = (req, res) => {
    const contact = {
        'name': req.body.name,
        'picture': req.body.picture,
        'phoneNumber': req.body.phoneNumber,
        'address': req.body.address
    }

    db.collection('contact')
        .findOneAndUpdate({
            name: contact.name
        }, {
            $set: contact
        }, {
            sort: {
                _id: -1
            },
            upsert: true
        }).then(result => {
            res.status(200)
                .send({
                    status: true,
                    result: result,
                    error: null
                })
            console.log(result)
            console.log("Data diubah")
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })
}

exports.delete_contact = (req, res) => {
    db.collection('contact').findOneAndDelete({
            name: req.body.name
        })
        .then(result => {
            res.status(200)
                .send({
                    status: true,
                    result: result,
                    error: null
                })
            console.log(result)
            console.log("Data dihapus")
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })
}

exports.search_contact = (req, res) => {
    const tekscari = req.body.text;

    db.collection('contact').find({
            $or: [{
                name: new RegExp(tekscari, 'i')
            }, {
                phoneNumber: new RegExp(tekscari, 'i')
            }]
        }).toArray().then((result) => {
            res.status(200)
                .send({
                    status: true,
                    result: result,
                    error: null
                })
            console.log("Hasil Pencarian")
            console.log(result)
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })

}