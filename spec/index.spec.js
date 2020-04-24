const app = require('../app');
const request = require('supertest');
const connection = require('../db/client.js');

describe('/api', () => {
  afterAll(() => connection.end());
  describe('/houses', () => {
    test('GET:200 sends an array of houses to the client', () => {
      return request(app)
        .get('/api/houses')
        .expect(200)
        .then((response) => {
          expect(response.body.houses).toEqual(expect.any(Array));
          expect(Object.keys(response.body.houses[0])).toEqual(
            expect.arrayContaining([
              'house_id',
              'house_name',
              'founder',
              'animal',
            ])
          );
        });
    });
    test('POST:201 inserts a new house to the db and sends the new house back to the client', () => {
      return request(app)
        .post('/api/houses')
        .send({
          house_name: 'Simmeryn',
          founder: 'Tomazar Simmeryn',
          animal: 'poodle',
        })
        .expect(201)
        .then((response) => {
          expect(response.body.house).toEqual(expect.any(Object));
          expect(Object.keys(response.body.house)).toEqual(
            expect.arrayContaining([
              'house_id',
              'house_name',
              'founder',
              'animal',
            ])
          );
        });
    });
    test('POST:400 responds with an appropriate error message when provided with a bad house (no name)', () => {
      return request(app)
        .post('/api/houses')
        .send({
          founder: 'Tomazar Simmeryn',
          animal: 'poodle',
        })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });
    describe('/:house_id', () => {
      test('GET:200 sends a single house to the client', () => {
        return request(app)
          .get('/api/houses/1')
          .expect(200)
          .then((response) => {
            expect(response.body.house).toEqual(expect.any(Object));
            expect(response.body.house.house_name).toBe('Anatfindor');
          });
      });
      test('GET:404 sends an appropriate and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/houses/999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('House does not exist');
          });
      });
      test('GET:400 sends an appropriate and error message when given an invalid id', () => {
        return request(app)
          .get('/api/houses/not-a-house')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Invalid id');
          });
      });
      test('DELETE:204 deletes the specified house and sends no body back', () => {
        return request(app).delete('/api/houses/3').expect(204);
        // No "then" because a 204 status responds with no body no matter what
      });
      test('DELETE:404 responds with an appropriate error message when given a non-existent id', () => {
        return request(app)
          .delete('/api/houses/999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('House does not exist');
          });
      });
      describe('/students', () => {
        test('GET:200 sends an array of students belonging to a single house to the client', () => {
          return request(app)
            .get('/api/houses/1/students')
            .expect(200)
            .then((response) => {
              expect(response.body.students).toEqual(expect.any(Array));
              expect(Object.keys(response.body.students[0])).toEqual(
                expect.arrayContaining([
                  'student_id',
                  'student_name',
                  'house_id',
                ])
              );
              response.body.students.forEach((student) => {
                expect(student.house_id).toBe(1);
              });
            });
        });
        test('GET:200 sends an empty array of students when there are no students in the house', () => {
          return request(app)
            .get('/api/houses/4/students')
            .expect(200)
            .then((response) => {
              expect(response.body.students).toEqual([]);
            });
        });
        test('GET:404 sends an appropriate and error message when given a valid but non-existent id', () => {
          return request(app)
            .get('/api/houses/999/students')
            .expect(404)
            .then((response) => {
              expect(response.body.msg).toBe('House does not exist');
            });
        });
      });
    });
  });
  describe('/students', () => {
    // test("GET:200 sends an array of all students to the client", () => {
    //    Your turn...
    // });
  });
});
