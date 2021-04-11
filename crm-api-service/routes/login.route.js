const express = require("express")
const router = express.Router()
const Task = require("../models/Login.model")

module.exports = (args) => {
  router.post("/", async (req, res, next) => {
    try {
      const { email: username, mobile, password, type } = req.body
      let response = {}
      if (type === "email") {
        response = await Task(req.headers.database).validLogin(
          username,
          password
        )
      } else {
        response = await Task(req.headers.database).validLoginMobile(
          mobile,
          password
        )
      }
      if (response.status === "Success") {
        return res.status(200).json({ status: response.status, msg: "Success" })
      } else if (response.status === "Missing Role") {
        return res
          .status(200)
          .json({
            status: response.status,
            msg: "Member not found role mapping",
          })
      }
      return res
        .status(200)
        .json({ status: response.status, msg: "Username/Password invalid" })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.put("/", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).update(req.body)
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  return router
}
