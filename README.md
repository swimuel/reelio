# reelio

<img width="1423" alt="Screen Shot 2019-08-15 at 10 48 22 PM" src="https://user-images.githubusercontent.com/31422519/63128438-102af480-c009-11e9-9bea-cc362bfab58f.png">

[![Build Status](https://travis-ci.com/swimuel/reelio.svg?token=G9zx8ysL4UD2AyJxMys5&branch=master)](https://travis-ci.com/swimuel/reelio)

**Customer:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vista <br>
**Product:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp; reelio <br>
**Product Owner:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Austin Sutherland <br>
**Team:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The Deliverables <br>

## The Project
The aim of this project is to create a way for those who wish to see a certain film "crowd fund" a showing. Users can create campaigns to play films at local cinemas and the movie will be brought to the big screen in a one-off session if enough others commit to it. Campaigns are displayed on a homepage and moviegoers can support campaigns by committing to buy tickets to them. 

## The Deliverables
| Name                | Github Username | UPI |
|---------------------|-----------------|--------------|
| Aorthi Afroza       |   aorthi        | aafr770 |
| Jessica Alcantara   |Jess-Alcantara   | jalc504 |
| Sam Broadhead       |swimuel          | sbro348 |
| Darcy Cox           | darcycox97      | dcox740 |
| Holly Hagenson      |hhagenson28      | hhag130 |
| Lucy Jiang          |lucyJiang279     | ljia374 |
| Kelsey Murray       |KelseyRM         | kmur120 |
| Emilie Pearce       | emipeanz        | epea390 |
| Cyrus Raitava-Kumar | cyrus-raitava   | crai897 |
| Oscar Sims          |oscarcs          | osim082 |

***

## Setup configuration
Note to get the repository fully working, you will have to obatain an OMDb API key. 

To do this you may either ask someone in the development team to provide you with an api key or sign up for a FREE api key through OMDb [here](http://www.omdbapi.com/apikey.aspx). 

Once you have the key, insert it into the **config.js** file under /server, e.g:
```
module.exports = {
  omdbApiKey: '123456789' // Insert API key here to use
}
```

## Execution Instructions
To run the application:

- Install [mongoDB](https://docs.mongodb.com/manual/installation/) and ensure it is running

- There's two node projects (client and server) which both require npm install. In the root directory: `npm run install-all` will take care of both of them.

- From the root directory: `npm run dev`
