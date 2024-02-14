const express = require('express');
const app = express();
const {
  getTeams,
  postTeam,
  getTeamById,
  deleteTeamById,
  getSuperheroesByTeamId,
  getSuperheroes
} = require('./controllers/teams-controllers');

app.use(express.json());

app.get('/api/teams', getTeams);
app.post('/api/teams', postTeam);

app.get('/api/teams/:team_id', getTeamById);
app.delete('/api/teams/:team_id', deleteTeamById);

app.get('/api/teams/:team_id/superheroes', getSuperheroesByTeamId);

app.get('/api/superheroes', getSuperheroes);

app.use((err,req,res,next)=>{
 
  if( err.code=== '22P02'){
   
     res.status(400).send({msg:'Bad request'})
  }
  next(err)
})

app.use((err, req, res, next) => {
 
  if(err.msg && err.status){    
  
    res.status(err.status).send({msg: err.msg});}
  }
  
  
);


module.exports = app;
