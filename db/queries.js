const db = require('./index')

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
    .none('INSERT INTO events(product_name, price, product_description)', {
      product_name: req.body.product_name,
      price: req.body.price,
      product_description: req.body.product_description
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
