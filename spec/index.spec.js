const { expect } = require("chai");
const app = require("../app");
const request = require("supertest");
const connection = require("../db/client.js");

describe("/api", () => {
  after(() => connection.end());
  describe("/houses", () => {
    it("GET:200 sends an array of houses to the client", () => {
      return request(app)
        .get("/api/houses")
        .expect(200)
        .then(response => {
          expect(response.body.houses).to.be.an("array");
          expect(response.body.houses[0]).to.have.keys([
            "house_id",
            "house_name",
            "founder",
            "animal"
          ]);
        });
    });
    it("POST:201 inserts a new house to the db and sends the new house back to the client", () => {
      return request(app)
        .post("/api/houses")
        .send({
          house_name: "Simmeryn",
          founder: "Tomazar Simmeryn",
          animal: "poodle"
        })
        .expect(201)
        .then(response => {
          expect(response.body.house).to.be.an("object");
          expect(response.body.house).to.have.keys([
            "house_id",
            "house_name",
            "animal",
            "founder"
          ]);
        });
    });
    it("POST:400 responds with an appropriate error message when provided with a bad house (no name)", () => {
      return request(app)
        .post("/api/houses")
        .send({
          founder: "Tomazar Simmeryn",
          animal: "poodle"
        })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Bad request");
        });
    });
    describe("/:house_id", () => {
      it("GET:200 sends a single house to the client", () => {
        return request(app)
          .get("/api/houses/1")
          .expect(200)
          .then(response => {
            expect(response.body.house).to.be.an("object");
            expect(response.body.house.name).to.equal("Anatfindor");
          });
      });
      it("GET:404 sends an appropriate and error message when given a valid but non-existent id", () => {
        return request(app)
          .get("/api/houses/999")
          .expect(404)
          .then(response => {
            expect(response.body.message).to.equal("does not exist");
          });
      });
      it("GET:400 sends an appropriate and error message when given an invalid id", () => {
        return request(app)
          .get("/api/houses/not-a-house")
          .expect(400)
          .then(response => {
            expect(response.body.message).to.equal("bad id");
          });
      });
      it("DELETE:204 deletes the specified house and sends no body back", () => {
        return request(app)
          .delete("/api/houses/1")
          .expect(204);
        // No "then" because a 204 status responds with no body no matter what
      });
      it("DELETE:404 responds with an appropriate error message when given a non-existent id", () => {
        return request(app)
          .delete("/api/houses/999")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("house does not exist");
          });
      });
      describe("/students", () => {
        it("GET:200 sends an array of students belonging to a single house to the client", () => {
          return request(app)
            .get("/api/students/1")
            .expect(200)
            .then(response => {
              expect(response.body.students).to.be.an("array");
              expect(response.body.students[0]).to.have.keys([
                "student_id",
                "student_name",
                "house_id"
              ]);
              response.body.students.forEach(student => {
                expect(student.house_id).to.equal(1);
              });
            });
        });
        it("GET:200 sends an empty array of students when there are no students in the house", () => {
          return request(app)
            .get("/api/students/999")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.equal("house does not exist");
            });
        });
      });
    });
  });
  describe("/students", () => {
    // it("GET:200 sends an array of all students to the client", () => {
    //    Your turn...
    // });
  });
});
