const db = require('../db/connection');
const superheroes = require('../db/data/superheroes');

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

    })
};

exports.selectTeamById = (team_id) => {
  return db
    .query('SELECT * FROM teams WHERE team_id = $1;', [team_id])
    .then((result) => {
      if(result.rows.length===0){       ma
       return Promise.reject({status: 404, msg: 'team does not exist'})
      }
      return result.rows[0];
    })
   
};

exports.removeTeamById = (team_id) => {
  return db.query('DELETE FROM teams WHERE team_id = $1 RETURNING *',
   [team_id]).then((result) => {
    if(result.rows.length===0){       
      return Promise.reject({status: 404, msg: 'team does not exist'})
     }
    return result.rows;
  })
  

};

exports.selectSuperheroesByTeamId = (team_id) => {
  return db
    .query('SELECT * FROM superheroes WHERE superheroes.team_id = $1;', [
      team_id
    ])
    .then((superheroes)=>{
      return superheroes.rows
    })
    ;
};

exports.selectSuperheroes = ()=>{

  return db.query(`SELECT superhero_id, alias, real_name, is_identity FROM superheroes;`).then((result) => {
    return result.rows;
  });
} 