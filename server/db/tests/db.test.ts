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
          "description": "This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!",
          "eventName": "Slushie Apocalypse I",
          "id": 1,
          "location_id": 1,
          "name": "TangleStage",
          "time": "2pm - 3pm",
        },
        {
          "day": "friday",
          "description": "This event will be taking place at the Yella Yurt. Come see what marvels our championship builders have built over the past 7 days!",
          "eventName": "LEGO Builder Championships",
          "id": 2,
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