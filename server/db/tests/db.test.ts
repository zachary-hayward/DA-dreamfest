import { describe, beforeEach, beforeAll, it, expect } from 'vitest'
import { connection, getEventsByDay, deleteEvent, getEventById } from '../index.ts'
import { dblClick } from '@testing-library/user-event/dist/cjs/convenience/click.js'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('schedule', () => {
  it('has a bunch of events', async () => {
    const data = await getEventsByDay('friday')
    expect(data).toMatchInlineSnapshot(`
      [
        {
          "day": "friday",
          "description": "Not the biggest stage, but perhaps the most hip.",
          "eventName": "Slushie Apocalypse I",
          "id": 1,
          "locationName": "TangleStage",
          "location_id": 1,
          "name": "TangleStage",
          "time": "2pm - 3pm",
        },
        {
          "day": "friday",
          "description": "It's a freakin' yurt! Get in here!",
          "eventName": "LEGO Builder Championships",
          "id": 2,
          "locationName": "Yella Yurt",
          "location_id": 2,
          "name": "Yella Yurt",
          "time": "6pm - 7pm",
        },
      ]
    `)
  })
})

describe('events', () => {
  it('deletes an event by id number', async () => {
    await deleteEvent(1)
    const actual = await getEventById(1)
    expect(actual).toBeUndefined()
  })
})