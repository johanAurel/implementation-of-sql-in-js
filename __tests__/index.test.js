const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seed');
const superheroesData = require('../db/data/superheroes');
const teamsData = require('../db/data/teams');

beforeEach(() => seed({ superheroesData, teamsData }));
afterAll(() => db.end());

describe('/api/teams', () => {
  test('GET:200 sends an array of teams to the client', () => {
    return request(app)
      .get('/api/teams')
      .expect(200)
      .then((response) => {
        expect(response.body.teams.length).toBe(4);
        response.body.teams.forEach((team) => {
          expect(typeof team.team_id).toBe('number');
          expect(typeof team.team_name).toBe('string');
          expect(typeof team.formation_year).toBe('number');
        });
      });
  });
  test('POST:201 inserts a new team to the db and sends the new team back to the client', () => {
    const newTeam = {
      team_name: 'Inhumans',
      formation_year: 1965
    };
    return request(app)
      .post('/api/teams')
      .send(newTeam)
      .expect(201)
      .then((response) => {
        expect(response.body.team.team_id).toBe(5);
        expect(response.body.team.team_name).toBe('Inhumans');
        expect(response.body.team.formation_year).toBe(1965);
      });
  });
  test('POST:400 responds with an appropriate status and error message when provided with a bad team (no team name)', () => {
    return request(app)
      .post('/api/teams')
      .send({
        formation_year: 1982
      })
      .expect(400)
      .then((response) => {
        console.log(response.body, '<---response')
        expect(response.body.msg).toBe('Bad request');

      });
  });
});

describe('/api/teams/:team_id', () => {
  test('GET:200 sends a single team to the client', () => {
    return request(app)
      .get('/api/teams/1')
      .expect(200)
      .then((response) => {
        expect(response.body.team.team_id).toBe(1);
        expect(response.body.team.team_name).toBe('X-Men');
        expect(response.body.team.formation_year).toBe(1963);
      });
  });
  test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
    return request(app)
      .get('/api/teams/999')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('team does not exist');
      });
  });
  test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
    return request(app)
      .get('/api/teams/not-a-team')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('DELETE:204 deletes the specified team and sends no body back', () => {
    return request(app)
    .delete('/api/teams/3')
    .expect(204);
    // No "then" because a 204 status responds with no body no matter what
  });
  test('DELETE:404 responds with an appropriate status and error message when given a non-existent id', () => {
    return request(app)
      .delete('/api/teams/999')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('team does not exist');
      });
  });
  test('DELETE:400 responds with an appropriate status and error message when given an invalid id', () => {
    return request(app)
      .delete('/api/teams/not-a-team')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});

describe.only('/api/teams/:team_id/superheroes', () => {
  test('GET:200 sends an array of superheroes belonging to a single team to the client', () => {
    return request(app)
      .get('/api/teams/1/superheroes')
      .expect(200)
      .then((response) => {
        expect(response.body.superheroes.length).toBe(3);
        response.body.superheroes.forEach((superhero) => {
          expect(typeof superhero.superhero_id).toBe('number');
          expect(typeof superhero.alias).toBe('string');
          expect(typeof superhero.real_name).toBe('string');
          expect(typeof superhero.is_identity_secret).toBe('boolean');
          expect(typeof superhero.image_url).toBe('string');
          expect(superhero.team_id).toBe(1);
        });
      });
  });
  test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
    return request(app)
      .get('/api/teams/999/superheroes')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('team does not exist');
      });
  });
  test('GET:400 responds with an appropriate error message when given an invalid id', () => {
    return request(app)
      .get('/api/teams/not-an-id/superheroes')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});

describe('/api/superheroes', () => {
  test("GET:200 sends an array of all superheroes to the client", () => {
  //    Your turn...
   });
});
