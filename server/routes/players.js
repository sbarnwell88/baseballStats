const express = require('express')
const router= express.Router()
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')

router.route('/:id')
    .get(async (req, res) => {

        console.log(req.params.id)

        let playerProfile;

        try {
            playerProfile = await fs.readJson(path.join(__dirname, '../data/players/' + req.params.id + '.json'));
        } catch (err) {
            console.error(err)
        }
        const player = playerProfile.player.seasons.filter((item) => item.year === 2019 && item.type === 'REG')
        console.log(player)
        return res.json(player)
    })

module.exports = router;