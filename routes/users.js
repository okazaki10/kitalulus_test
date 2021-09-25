const express = require('express');
const router = express.Router();
const axios = require('axios');

const URL = "https://api.github.com"

let users = []
let userDetail = {}

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
    var resp = await getUsers('/users')
    users = resp.data
    res.json(resp)
})

router.post('/insert/', async (req, res) => {
    var id = users[users.length - 1]?.id ? users[users.length - 1].id : 0
    const isi = { id: id + 1, ...req.body }
    users.push(isi)
    res.json(users)
})

router.patch('/update/:id', async (req, res) => {
    var id = req.params.id
    var index = users.findIndex((user) => user.id == id)
    if (index != 1) {
        users[index] = { id: id, ...req.body }
    }
    res.json(users)
})

router.delete('/delete/:id', async (req, res) => {
    var id = req.params.id
    users = users.filter((user) => user.id != id)
    res.json(users)
})

router.get('/detail/:name', async (req, res) => {
    var resp = await getUsers('/users/' + req.params.name)
    if (!resp.success) {
        res.status(resp.errCode)
    } else {
        userDetail = resp.data
    }
    res.json(resp)
})

module.exports = router;