const express = require('express')
const router= express.Router()
const fs = require('fs-extra')
const path = require('path')

router.route('/:id')
    .get(async (req, res) => {

        let playerDetails;

        try {
            playerDetails = await fs.readJson(path.join(__dirname, '../data/playerProfile/' + req.params.id + '.json'));
        } catch (err) {
            console.error(err)
        }
        const playerObject = playerDetails.player.seasons.filter((item) => item.year === 2019 && item.type === 'REG')
        return res.json(playerObject)
    })

module.exports = router;