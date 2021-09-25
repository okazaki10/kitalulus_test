const express = require('express')
const app = express()
const users = require("./routes/users")
const userdetail = require("./routes/userdetail")

global.URI = "https://api.github.com"

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use('/users', users)
app.use('/userdetail', userdetail)

app.listen(3000)