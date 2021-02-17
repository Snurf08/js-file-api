# JS file API

The javascript file API is my latest project, it basically makes it possible to save data on servers using normal client sided javascript.

Using API keys you can give Applications access to folders only for them, to store for example passwords, and other sensitive data. 



## Setup:

*There are two options for you:*

1. ### You use the **public** API
   
   which is hosted by myself and always online, to use it, add the following script to your website:

```js
var FileApi = {
  server:"https://snurf08.de",
  key:"public",
  login:function(apikey)
  {
    FileApi.key = apikey;
  },
  writedata:function(data,file,response){
    fetch(FileApi.server+"/api/"+FileApi.key+"/savedata/"+data+"/"+file+"/").then(function(response) {
    return response.json();
    }).then(function(data) {
      response(true);
    }).catch(function() {
      response(false);
    });
  },
  readdata:function(file,response){
    fetch(FileApi.server+"/api/"+FileApi.key+"/readdata/"+file+"/").then(function(response) {
    return response.json();
    }).then(function(data) {
      response(data);
    }).catch(function() {
      response(false);
    });
  }
}
```

The standart api key is *"public"*, but if you have a different one (request one at [api@snurf08.de]("mailto:api@snurf08.de")) , use the following command, to login to your Key:

```js
FileApi.login("your key here")
```

To then save something in a file type the following:

```js
FileApi.savefile("the contents","the filename",function(callback){
    //if callback is true, the saving was successfull!
})
```

To then read the file content, type:

```js
FileApi.readfile("the filename",function(callback){
    //callback is the contents of the file, or an error.
})
```

You can use this to do cool interactive stuff on your site!



2. ### Host your own API

Make sure you have nodejs and npm installed on your server.

Download this Git, and then run the following commands:

```bash
npm install
npm start
```

If you want to change the port, go to the server.js, and change the number behind *port*



To now use it, simply change the following line in the code from *"Use the public api"*:

```js
...
server:"https://yourdomain.com",
...
```

and change *"yourdomain.com"* to your domain (or for testing purposes to *"localhost"*)

now you can use this api using the same stepps as in *"Use the public api"*.



If you find any bugs, please report them to me on Github, or at [api@snurf08.de]("mailto:api@snurf08.de")



