"use strict";var bcrypt=require("bcrypt"),users=[{id:1,email:"tdnam.17ck1@gmail.com",displayName:"Dinh Nam",password:"$2b$10$IQDbGnVrTAuMaobZ3dB4zeJ/RSxpE17BK6JCBOGaoeW6Vtrq4EF5i"},{id:2,email:"namhandsomefap@gmail.com",displayName:"Nam Handsome",password:"$2b$10$PgHIn7eJkefZcserSc.MIuYf2PSqaf17d8PcWAHdwv4Op4bJw3MQO"}];function findUserByEmail(s){return users.find(function(r){return r.email===s})}function findUserById(s){return users.find(function(r){return r.id===s})}function hashPassword(r){return bcrypt.hashSync(r,10)}function verifyPassword(r,s){return bcrypt.compareSync(r,s)}module.exports={findUserByEmail:findUserByEmail,findUserById:findUserById,hashPassword:hashPassword,verifyPassword:verifyPassword};