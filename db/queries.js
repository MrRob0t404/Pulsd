const db = require('./index')
const cron = require('node-cron')

cron.schedule('* * * * *', function (req, res, next) {
  // Checks for new entries in the database every hour
  db
    .any('SELECT * FROM events')
    .then(data => {
      // res.status(200).json({ user: data })
      console.log(data)
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
