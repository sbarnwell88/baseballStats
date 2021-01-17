const express = require('express')
const router= express.Router()
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')
require('dotenv').config()
const apiKey = process.env.API_KEY

router.route('/:id')
    .get(async (req, res) => {

        let playerProfile;

        try {
            // seasonal pitch metrics
            // playerProfile = await fs.readJson(path.join(__dirname, '../data/players/' + req.params.id + '.json'));
            playerProfile = await axios.get('http://api.sportradar.us/mlb/trial/v7/en/players/' + req.params.id + '/pitch_metrics.json?api_key=' + apiKey)
        } catch (err) {
            console.error(err)
        }
        console.log(playerProfile)
        const player = playerProfile.data.player.seasons.filter((item) => item.year === 2019 && item.type === 'REG')
        // const player = playerProfile.player.seasons.filter((item) => item.year === 2019 && item.type === 'REG')
        return res.json(player)
    })

module.exports = router;