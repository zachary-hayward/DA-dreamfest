import { describe, expect, test } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { capitalise, validateDay } from '../routes/helpers.ts'

describe('capitalise', () => {
  test('returns a capitalised string', () => {
    //Arrange
    const expected = 'Beans'
    //Act
    const actual = capitalise('beans')
    //Assert
    expect(actual).toBe(expected)
  })

  test('returns an empty string if the name argument is not a string', () => {
    //Arrange
    const expected = ''
    //Act
    const actual = capitalise(1234)
    //Assert
    expect(actual).toBe(expected)
  })

  test('returns an empty string if the name argument is an empty string', () => {
    //Arrance
    const expected = ''
    //Act
    const actual = capitalise('')
    //Assert
    expect(actual).toBe(expected)
  })
})

// TODO: Write these tests (remove .todo)
describe('validateDay', () => {
  test("returns the day if it exists in the supplied 'days' array", () => {
    //Arrange
    const expected = 'friday'
    //Act
    const actual = validateDay('friday', ['cats','dogs','friday'])
    //Assert
    expect(actual).toBe(expected)
  })

  test("returns the first day from the supplied 'days' array if 'day' is not in that array", () => {
    //Arrange
    const expected = 'saturday'
    //Act
    const actual = validateDay('friday', ['saturday','sunday'])
    //Assert
    expect(actual).toBe(expected)
  })

  test("returns the day from 'eventDays' if 'day' exists in 'eventDays' and no 'days' argument is provided", () => {
    //Arrange
    const expected = 'friday'
    //Act
    const actual = validateDay('friday')
    //Assert
    expect(actual).toBe(expected)
  })

  test("returns 'friday' if 'day' does not exist in 'eventDays' and no 'days' argument is provided", () => {
    const expected = 'friday'
    const actual = validateDay('monday')
    expect(actual).toBe(expected)
  })

  test("returns the matching lowercase day if 'day' is uppercase", () => {
    const expected = 'friday'
    const actual = validateDay('FRIDAY', ['friday','saturday'])
    expect(actual).toBe(expected)
  })

  test.todo('throws an error if the days argument is not an array of strings', () => {
    const expected = 'days parameter should be an array of strings'
    const actual = validateDay('friday', [12,34])
    expect(actual).toThrowError(expected)
  })
})
