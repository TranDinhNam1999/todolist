const bcrypt = require('bcrypt');

const users = [
    {
        id: 1,
        email: 'tdnam.17ck1@gmail.com',
        displayName: 'Dinh Nam',
        password: '$2b$10$IQDbGnVrTAuMaobZ3dB4zeJ/RSxpE17BK6JCBOGaoeW6Vtrq4EF5i',
    },
    {
        id: 2,
        email: 'namhandsomefap@gmail.com',
        displayName: 'Nam Handsome',
        password: '$2b$10$PgHIn7eJkefZcserSc.MIuYf2PSqaf17d8PcWAHdwv4Op4bJw3MQO',
    },
];

function findUserByEmail(email){
    return users.find(x => x.email === email);
}

function findUserById(id){
    return users.find(u => u.id === id);
}

function hashPassword(password){
    return bcrypt.hashSync(password, 10);
}

function verifyPassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
    findUserByEmail,
    findUserById,
    hashPassword,
    verifyPassword,
}