const express = require('express')
const router= express.Router()
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')
const { ListItemAvatar } = require('@material-ui/core')
const { red } = require('@material-ui/core/colors')
require('dotenv').config()
const apiKey = process.env.API_KEY

router.route('/')
    .get(async (req, res) => {

        let leagueSchedule;

        // USING JSON FILES
        try {
            leagueSchedule = await fs.readJson(path.join(__dirname, '../data/leagueSchedule.json'));
        } catch (err) {
            console.error(err)
        }
        
        return res.send(leagueSchedule)

        // MAKING REAL API CALLS
        // try {
        //     leagueSchedule = await axios.get('http://api.sportradar.us/mlb/trial/v7/en/games/2019/REG/schedule.json?api_key=' + apiKey)
        // } catch (err) {
        //     console.error(err)
        // }
        
        // return res.json(leagueSchedule.data)
    })

router.route('/:id')
    .get(async (req, res) => {

        let teamProfile;

        // USING JSON FILES
        try {
            teamProfile = await fs.readJson(path.join(__dirname, '../data/teams/' + req.params.id + '.json'));
        } catch (err) {
            console.error(err)
        }
        const players = teamProfile.players.filter((item) => item.position === 'P')

        // API CALL 
        // try {
        //     teamProfile = await axios.get('http://api.sportradar.us/mlb/trial/v7/en/teams/' + req.params.id + '/profile.json?api_key=' + apiKey)
        // } catch (err) {
        //     console.error(err)
        // }
        // const players = teamProfile.data.players.filter((item) => item.position === 'P')

        return res.json(players)
    })

module.exports = router;