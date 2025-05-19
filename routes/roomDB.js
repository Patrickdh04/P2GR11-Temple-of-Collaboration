//Note - Tilfoej flere kommentarer til DB del af projektet
const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.post('/room', async (req, res) => {
    const { password, action } = req.body;

    if (!password || password.length !== 4) {
        return res.status(400).send('Password must be 4 letters.');
    }

    try {
        let room = await Room.findOne({ password }); // Check if room exists

        if (action === 'create') {
            if (room) {
                return res.status(400).send('Room already exists. Try a different code.');
            }

            room = new Room({ password }); // Create new room
            await room.save();
            return res.redirect(`/puzzle1/puz1_player1?room=${password}`);
        }

        if (action === 'join') {
            if (!room) {
                return res.status(404).send('Room not found. Please ask the creator to generate it first.');
            }

            return res.redirect(`/puzzle1/puz1_player2?room=${password}`);
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;