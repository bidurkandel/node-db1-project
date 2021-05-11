const express = require("express");

const AccountRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
  })

// router.use((err, req, res, next) => {
//     res.status(500).json({ message: err.message, stack: err.stack }) // 
// })

module.exports = server;
