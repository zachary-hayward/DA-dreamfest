# DreamFest

Dreamfest is a music festival, and the planning team has already built the UI and the routes, as well as having designed and seeded the initial database tables. We'll implement the database functions to be used from the routes, allowing the planning team to manage locations and events.

<details>
  <summary>Full overview</summary>

You've just landed your first dev role and you're responsible for creating an app that manages DreamFest, a wholesome three day festival that offers attendees daily yoga and meditation, arts and crafts, healthy eateries, wellbeing workshops and sweet beats.

Your app needs to give the festival organisers the ability to add **locations** and to add **events** at those locations. As plans change, they will also need to be able to add, edit and delete events.

Fortunately, the team has already confirmed the venue and dates so they know how many locations they need. They have also confirmed some partners and bands so they can begin slotting them in when your app is ready. The current planning has been prepared as seed data for your database.

The design team has worked up the UI and routes, but they haven't yet connected them to the database. That's where you come in. You'll implement the database functions to be used from the routes.

</details>
<br />

Let's get stuck in!

---

## Setup

### 0. Installation and migrations

- [x] Clone this repo and `cd` into the new directory
- [x] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  Commands might look like this:

  ```
  npm i
  npm run knex migrate:latest
  npm run knex seed:run
  npm run dev
  ```

  This will create and populate the database with the existing migrations and seeds, and start the server.
  </details>

- [x] Get familiar with the current state of the app and the existing codebase

### What's included

The application is usable... _ish_. You can try anything and the app shouldn't break or throw any errors, but adding, editing and deleting events and locations doesn't work yet. Also, you're only seeing hard-coded data. Most of the changes you'll need to make are marked with `TODO:`. Be sure you understand the existing code and have a plan before you start coding new functionality.

---

## Displaying locations and events

### 1. Show all locations

- [x] Have a look at the `GET /api/v1/locations` route in `server/routes/locations.ts`
- [x] Complete the `getAllLocations` function in `db/index.ts` and have it return a Promise that resolves to an array of locations from the database
- [x] Complete the route using your new database function

### 2. Show events for a day

- [x] Have a look at the `GET /api/v1/schedule/:day` route in `server/routes/schedule.js`
- [x] Build a `getEventsByDay` function with a `day` parameter. Today we'll put all our database functions in `db/index.ts`
- [x] Complete the route using your new database function

  <details style="padding-left: 2em">
    <summary>More about the <code>getEventsByDay</code> function</summary>

  1. JOIN the `events` and `locations` tables WHERE `events.location_id = locations.id`
  2. Filter (`where`) the results for only events where the day matches. Remember to pass the `day` when you call your function!
  3. Note that the `events` and `locations` tables both have `name`, `description`, and `id` columns. How can you specify which one to use when? What is the shape of the data that the component is expecting? **Hint: look at the shape of the hard-coded sample data in `server/routes/schedule.js`**

  If some data isn't displaying in the app, try using `console.log` to look at your data, so that you can compare it to the sample data

  - In particular, if you're sending the `day` property correctly, then the heading in the app should say "Events: Friday", "Events: Saturday" or "Events: Sunday". If it just says "Events:", take another look at your data!
  </details>

## Editing locations

### 3. Show the form

- [x] Look at the `GET /api/v1/locations/:id` route in `server/routes/locations.ts`
<details style="padding-left: 2em">
  <summary>Tip</summary>
  
  This route supplies the current data to the form, ready for the user to edit it.
</details>

- [x] Build a `getLocationById` function in `server/db/index.ts` with an `id` parameter
- [x] Be sure the form is being populated correctly
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - If it's not working, try the trouble-shooting strategies from section 2
  - Can `.first()` help you here?
  </details>

### 4. Submit the form

- [x] Submitting the "Edit Location" form should send an HTTP PATCH request which will hit your `PATCH /api/v1/locations/:id` route, in `routes/locations.ts`
<details style="padding-left: 2em">
  <summary>making a PATCH request</summary>
This component uses the `useEditLocation` hook, from `client/hooks/api.ts`, this provides a react-query
mutation that makes PATCH requests to a specific location.
</details>

- [x] Build an `updateLocation` function in `server/db/index.ts` with an `updatedLocation` parameter (note the "d" in "updateD")

  <details style="padding-left: 2em">
    <summary>More about the <code>updateLocation</code> function</summary>

  If you find yourself struggling with the `updatedLocation` (object) parameter, you might start by using `id`, `name` and `description` parameters instead.

  - UPDATE the `locations` table with the updated location details
  </details>

## Adding and deleting events

### 5. Add a new event

- [x] Submitting the "Add New Event" form should send an HTTP POST request which will hit the `POST /events` route, in `routes/events.ts`
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - You likely need to rename the `locationId` property of the body object to be `location_id` before passing it to the database
  - You may also want to ensure that `location_id` has a type of `Number` rather than `String`
  </details>

- [x] Build an `addNewEvent` function with an `event` parameter

### 6. Delete events

