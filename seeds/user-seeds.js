const { User } = require('../models');

const userData = [
    {
        username: "THEtruthTeller",
        email: "truth@teller.com",
        password: "password"
    },
    {
        username: "TruthTim",
        email: "Truth@gmail.com",
        password: "password"
    },
    {
        username: "RealTonaldDump",
        email: "real@gmail.com",
        password: "password"
    },
    {
        username: "MTIGA",
        email: "MTIGA@gmail.com",
        password: "password"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;