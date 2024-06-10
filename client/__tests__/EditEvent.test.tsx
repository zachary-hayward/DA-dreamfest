// @vitest-environment jsdom
import { setupApp } from './setup.tsx'
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { waitFor, screen } from '@testing-library/react'
import nock from 'nock'

beforeAll(() => nock.disableNetConnect())

afterEach(() => nock.cleanAll())

describe('EditEvent', () => {
  it('should delete the event when the button is clicked', async () => {
    nock('http://localhost')
      .get(`/api/v1/events/1`)
      .reply(200, {
          id: 1,
          location_id: 1,
          day: "friday",
          time: "2pm - 3pm",
          eventName: "Slushie Apocalypse I",
          name: 'TangleStage',
          description: "This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!"
        })

    const deleteScope = nock('http://localhost:5173')
      .delete(`/api/v1/events/1`)
      .reply(200, [])
    
    const {user} = setupApp(`/events/1/edit`)

    console.log(nock.activeMocks())

    const eventName = await screen.findByText('Slushie Apocalypse I')
    expect(eventName).toBeVisible()


  })
})