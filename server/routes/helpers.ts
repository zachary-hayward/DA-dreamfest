export const eventDays = ['friday', 'saturday', 'sunday']

/**
 * Takes a string and capitalises the first letter.
 *
 * e.g. capitalise('tangle stage') => returns 'Tangle stage'
 * @param {string} name
 * @returns string
 */
export function capitalise(name: any) {
  if (typeof(name) === 'string' && name !== '') {
    return name[0].toUpperCase() + name.substring(1)
  }
  return ''
}

/**
 * Ensures that @param day is a string and is a valid Event day
 * The default valid event days are: friday, saturday, and sunday
 *
 * If the input day is not valid, use the first valid day instead
 * @param {string} day
 * @param {string[]} days
 * @returns string
 */
export function validateDay(
  day: string | undefined,
  days: string[] = eventDays
) {
  //Throw an error if the days isn't actually an array of event days
  if (!Array.isArray(days) || !days.every(day => typeof day === 'string')) {
    throw Error('days parameter should be an array of strings')

  }
  // Use the first day as the default value if the day argument isn't valid
  if (typeof day !== 'string') return days[0]
  if (!days.includes(day)) return days[0]
  return day
}
