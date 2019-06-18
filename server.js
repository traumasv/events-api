import express from 'express';
const app = express();
const path = require('path');
const bodyParser = require('bodyParser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended:false}));

app.get('/register', function(){
    const html = path.resolve(__dirname, 'index.html');
    res.sendFile(html);
});

app.get('/login', function(){
    const html = path.resolve(__dirname, 'index.html');
    res.sendFile(html);
});

app.get('/getEvents', function(){
    const html = path.resolve(__dirname, 'index.html');
    res.sendFile(html);
});

app.get('/setPreferences', function(){
    const html = path.resolve(__dirname, 'index.html');
    res.sendFile(html);
});

app.listen(process.env.port || 3000, function(){
    console.log('server started');
});