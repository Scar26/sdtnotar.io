const express = require('express');
const app = express();
const server = require('http').createServer(app);
const parser = require('body-parser');
const url = require('url');
const path = require('path');
const fs = require('fs');
const Web3 = require('web3');
const crypto = require('crypto');
const request = require('request')

server.listen(process.env.PORT || 4269);
app.use(parser.urlencoded({ extended: true}));
console.log("Server listening on port 4269...");

if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); }
else { web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); }
console.log("Web3 initialized");

function formRing(c_id,b_id,s_id){
    
}

app.get('/admin',function(req,res){
    res.sendFile(__dirname + '/admin.html');
});

app.post('/deploy',function(req,res){
    var comp = req.body.com;
    var buyer = req.body.buyer;
    var seller = req.body.seller;
});