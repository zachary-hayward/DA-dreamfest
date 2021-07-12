const express = require('express')

const log = require('../logger')
const db = require('../db/volunteers')
const { decode } = require('../notifications/emailTokens')

const router = express.Router()

module.exports = router

router.get('/emailsignup', (req, res) => {
  const { token } = req.query
  const volunteer = decode(token)

  db.addVolunteer(volunteer)
    .then(() => {
      res.redirect(`/gardens/${volunteer.gardenId}`)
      return null
    })
    .catch(err => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to register from email'
        }
      })
    })
})

// include getTokenDecoder() like function into post route that passes authorisation header?REQUIRES TOKEN
// Verifies the data being modified belongs to the user that added it.
router.post('/', (req, res) => {
  const { userId, eventId } = req.body

  db.addVolunteer({ userId, eventId })
    .then(() => {
      res.sendStatus(201)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to register volunteer status'
        }
      })
    })
})

// include getTokenDecoder() like function into post route that passes authorisation header?REQUIRES TOKEN
// Verifies the data being modified belongs to the user that added it.
router.delete('/', (req, res) => {
  const { userId, eventId } = req.body
  db.deleteVolunteer({ userId, eventId })
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to remove volunteer status'
        }
      })
    })
})

// include getTokenDecoder() like function into post route that passes authorisation header?REQUIRES TOKEN
router.patch('/', (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({
      error: {
        title: 'Unauthorized'
      }
    })
    return
  }

  const { hasAttended, userId, eventId } = req.body

  db.setVolunteerAttendance({ hasAttended, userId, eventId })
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch(err => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to set attendance for this volunteer/event'
        }
      })
    })
})

// include getTokenDecoder() like function into post route that passes authorisation header?REQUIRES TOKEN
router.post('/extras', (req, res) => {
  const { eventId, firstName, lastName } = req.body

  db.addExtraVolunteer({ eventId, firstName, lastName })
    .then(() => {
      res.sendStatus(201)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to add extra volunteer'
        }
      })
    })
})
