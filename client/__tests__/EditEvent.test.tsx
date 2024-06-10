// @vitest-environment jsdom
import { setupApp } from './setup.tsx'
import { describe, it, expect, afterEach } from 'vitest'
import { waitFor, screen } from '@testing-library/react'
import nock from 'nock'

afterEach(() => {
  nock.cleanAll()
})

describe('EditEvent', () => {
  it('should delete the event when the button is clicked', async () => {
    const eventId = 1
    nock('http://localhost:5173')
      .get(`/api/v1/events/${eventId}`)
      .reply(200, {
        id: eventId,
        name: 'Sample Event',
        description: 'This is a sample event',
        day: 'friday',
        time: '2pm - 3pm',
        locationId: 1,
        eventName: 'Sample Event Name',
        locationName: 'Sample Location'})
    
    const deleteScope = nock('http://localhost:5173')
      .delete(`/api/v1/events/${eventId}`)
      .reply(200, {})
    
    const {user} = setupApp(`/events/${eventId}/edit`)

    console.log(nock.activeMocks())

    const eventName = await screen.findByText('Sample Event')
    expect(eventName).toBeVisible()


  })
})