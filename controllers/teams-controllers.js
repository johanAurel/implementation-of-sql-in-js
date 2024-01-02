const {
  selectTeams,
  insertTeam,
  selectTeamById,
  removeTeamById,
  selectSuperheroesByTeamId,
} = require('../models/teams-models.js');

exports.getTeams = (req, res, next) => {
  selectTeams().then((teams) => {
    res.status(200).send({ teams });
  });
};

exports.postTeam = (req, res, next) => {
  const newTeam = req.body;
  insertTeam(newTeam).then((team) => {
    res.status(201).send({ team });
  });
  // You might need some error handling here
};

exports.getTeamById = (req, res, next) => {
  const { team_id } = req.params;
  selectTeamById(team_id).then((team) => {
    res.status(200).send({ team });
  });
};

exports.deleteTeamById = (req, res, next) => {
  const { team_id } = req.params;
  removeTeamById(team_id).then(() => {
    res.status(204).send();
  });
};

exports.getSuperheroesByTeamId = (req, res, next) => {
  const { team_id } = req.params;
  selectSuperheroesByTeamId(team_id).then((superheroes) => {
    res.status(200).send({ superheroes });
  });
};
