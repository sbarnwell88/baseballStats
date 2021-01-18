const express = require('express')
const router= express.Router()
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')
require('dotenv').config()
const apiKey = process.env.API_KEY

router.route('/')
    .get(async (req, res) => {

        let teams = [];
        let leagueSchedule;

        // USING JSON FILES
        try {
            leagueSchedule = await fs.readJson(path.join(__dirname, '../data/leagueSchedule.json'));
        } catch (err) {
            console.error(err)
        }
        
        leagueSchedule.games.forEach((item) => teams.push({team: item.home.name, id: item.home.id}))
        const uniqueArray = teams.filter((item, index) => teams.findIndex(obj => obj.team === item.team) === index)

        // MAKING REAL API CALLS
        // try {
        //     leagueSchedule = await axios.get('http://api.sportradar.us/mlb/trial/v7/en/games/2019/REG/schedule.json?api_key=' + apiKey)
        // } catch (err) {
        //     console.error(err)
        // }
        
        // leagueSchedule.data.games.forEach((item) => teams.push({team: item.home.name, id: item.home.id}))
        // const uniqueArray = teams.filter((item, index) => teams.findIndex(obj => obj.team === item.team) === index)

        return res.json(uniqueArray)
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