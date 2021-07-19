const express = require('express');
const { v4: uuidv4 } = require ('uuid');
const router = express.Router();


const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
})

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts[`${req.params.id}`]);
})

router.route('/concerts').post((req, res) => {
    const date = {
        id: uuidv4(),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    }
    db.concerts.push(date);
    res.json({ message: 'Ok'});
})

router.route('/concerts/:id').put((req, res) => {
    db.concerts[req.params.id].performer = req.body.performer;
    db.concerts[req.params.id].genre = req.body.genre;
    db.concerts[req.params.id].price = req.body.price;
    db.concerts[req.params.id].day = req.body.day;
    db.concerts[req.params.id].image = req.body.image;
    res.json({ message: 'Ok'});
})

router.route('/concerts/:id').delete((req, res) => {
    db.concerts.slice(`${req.params.id}`, 1);
    res.json({ message: 'Ok'});
})

module.exports = router;