const express = require('express')
const router= express.Router()
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')
require('dotenv').config()
const apiKey = process.env.API_KEY

router.route('/:id')
    .get(async (req, res) => {
        console.log("playerProfile")
        let playerDetails;

        try {
            // player profile
            // playerDetails = await fs.readJson(path.join(__dirname, '../data/playerProfile/' + req.params.id + '.json'));
            playerDetails = await axios.get('http://api.sportradar.us/mlb/trial/v7/en/players/' + req.params.id + '/profile.json?api_key=' + apiKey)
        } catch (err) {
            console.error(err)
        }
        console.log(playerDetails)
        // const playerObject = playerDetails.player.seasons.filter((item) => item.year === 2019 && item.type === 'REG')
        const playerObject = playerDetails.data.player.seasons.filter((item) => item.year === 2019 && item.type === 'REG')
        return res.json(playerObject)
    })

module.exports = router;