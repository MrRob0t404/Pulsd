const db = require('./index')
const cron = require('node-cron')
const axios = require('axios');
require('dotenv').config()

//adds events to eventbright and schedules the call to eventbrites api with new data 
cron.schedule('* * * * * *', function (req, res, next) {
  // Checks for new entries in the database every hour
  db
    .any(`SELECT *
    FROM events
    WHERE events.date_created >= NOW() - INTERVAL '1' HOUR`)
    .then(data => {
      // console.log('found new data: ', data)
      // console.log('submitted new data')
      data.map((ele) => {
        axios.post(`eventbriteapi.com/v3/organizations/${process.env.USER_ID}/events/?token=${process.env.API_KEY}`, {
          'event.name.html': ele.product_name,
          'event.description.html': ele.product_description,
          'event.start.utc': ele.starttime,
          'event.start.timezone': ele.timezone,
          'event.end.utc': ele.endtime,
          'event.end.timezone': ele.timezone,
          'event.currency': 'USD'
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log('something went wrong 1', err);
          });
      })
    })
    .catch((err) => {
      console.log('something went wrong 2')
    })
})


function getEvents(req, res, next) {
  db
    .any('SELECT * FROM events')
    .then(data => {
      res.status(200).json({ user: data })
    })
    .catch((err) => {
      res.status(500).json({ status: `failed${err}` })
    })
}

function newEvent(req, res, next) {
  console.log(req.body)
  db
    .none('INSERT INTO events(product_name, product_description, price, starttime, endtime, timezone) VALUES(${product_name}, ${product_description}, ${price}, ${starttime}, ${endtime}, ${timezone})', {
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      price: req.body.price,
      starttime: req.body.starttime,
      endtime: req.body.endtime,
      timezone: req.body.timezone
    })
    .then(() => {
      res.status(200).json({ status: 'Success' })
    })
    .catch(err => {
      res.status(500).json({ status: `failed${err}` })
    })
}

module.exports = {
  getEvents,
  newEvent
}
