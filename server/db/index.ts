import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations() {
  const locations: unknown[] = await connection('locations').select()
  return locations as Location[]
}

export async function getEventsByDay(day: string) {
  const events: unknown[] = await connection('events').select().where({day})
  return events as EventData[]
}

export async function getLocationById(id: number) {
  const location: unknown = await connection('locations').select().where({id}).first()
  return location as Location
}

export async function updateLocation(id: number, name: string, description: string) {
  const location: unknown = await connection('locations')
    .where({id})
    .update({name, description})
  return location as Location
}

export async function addNewEvent(event: EventData) {
  const newEventId: unknown[] = await connection('events')
    .insert({name: event.name, description: event.description, time: event.time, day: event.day, location_id: event.locationId})
  return newEventId[0] as number
}

export async function deleteEvent(id: number) {
  const rows = await connection('events')
    .where({id})
    .delete()
  return rows
}

export async function getEventbyId(id: number) {
  const event = await connection('events')
    .where({id})
    .first()
  return event
}