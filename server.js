const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require ('uuid');

const app = express();

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// date
const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

// endpoints 
app.get('/testimonials', (req, res) => {
    res.json(db);
})

app.get('/testimonials/:id', (req, res) => {
    res.json(db[`${req.params.id}`]);
})

app.get('/testimonials/random', (req, res) => {
    const randomID = Math.flor(Math.random() * db.length);
    res.json(db[randomID]);
})

app.post('/testimonials', (req, res) => {
    const date = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
    }
    db.push(date);
    res.json({ message: 'Ok'});
})

app.put('/testimonials/:id', (req, res) => {
    db[req.params.id].author = req.body.author;
    db[req.params.id].text = req.body.text;
    res.json({ message: 'Ok'});
})

app.delete('/testimonials/:id', (req, res) => {
    db.splice(`${req.params.id}`, 1);
	res.json({ message: 'OK' });
})

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...'})
})