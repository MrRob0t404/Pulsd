# Pulsd

## Getting Started
---
run npm install on the backend and client folders to install all of the dependencies used in this project 
after dependencies have been installed, run npm start on both backend and client folders 

#### Report 
Needed more clarification on the syndication process*. I looked up different websites where Pulsd events can be reposted. Here are websites I looked at: 
-Eventzilla
-Eventbrite
-Etouches
-DoubleKnot 
-Configio 

\* Using event management sites' API to upload the event? 

#### Features 
-ability to submit new events to database 
-automatic syndication on every hour 

#### Technologies 
This app was builton Postgres, Express, ReactJS, Node.js, HTML/CSS, and the following npm packages 
-node-cron
-axios


### Author's Notes (Challenges)
---
Postgresql decided to lock me out and I can't run psql commands. This problem took majority of my time solving. 
I had no knowledge of a cron-job prior to this and I had to do research on how to leverage 
Learning on how to leverage Eventbrites API 
