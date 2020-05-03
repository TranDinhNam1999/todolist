"use strict";

var users = [{
  email: 'tdnam.17ck1@gmail.com',
  displayName: 'Dinh Nam',
  password: ''
}];

function findUserByEmail(email) {
  return users.find(function (x) {
    return x.email === email;
  });
}

function findUserById(id) {
  return users[id];
}

module.exports = {
  findUserByEmail: findUserByEmail,
  findUserById: findUserById
};