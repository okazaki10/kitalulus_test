
const axios = require('axios');

let users = []

const getUsers = async (conf) => {
    try {
        const response = await axios.get(global.URI + '/users', conf)
        return { success: true, message: '', data: response.data }
    } catch (err) {
        console.log(err)
        return { success: false, message: err.message, data: err.response.data, errCode: err.response.status }
    }
}

const index = async (req, res) => {
    if (req.header('Authorization')) {
        var resp = await getUsers({
            headers: { 'Authorization': req.header('Authorization') }
        })
    } else {
        var resp = await getUsers()
    }
    users = resp.data
    res.json(resp)
}

const insertUser = async (req, res) => {
    var id = users[users.length - 1]?.id ? users[users.length - 1].id : 0
    const isi = { id: id + 1, ...req.body }
    users.push(isi)
    res.json(users)
}

const updateUser = async (req, res) => {
    var id = req.params.id
    var index = users.findIndex((user) => user.id == id)
    if (index != 1) {
        users[index] = { id: id, ...req.body }
    }
    res.json(users)
}

const deleteUser = async (req, res) => {
    var id = req.params.id
    users = users.filter((user) => user.id != id)
    res.json(users)
}

module.exports = {
    index: index,
    insertUser: insertUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}
