const express = require('express')
const router= express.Router()
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')

router.route('/')
    .get(async (req, res) => {

        let teams = [];
        let leagueSchedule;

        try {
            leagueSchedule = await fs.readJson(path.join(__dirname, '../data/leagueSchedule.json'));
        } catch (err) {
            console.error(err)
        }
        
        leagueSchedule.games.forEach((item) => teams.push({team: item.home.name, id: item.home.id}))
        const uniqueArray = teams.filter((item, index) => teams.findIndex(obj => obj.team === item.team) === index)
        return res.json(uniqueArray)
    })

router.route('/:id')
    .get(async (req, res) => {

        let teamProfile;

        try {
            // teamProfile = await axios.get('http://api.sportradar.us/mlb/trial/v7/en/teams/' + req.params.id + '/profile.json?api_key=')
            teamProfile = await fs.readJson(path.join(__dirname, '../data/teams/' + req.params.id + '.json'));
        } catch (err) {
            console.error(err)
        }
        const players = teamProfile.players.filter((item) => item.position === 'P')
        return res.json(players)
    })

module.exports = router;