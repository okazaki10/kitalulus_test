
const axios = require('axios');

let userDetail = {}

const getDetail = async (param) => {
    try {
        const response = await axios.get(global.URI + '/users/' + param)
        return { success: true, message: '', data: response.data }
    } catch (err) {
        console.log(err)
        return { success: false, message: err.message, data: err.response.data, errCode: err.response.status }
    }
}

const userDefault = async (req, res) => {
    var resp = await getDetail('mojombo')
    if (!resp.success) {
        res.status(resp.errCode)
    } else {
        userDetail = resp.data
    }
    res.json(resp)
}


const index = async (req, res) => {
    var resp = await getDetail(req.params.name)
    if (!resp.success) {
        res.status(resp.errCode)
    } else {
        userDetail = resp.data
    }
    res.json(resp)
}

const updateUser = async (req, res) => {

    userDetail = req.body 

    res.json(userDetail)
}


module.exports = {
    index: index,
    updateUser: updateUser,
    userDefault: userDefault
}
