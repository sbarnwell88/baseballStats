const express = require('express');
const router= express.Router();
const axios = require("axios");

router.use('/', function(req, res, next) {
    const url = 'http://localhost:8080';
    
    // return (req, res, next) => {
        const path = req.originalUrl.replace('api/', '')
        console.log(path)
        console.log(req.method)
        console.log(url)
        console.log(req.body)

        axios({
            method: req.method,
            baseURL: url,
            url: path,
            data: req.body,
            // responseType: 'arrayBuffer'
        })
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            next(error)
        })
    // }
    
})

module.exports = router;