const express = require('express');
const router = express.Router();
const axios = require('axios');

const URL = "https://api.github.com"

const getUsers = async (site) => {
    try {
        const response = await axios.get(URL + site)
        return { success: true, message: '', data: response.data }
    } catch (err) {
        console.log(err)
        return { success: false, message: err.message, data: err.response.data, errCode: err.response.status }
    }
}

router.get('/', async (req, res) => {
    var data = await getUsers('/users')
    res.json(data)
})

router.get('/:name', async (req, res) => {
    var data = await getUsers('/users/' + req.params.name)
    if (!data.success) {
        res.status(data.errCode)
    }
    res.json(data)
})

module.exports = router;