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

If you head over to `/spec/index.spec.js` you'll see that we have provided half a test suite for you. Writing good tests for error handling can be a bit daunting at first so to begin with we've provided you with the tests. You'll have to write your own in the second half of the cold task.

If you run the tests `npm test` you'll see that we've also taken the liberty of getting your endpoints working. All that's left for you to do is pass the tests for errors.

Don't forget to make use of the `.catch` block as well as `next`!
