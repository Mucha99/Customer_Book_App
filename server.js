const express = require('express');
const cors = require('cors');
const path = require('path');

const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// endpoints
app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

// error middleware
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...'})
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});