const express = require('express');
const { v4: uuidv4 } = require ('uuid');
const router = express.Router();


const db = require('../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
})

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats[`${req.params.id}`]);
})

router.route('/seats').post((req, res) => {
    const date = {
        id: uuidv4(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    }
    db.seats.push(date);
    res.json({ message: 'Ok'});
})

router.route('/seats/:id').put((req, res) => {
    db.seats[req.params.id].day = req.body.day;
    db.seats[req.params.id].seat = req.body.seat;
    db.seats[req.params.id].client = req.body.client;
    db.seats[req.params.id].email = req.body.email;
    res.json({ message: 'Ok'});
})

router.route('/seats/:id').delete((req, res) => {
    db.seats.slice(`${req.params.id}`, 1);
    res.json({ message: 'Ok'});
})

module.exports = router;