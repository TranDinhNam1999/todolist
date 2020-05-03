const users = [
    {
        email: 'tdnam.17ck1@gmail.com',
        displayName: 'Dinh Nam',
        password: ''
    },
];

function findUserByEmail(email){
    return users.find(x => x.email === email);
}

function findUserById(id){
    return users[id];
}

module.exports = {
    findUserByEmail,
    findUserById,
}