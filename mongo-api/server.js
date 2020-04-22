const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

let accessPort = "3000";

if(process.env.NODE_ENV === 'production'){
    accessPort = process.env.PORT
}
console.log("accessPort = " + accessPort);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:" + accessPort); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/scores', require('./routes/scores'));

app.use(express.static('../game/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'game', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8181;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));