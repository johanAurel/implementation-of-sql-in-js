const express = require('express');
const app = express();
const {
  getTeams,
  postTeam,
  getTeamById,
  deleteTeamById,
  getSuperheroesByTeamId,
} = require('./controllers/teams-controllers');

app.use(express.json());

app.get('/api/teams', getTeams);
app.post('/api/teams', postTeam);

app.get('/api/teams/:team_id', getTeamById);
app.delete('/api/teams/:team_id', deleteTeamById);

app.get('/api/teams/:team_id/superheroes', getSuperheroesByTeamId);

// Error handling middleware starts here...

module.exports = app;
