# reelio

<img width="1423" alt="Screen Shot 2019-08-15 at 10 48 22 PM" src="https://user-images.githubusercontent.com/31422519/63128438-102af480-c009-11e9-9bea-cc362bfab58f.png">

SOFTENG 761 Project by *The Deliverables* for Vista.

[![Build Status](https://travis-ci.com/swimuel/reelio.svg?token=G9zx8ysL4UD2AyJxMys5&branch=master)](https://travis-ci.com/swimuel/reelio)

## Setup configuration
Note to get the repository fully working, you will have to generate an API key through OMDb [here](http://www.omdbapi.com/apikey.aspx).
Choose the FREE option, enter your email, and once you have the key, insert it into the **config.js** file under /server, e.g:
```
module.exports = {
  omdbApiKey: '123456789' // Insert API key here to use
}
```

## Instructions
To run the application:

- Install [mongoDB](https://docs.mongodb.com/manual/installation/) and ensure it is running

- There's two node projects (client and server) which both require npm install. In the root directory: `npm run install-all` will take care of both of them.

- From the root directory: `npm run dev`
