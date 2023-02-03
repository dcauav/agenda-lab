// ENV Config
require("dotenv").config()
const env = (env_param) => {
    env_ = env_param.toUpperCase();
    return process.env[env_]
};

const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")

// Server config
const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser())

server.listen(env("PORT"), () => {
    console.log("Server ON")
    console.log("Access: http://localhost:3030")
})

const conn = require("./database/connWrapper")


// Exemplo de retorno JSON
server.get("/", async (req, res) => {
    res.json(await conn("SELECT * FROM tbl_users", '', res));
})

