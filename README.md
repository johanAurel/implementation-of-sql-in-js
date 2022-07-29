# Error Handling

## _I don't think you can handle this_

**No, actually I do!** There's not much to error handling beyond a bit of logic. Essentially, it all boils down to a handful of if statements and you're more than capable of following the logic by this stage. _If_ my query goes wrong _then_ send this response.

It takes a little more knowledge to write efficient and neat error handling. Express has given us access to a set of tools that help to streamline the process and in this cold task we want you to make full use of them. Don't forget to refer to the notes and use what you've learnt in the lecture.

## Set up

Before you can run the tests on this repo, you'll first need to:

- Install all dependencies listed in the `package.json`
- Use the provided script to create the database

## Part 1

If you head over to `/__tests__/index.test.js` you'll see that we have provided half a test suite for you. Writing good tests for error handling can be a bit daunting at first so to begin with we've provided you with the tests. If you run the tests `npm test` you'll see that we've also taken the liberty of getting your endpoints working. All that's left for you to do is pass the tests for errors. Don't forget to make use of the `.catch` block as well as `next`!

## Part 2

You'll have to come up with your own tests in the second half of the cold task where you'll be completing the `/api/superheroes` endpoints. Be sure to follow the happy path, first testing that you can get the endpoints working correctly before moving on to potential errors.

### Endpoints

#### `GET /api/superheroes`

**_Gets all superheroes_**

Example response body:

```json
{
  "superheroes": [
    {
      "superhero_id": 1,
      "alias": "Captain Marvel",
      "real_name": "Carol Danvers",
      "is_identity_secret": false,
      "image_url": "https://bit.ly/3voWXqO",
      "team_id": 3
    },
    {
      "superhero_id": 2,
      "alias": "Daredevil",
      "real_name": "Matt Murdoch",
      "is_identity_secret": true,
      "image_url": "https://bit.ly/3JeaG9r",
      "team_id": 2
    }
    // ...
  ]
}
```

#### `GET /api/superheroes?order=desc`

**_Gets all the superheroes by superhero_id in descending order_**

Example response body:

```json
{
  "superheroes": [
    {
      "superhero_id": 8,
      "alias": "Beast",
      "real_name": "Hank McCoy",
      "is_identity_secret": false,
      "image_url": "https://bit.ly/3bdvDok",
      "team_id": 1
    },
    {
      "superhero_id": 7,
      "alias": "Power Man",
      "real_name": "Luke Cage",
      "is_identity_secret": false,
      "image_url": "https://cnet.co/3S5vJz9",
      "team_id": 2
    }
    // ...
  ]
}
```

#### `GET /api/superheroes?sort_by=<COLUMN>`

**_Gets all the superheroes sorted by the specified column_**

Example request URL:

`"/api/superheroes?sort_by=alias"`

Example response body:

```json
{
  "superheroes": [
    {
      "superhero_id": 2,
      "alias": "Beast",
      "real_name": "Hank McCoy",
      "is_identity_secret": false,
      "image_url": "https://bit.ly/3bdvDok",
      "team_id": 1
    },
    {
      "superhero_id": 1,
      "alias": "Captain Marvel",
      "real_name": "Carol Danvers",
      "is_identity_secret": false,
      "image_url": "https://bit.ly/3voWXqO",
      "team_id": 3
    }
    // ...
  ]
}
```

#### `GET /api/superheroes/:superhero_id`

**_Gets a single superhero_**

Example response Body:

```json
{
  "superhero": {
    "superhero_id": 3,
    "alias": "Squirrel Girl",
    "real_name": "Doreen Allene Green",
    "is_identity_secret": false,
    "image_url": "https://bit.ly/3voomZX",
    "team_id": 3
  }
}
```

#### `PATCH /api/superheroes/:superhero_id`

**_Updates a superhero's team_id and sends back the updated superhero_**

Example request body:

```json
{ "team_id": /* new team ID */ }
```

Example response Body:

```json
{
  "superhero": {
    "superhero_id": 1,
    "alias": "Power Man",
    "real_name": "Luke Cage",
    "is_identity_secret": false,
    "image_url": "https://cnet.co/3S5vJz9",
    "team_id": /* team ID from the request body */
  }
}
```

#### `POST /api/superheroes`

**_Adds a new superhero to the database and sends back the new superhero_**

Example request body:

```json
{
  "alias": "Spider-Man",
  "real_name": "Peter Parker",
  "is_identity_secret": true,
  "image_url": "https://bit.ly/3Q1hQ37",
  "team_id": 3
}
```

Example response Body:

```json
{
  "superhero": {
    "superhero_id": /* PSQL Generated superhero ID */,
    "alias": "Spider-Man",
    "real_name": "Peter Parker",
    "is_identity_secret": true,
    "image_url": "https://bit.ly/3Q1hQ37",
    "team_id": 3
  }
}
```
