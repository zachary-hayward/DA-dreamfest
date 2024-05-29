import express from 'express'

import { validateDay } from './helpers.ts'

import * as db from '../db/index.ts'

const router = express.Router()
export default router

router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId } = req.body
    const day = validateDay(req.body.day)
    const id = await db.addNewEvent({name, description, time, day, locationId})
    const url = `/api/v1/events/${id}`
    res.setHeader('Location', url)
    res.status(201).json({ location: url })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const rowsDeleted = await db.deleteEvent(id)
    console.log(rowsDeleted)
    res.json(id)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const event = await db.getEventbyId(id)
    // const event = {
    //   id: id,
    //   locationId: 1,
    //   day: 'friday',
    //   time: '2pm - 3pm',
    //   name: 'Slushie Apocalypse I',
    //   description:
    //     'This is totally a description of this really awesome event that will be taking place during this festival at the Yella Yurt. Be sure to not miss the free slushies cause they are rad!',
    //   ...dbEvent,
    // }
    // TODO: if there's no event with that id, respond with a 404 instead
    if (!event || !event.id) {
      res.status(404)
    }
    else {
      res.json(event)
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, time } = req.body
    const id = Number(req.body.id)
    const day = validateDay(req.body.day)
    const locationId = Number(req.body.locationId)

    // TODO: UPDATE the event in the db with the matching ID using these details,
    // if no event has a matching id, respond with a 404 instead
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})
