const superheroes = require('../db/data/superheroes.js');
const {
  selectTeams,
  insertTeam,
  selectTeamById,
  removeTeamById,
  selectSuperheroesByTeamId,
  selectSuperheroes,
} = require('../models/teams-models.js');

exports.getTeams = (req, res, next) => {
  selectTeams().then((teams) => {
    res.status(200).send({ teams });
  })
};

exports.postTeam = (req, res, next) => {
  const newTeam = req.body;

  insertTeam(newTeam).then((team) => {
    res.status(201).send({ team });
    
  }).catch((error)=>{
    
   next(error)
  })
};

exports.getTeamById = (req, res, next) => {
  const { team_id } = req.params;
  selectTeamById(team_id).then((team) => {
    res.status(200).send({ team });
  }).catch((error)=>{
  
    next(error)
  })
};

exports.deleteTeamById = (req, res, next) => {
  const { team_id } = req.params;
  removeTeamById(team_id).then(() => {
    res.status(204).send();
  }).catch((error)=>{
   
   next(error)
  })
};

exports.getSuperheroesByTeamId = (req, res, next) => {
  const { team_id } = req.params;
  selectSuperheroesByTeamId(team_id).then((superheroes) => {
   if(superheroes.length===0){
    next({status: 404, msg: 'team does not exist'})
   }
    res.status(200).send({ superheroes });
  }).catch((error)=>{
    next(error)
  })
};

exports.getSuperheroes = (req, res ,next) =>{

 selectSuperheroes.then((superheroes) => {
    res.status(200).send({ superheroes });
  })


}
