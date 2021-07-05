const util = require('util')

user=process.env.switch_user;
pwd=process.env.switch_pwd;

//'/restconf/data/ietf-interfaces:interfaces'

async function start(){ 

    let options = {
        host: "192.168.164.102",
        port: 443,
        path: "/restconf/data/Cisco-IOS-XE-matm-oper:matm-oper-data",
        method: 'GET',
        headers: {        
            'Authorization': 'Basic ' + new Buffer.from(user + ":" + pwd).toString('base64'),        
            'Accept': 'application/yang-data+json'
        },  
        rejectUnauthorized: false,
    };
     
   data = await require("./http-promise").https(options, "");
   console.log(data.body);
   data.body=JSON.parse(data.body)
   console.log(data.body);
   console.log(util.inspect(data.body,false,null,true));
}

start();
