const teamsRouter = require('express').Router();
const {
  getTeams,
  postTeam,
  getTeamById,
  deleteTeamById,
  getSuperheroesByTeamId
} = require('../controllers/teams-controllers');

teamsRouter.route('/').get(getTeams).post(postTeam);

teamsRouter.route('/:team_id').get(getTeamById).delete(deleteTeamById);

teamsRouter.route('/:team_id/superheroes').get(getSuperheroesByTeamId);
module.exports = teamsRouter;
