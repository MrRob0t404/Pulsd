const db = require('./index')

function getEvents (req, res, next) {
  db
    .one('SELECT * FROM events', {
      username: req.user.username
    })
    .then(data => {
      res.status(200).json({ user: data })
    })
}

module.exports = { 
    getEvents
}
