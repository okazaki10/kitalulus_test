const express = require('express')
const app = express()
const users = require("./routes/users")

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use('/users', users)

app.get('/', function (req, res) {
    res.json({ msg: 'asdafasds' })
})

app.listen(3000)