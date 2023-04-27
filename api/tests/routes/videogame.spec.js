/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  released: "2014-12-12",
  image:
    "https://media.rawg.io/media/screenshots/c10/c10c65a7fc1f383a22d2f931c5c492b4.jpg",
  platforms: ["iOS", "PC"],
  genres:['Family','Puzzle'],
  rating:2,
  description:'A very handsome game'
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
  });
});
