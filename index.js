const express = require('express');
const app = express();

const port = process.env.PORT || 6780;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config/dbClient');
const client = new MongoClient(dbConfig.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(err => {
    if (err) return console.log(err)
    console.log("Database Connected successfully");
    client.close();
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome'));
require('./app/routes/contact.routes')(app);


app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`)
});

module.exports = app;