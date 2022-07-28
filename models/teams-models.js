const db = require('../db/connection');

exports.selectTeams = () => {
  return db.query('SELECT * FROM teams;').then((result) => {
    return result.rows;
  });
};

exports.insertTeam = ({ team_name, formation_year }) => {
  return db
    .query(
      'INSERT INTO teams (team_name, formation_year) VALUES ($1, $2) RETURNING *;',
      [team_name, formation_year]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.selectTeamById = (team_id) => {
  return db
    .query('SELECT * FROM teams WHERE team_id = $1;', [team_id])
    .then((result) => {
      return result.rows[0];
    });
};

exports.removeTeamById = (team_id) => {
  return db.query('DELETE FROM teams WHERE team_id = $1;', [team_id]);
};

exports.selectSuperheroesByTeamId = (team_id) => {
  return db
    .query('SELECT * FROM superheroes WHERE superheroes.team_id = $1;', [
      team_id
    ])
    .then((result) => {
      return result.rows;
    });
};
