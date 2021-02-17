//import stuff
const express = require("express");
const apikeys = require('./apikeys.json');
const fs = require('fs');

//setting values
const app = express();
const port = 3000;
var res = "";

//create dir for saving requested data
fs.mkdirSync('./savedata/');

// Add Access Control Allow Origin headers for public api access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


	//get api requests
app.get("/api/*",(request,response)=>{
	//split arguments
    var args = request.url.split('/');
    res = "";
    //CHeack if valid API Key is used.
    if(apikeys.keys.includes(args[2]))
	{
	//Simple ping function.
        if(args[3] == "ping")
        {
            res += "pong"
        }
		//this can save data on the server
        if(args[3] =="savedata")
        {
        	//doing null checks
            if(args[4] != null && args[4] != "")
            {
                if(args[5] != null && args[5] != "") // if file name is specified
                {
                	//if dir not exists create it
                	if (!fs.existsSync('./savedata/'+args[2]+"/")) {
        		fs.mkdirSync('./savedata/'+args[2]+"/");
    			}
    			//save data to specified file
                    var logger = fs.createWriteStream('./savedata/'+args[2]+"/"+args[5], {
                        flags: 'a'
                      });
                      logger.write(args[4]+'\n');
                      logger.close();
                      res += 'Success! Wrote data "'+args[4]+'" to file "'+args[2]+'/'+args[5]+'".';
                }
                else{
                	//if dir not exists create it
                	if (!fs.existsSync('./savedata/'+args[2]+"/")) {
        		fs.mkdirSync('./savedata/'+args[2]+"/");
    			}
    			//save data to placeholder file
                    var logger = fs.createWriteStream('./savedata/'+args[2]+'/nofilespecified.txt', {
                        flags: 'a'
                      });
                      logger.write(args[4]+'\n');
                      logger.close();
                      res += 'Success! Wrote data "'+args[4]+'" to file "'+args[2]+'/nofilespecified.txt".';
                }
            }else{ // sending error messages
                res += "Error! not enough args!";
            }
        }
        //function to read data
        if(args[3] =="readdata"){
            if(args[4] != null && args[4] != "")
            {
                //try to read the file, if not exists throw error
              try{
                res += fs.readFileSync('./savedata/'+args[2]+'/'+args[4]); 
              }catch{
                res+="Error";
              }
            }else{
                res += "Error! not enough args!";
            }
        }
    
	}else{ // if API key is invalid, throw error
		res+= 'API Key ' +args[2]+ ' is invalid!';
	}
    	response.json(res);
	
    
});

//Listen to port specified in line 8
const listener = app.listen(port, () => {
    console.log(`App listening now!`);
});
