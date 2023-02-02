// ENV Config
require("dotenv").config()
const env = (env_param) => {
    return process.env[env_param]
};

const express = require("express");

// Server config
const server = express();

server.listen(env("PORT"), () => {
    console.log("Server ON")
    console.log("Access: http://localhost:3030")
})