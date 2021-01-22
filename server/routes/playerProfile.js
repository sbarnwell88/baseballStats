// const express = require('express')
// const router= express.Router()
// const fs = require('fs-extra')
// const path = require('path')
// const axios = require('axios')
// require('dotenv').config()
// const apiKey = process.env.API_KEY

// router.route('/:id')
//     .get(async (req, res) => {
//         let playerDetails;

//         // USE JSON
//         // try {
//         //     // player profile
//         //     playerDetails = await fs.readJson(path.join(__dirname, '../data/playerProfile/' + req.params.id + '.json'));
//         // } catch (err) {
//         //     console.error(err)
//         // }
//         // const playerObject = playerDetails.player.seasons.filter((item) => item.year === 2019 && item.type === 'REG')

//         // API CALL
//         try {
//             // player profile
//             playerDetails = await axios.get('http://api.sportradar.us/mlb/trial/v7/en/players/' + req.params.id + '/profile.json?api_key=' + apiKey)
//         } catch (err) {
//             console.error(err)
//         }
//         const playerObject = playerDetails.data.player.seasons.filter((item) => item.year === 2019 && item.type === 'REG')
        
//         return res.json(playerObject)
//     })

// module.exports = router;