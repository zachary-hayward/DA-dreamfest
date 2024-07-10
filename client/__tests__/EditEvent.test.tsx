// @vitest-environment jsdom
import { setupApp } from './setup.tsx'
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { waitFor, screen } from '@testing-library/react'
import nock from 'nock'

beforeAll(() => nock.disableNetConnect())

afterEach(() => nock.cleanAll())

describe('EditEvent', () => {
  it('should delete the event when the button is clicked', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/events/1`)
      .reply(200, {
          id: 1,
          locationId: 1,
          day: "friday",
          time: "2pm - 3pm",
          name: "Slushie Apocalypse I",
          description: "This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!"
        })

    const deleteScope = nock('http://localhost')
      .delete(`/api/v1/events/1`)
      .reply(200)
    
    const scheduleScope = nock('http://localhost')
      .get(`/api/v1/schedule/friday`)
      .reply(200, {
        "day": "friday",
        "events": [
          {
            id: 2,
            description: "This event will be taking place at the Yella Yurt. Come see what marvels our championship builders have built over the past 7 days!",
            eventName: "LEGO Builder Championships",
            day: "friday",
            time: "6pm - 7pm",
            name: "Yella Yurt",
            location_id: 2
          }
        ]
      })

    const { user } = setupApp(`/events/1/edit`)

    const deleteButton = await screen.findByText('Delete event')

    expect(deleteButton).toBeVisible()
    
    await user.click(deleteButton)
    console.log("After clicking delete button")

    expect(scope.isDone()).toBe(true)
    expect(scheduleScope.isDone()).toBe(true)

    expect(deleteScope.isDone()).toBe(true)
    console.log(nock.activeMocks())
  })
})