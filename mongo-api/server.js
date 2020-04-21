const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8181"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('API Running'));

app.use('/scores', require('./routes/scores'));

const PORT = 8181;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));