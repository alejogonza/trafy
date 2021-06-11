require('dotenv').config();

module.exports = Object.freeze({
    JWT: process.env.JWTSECRET
})