- [ ] Deleting an event will send an HTTP POST request which will hit your `POST /events/delete` route in `routes/events.ts`
  <details style="padding-left: 2em">
    <summary>More about deleting an event</summary>
    
    Within the site, you will find the delete button on the same page you edit an event

  - Note that the "Edit event" page is currently displaying hard-coded details in the form (you'll fix this in the next step), but to check if this page is correct at this stage, click "Edit event" on (for example) the "Cutest Puppy Awards" card, you should then find yourself at the front-end route `/events/4/edit`, 4 being the id of the event (as seen in your seeds).
  - The "Delete event" button should be able to delete "Cutest Puppy Awards" (id 4) even though the displayed details are for "Slushie Apocalypse I" as you will find it uses the id provided by the url, not the hardcoded data.
  </details>

- [ ] Build a `deleteEvent` function with an `id` parameter

---

## Stretch

### 7. Edit events

<details>
  <summary>More about editing events</summary>

**Show the form**

1. Look at the `GET /events/:id` route in `routes/events.ts`. This route supplies the current data to the "Edit Event" form, ready for the user to edit it.
2. Build a `getEventById` function with an `id` parameter. Use this in your route.

**Update the form**

3. Like the "Add new event" form above, the "Edit event" form also needs a list of locations from the database. We can use `getAllLocations` for a third time, but this time we need to modify the data before we send it to the form, so that our data records which location is the current location for this event
   - Maybe you could use an array function here?
4. Make sure you call `getEventById` first, and then `getAllLocations`
   - You're managing three bits of data here: `days`, `event` and `locations`, how will you manage this data so that each function in the promise chain can see everything it needs to see?

**Submit the form**

5. Build an `updateEvent` function with an `updatedEvent` parameter
6. Update `PATCH /events/:id` in `routes/events.ts`
</details>
<br />

### 8. Add new locations

<details>
  <summary>More about adding locations</summary>

You'll need to create new things in this step, but referring to existing features will help.

**Show the form**

1. In `client/components/LocationsList.tsx`, create an "Add Location" link (similar to the "Add Event" link in `client/components/DaySchedule.tsx`)
2. Create a new component at `client/components/NewLocation.tsx`
   - Look at `client/components/EditLocation.tsx` and `client/components/NewEvent.tsx` for guidance
3. add a client-side route in `client/routes.tsx` so that `/locations/add` shows our new component

**Submit the form**

4. Create a `POST /api/v1/locations` route in `routes/locations.ts`
5. Build an `addNewLocation` function with a `locationInfo` parameter
6. Create a hook with `useMutation` to connect our `NewLocation` component to the API

- Refer to `client/hooks/use-create-event.ts` when writing your hook function
</details>
<br />

### 9. Delete locations

<details>
  <summary>More about deleting locations</summary>

You'll need to create new things in this step too, but referring to existing features will help.

**Create link**

1. Add a new "Delete" form and button to `client/components/EditLocation.tsx` (see `client/components/EditEvent.tsx`)
   - Pass the `id` as a hidden form field

**Create route**

2. Create a `DELETE /api/v1/locations/:id` route in `routes/locations.ts`
3. Build a `deleteLocation` function with an `id` parameter
_ If you delete a location that has an event, what happens to the event? Why?_
</details>
<br />

### 10. Test helper functions

<details>
  <summary>More about testing helpers</summary>

Some tests have been created in `helpers.test.ts` but they haven't been written yet. They are just testing the functions exported from `helpers.ts` so they should be pretty easy (as far as testing goes). Some of the functionality hasn't been implemented in the helper functions, so you'll need to do that too. Perhaps this is a good time to revisit test-driven development (write the tests before implementing the functionality in `helpers.ts`). Remember red, green, refactor! \* Note that the `validateDay` function will use a `days` parameter if one is supplied, or if not then it will use the hard-coded `eventDays` value (similar to `db = connection` that you've been using in your functions)

</details>
<br />

### 11. Quality measures

<details>
  <summary>Optimising database queries</summary>

With database queries, it's often most efficient to ask for only the data you need. Take a look at `getAllLocations`, and you might notice that selecting all fields will include the `description` data. But the description data for the full set of locations is only used by the `showLocations.hbs` view. Every other time we call `getAllLocations` the `description` is not used.

Consider writing a separate db function (perhaps `getAllLocationsWithDesc`?) to request the complete data when needed, and updating `getAllLocations` to request only the necessary fields in all other cases.

</details>

<details>
  <summary>Optimising images</summary>

Another way to improve the performance of a site is by making sure images are fit for purpose. Saving images to the best format and resolution will ensure you don't unnecessarily slow down the experience for users. For more detail, check out [this resource](https://web.dev/fast/#optimize-your-images).

</details>

<details>
  <summary>Linting and formatting</summary>

We've already put in place automatic tools that help to format your code in a consistent way. This helps others read your code and makes your life easier, too! If you've ever noticed that whitespace or quotes change when you save a file, you've seen Prettier in action. In addition, we've set up a set of "lint" rules which may have caused angry-looking underlines on your code. You can explicitly cause eslint to run and output errors and warnings by running `npm run lint` from the command line. Fix any problems it informs you of, and your code will be that much cleaner.

</details>

<details>
  <summary>Separation of concerns</summary>

Separation of concerns is the idea that a function, component, or file should have a single responsibility. Having CSS in a separate file from your HTML is one early example. You will likely have been doing this without thinking too much about it, but check to make sure that your functions and files aren't doing too much. If you find a function that's doing several things, refactor it! Separation of concerns helps keep code maintainable and testable.

</details>

### 12. Adding a many-to-many relationship

[Follow the guide](./doc/stretch-many-to-many.md) to add a many-to-many relationship

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=dreamfest)
