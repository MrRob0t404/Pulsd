const db = require('./index')
const cron = require('node-cron')
const axios = require('axios');

//adds events to eventbright 
cron.schedule('* * * * *', function (req, res, next) {
  // Checks for new entries in the database every hour
  db
    .any(`SELECT *
    FROM events
    WHERE EXTRACT(HOUR FROM date_created) = (Extract(HOUR FROM CURRENT_TIMESTAMP) - 1)`)
    .then(data => {
      console.log(data)
      data.map((ele) => {
        axios.post(`eventbriteapi.com/v3/organizations/${process.env.userID}/events/?token=${process.env.apiKey}`, {
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
            console.log(error);
          });

      })
    })
    .catch((err) => {
      // res.status(500).json({ status: `failed${err}` })
      console.log(err)
    })
  console.log('running every minute')
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
  db
    .none('INSERT INTO events(product_name, product_description, price) VALUES(${product_name}, ${product_description}, ${price})', {
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      price: req.body.price
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
