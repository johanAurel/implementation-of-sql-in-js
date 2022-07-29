const superheroesData = require('./data/superheroes');
const teamsData = require('./data/teams');
const seed = require('./seed');
const db = require('./connection');

seed({ superheroesData, teamsData }).then(() => db.end());
