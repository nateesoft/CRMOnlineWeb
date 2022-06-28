const chai = require("chai")
const chaiHttp = require("chai-http")

const server = require("../../app")
const { auth } = require("./constants")

chai.use(chaiHttp)
chai.should()

describe("GET /api/", () => {
  it("get default route /api/ should have success", (done) => {
    chai
      .request(server)
      .get("/api/")
      .set("Authorization", auth)
      .end((e, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it("get version route /api/version should have success", (done) => {
    chai
      .request(server)
      .get("/api/version")
      .set("Authorization", auth)
      .end((e, res) => {
        res.should.be.json
        res.should.have.status(200)
        res.body.should.have.property("message").eql("1.0.0")
        done()
      })
  })

  it("get version route /api/qrcode/:msg should have success", (done) => {
    chai
      .request(server)
      .get("/api/qrcode/12345")
      .set("Authorization", auth)
      .end((e, res) => {
        res.should.have.status(200)
        res.should.have.header('content-type', 'image/png')
        done()
      })
  })
})
