const express = require('express');
const app = express();
const server = require('http').createServer(app);
const parser = require('body-parser');
const path = require('path');
const fs = require('fs');
const Web3 = require('web3');
const request = require('request');
const hbs = require('express-handlebars');
const io = require('socket.io').listen(server);

server.listen(process.env.PORT || 4269);
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(parser.urlencoded({ extended: true}));
console.log("Server listening on port 4269...");

var companyPublicKey = '6hJ5Zml71B/i358I6ucnDRRq0cnMtu/cetVQJm4hb4lWjrUU6OD5R5I7yDmvRm4RoCrnB+ar4st9rBEQHefkP1SeUKoJkVxqfgcry95MkvbDh92FBP8OPwRSw2UqrW1g ';
var defaultAccount = '0x5015A1459Fb76F506a4f0FaF6f740D709664B203';
var contract_addr = '0x235b67b82a0b389E6D042aFc1595b357c0A66753';
if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); }
else { web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); }
console.log("Web3 initialized");

function formRing(c_id,b_id,s_id,s_dt){
    json = {
        cid : c_id,
        bid : b_id,
        sid : s_id,
        sdt : s_dt
    };
 
    url = 'http://127.0.0.1:5000/ring';
    request.post(
		url,
		{ form: { data: JSON.stringify(json) }},
		function (error, response, body) {
 			console.log(body);
		}
	);
}


app.get('/admin',function(req,res){
    res.sendFile(__dirname+'/admin.html');
});

app.post('/deploy',function(req,res){
    var comp = req.body.com;
    var buyer = req.body.buyer;
    var seller = req.body.seller;
});


io.sockets.on('connection',function(socket){
    client = socket;
    console.log('socket connected');

    socket.on('sub',function(data){
        var obj = JSON.parse(data);
        bid = obj.bid;
        sid = obj.sid;
        file = obj.sdt;
        var resp = formRing(companyPublicKey,bid,sid,file);
        client.emit('subbed',resp);
    });
});
