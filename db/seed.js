const db = require('./connection');
const format = require('pg-format');

const seed = ({ superheroesData, teamsData }) => {
  // Drop & create tables
  return db
    .query(`DROP TABLE IF EXISTS superheroes;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS teams;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE teams (
          team_id SERIAL PRIMARY KEY,
          team_name VARCHAR(50),
          formation_year INT
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE superheroes (
          superhero_id SERIAL PRIMARY KEY,
          alias VARCHAR(50),
          real_name VARCHAR(100),
          is_identity_secret BOOLEAN,
          image_url VARCHAR(1000),
          team_id INT REFERENCES teams(team_id) ON DELETE CASCADE
        );
      `);
    })
    .then(() => {
      // Insert teams data
      const teamsRows = teamsData.map(({ team_name, formation_year }) => {
        return [team_name, formation_year];
      });
      const teamsInsertQuery = format(
        `INSERT INTO teams (team_name, formation_year) VALUES %L;`,
        teamsRows
      );
      return db.query(teamsInsertQuery);
    })
    .then(() => {
      // Insert superheroes data
      const superheroesRows = superheroesData.map(
        ({ alias, real_name, is_identity_secret, image_url, team_id }) => {
          return [alias, real_name, is_identity_secret, image_url, team_id];
        }
      );
      const superheroesInsertQuery = format(
        `INSERT INTO superheroes 
          (alias, real_name, is_identity_secret, image_url, team_id) 
        VALUES %L;`,
        superheroesRows
      );
      return db.query(superheroesInsertQuery);
    });
};

module.exports = seed;
