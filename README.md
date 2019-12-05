# Error Handling

## _I don't think you can handle this_

**No, actually I do.** There's not much to error handling beyond a bit of logic. Essentially, it all boils down to a handful of if statements and you're more than capable of following the logic by this stage. _If_ my query goes wrong _then_ send this response.

It takes a little more knowledge to write efficient and neat error handling. Express has given us access to a set of tools that help to streamline the process and in this cold task we want you to make full use of them. Don't forget to refer to the notes and use what you've learnt in the lecture.

## Set up

Install the dependencies you'll need (think about whether they're devDependencies or not).

```
express
pg
supertest
mocha
chai
```

Add in your own `config.js` in the `/db` directory. It should look like this:

```js
const dbConfig = {
  host: "localhost",
  database: "harry_potter",
  port: 5432
  // username:
  // password:
};

module.exports = dbConfig;
```

## Aim

### Part 1

If you head over to `/spec/index.spec.js` you'll see that we have provided half a test suite for you. Writing good tests for error handling can be a bit daunting at first so to begin with we've provided you with the tests. If you run the tests `npm test` you'll see that we've also taken the liberty of getting your endpoints working. All that's left for you to do is pass the tests for errors. Don't forget to make use of the `.catch` block as well as `next`!

### Part 2

You'll have to come up with your own tests in the second half of the cold task where you'll be completing the `/api/students` endpoints. Be sure to follow the happy path, first testing the endpoints correctly before moving on to potential errors.

#### Endpoints

##### `GET /api/students`

**_Gets all students_**

```json
{
  "students": [
    { "student_id": 1, "student_name": "Cillian Potter", "house_id": 1 },
    { "student_id": 2, "student_name": "Angelina Granger", "house_id": 1 }
    { "student_id": 3, "student_name": "Tom Digory", "house_id": 3 }
  ]
}
```

##### `GET /api/students?sort_by=desc`

**_Gets all the students ordered by student_id in descending order_**

Response body:

```json
{
  "students": [
    { "student_id": 3, "student_name": "Tom Digory", "house_id": 3 }
    { "student_id": 2, "student_name": "Angelina Granger", "house_id": 1 }
    { "student_id": 1, "student_name": "Cillian Potter", "house_id": 1 },
  ]
}
```

##### `GET /api/students?order_by=<COLUMN>`

**_Gets all the students ordered by the specified column_**

Request URL:

`"/api/students?order_by=student_name"`

Response body:

```json
{
  "students": [
    { "student_id": 2, "student_name": "Angelina Granger", "house_id": 1 }
    { "student_id": 1, "student_name": "Cillian Potter", "house_id": 1 },
    { "student_id": 3, "student_name": "Tom Digory", "house_id": 3 }
  ]
}
```

##### `GET /api/students/:student_id`

**_Gets a single student_**

Response Body:

```json
{
  "student": {
    "student_id": 1,
    "student_name": "Cillian Potter",
    "house_id": 1
  }
}
```

##### `PATCH /api/students/:student_id`

**_Updates a student's house_id and sends back the updated student_**

Request body:

```js
{ house_id: /* new house ID */ }
```

Response Body:

```json
{
  "student": {
    "student_id": 1,
    "student_name": "Cillian Potter",
    "house_id": /* new house ID */
  }
}
```

##### `POST /api/students`

**_Adds a new student to the database and sends back the new student_**

Request body:

```js
{
  student_name: 'Haz Tonks',
  house_id: 2
}
```

Response Body:

```json
{
  "student": {
    "student_id": /* NUMBER */,
    "student_name": "Haz Tonks",
    "house_id": 2
  }
}
```
