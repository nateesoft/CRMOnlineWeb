/* MemberShipping.route code generator by automatic script */

const express = require("express")
const router = express.Router()
const Task = require("../models/MemberShipping.model")

module.exports = args => {
  
  router.get("/", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).findAll()
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })
  
  router.post("/search", async (req, res, next) => {
    try {
      const { key, value } = req.body
      const response = await Task(req.headers.database).searchData(key, value)
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })
  
  router.get("/:member_code", async (req, res, next) => {
    try {
      const member_code = req.params.member_code
      const response = await Task(req.headers.database).findByMemberCodeOrEmail(
        member_code
      )
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })
  
  router.post("/", async (req, res, next) => {
    try {
      const { member_code } = req.body
      const response = await Task(req.headers.database).deleteByMemberCode(
        member_code
      )
      if (response.status === "Success") {
        const response2 = await Task(req.headers.database).create(req.body)
        res
          .status(200)
          .json({ status: response2.status, msg: "Success", data: req.body })
      } else {
        res
          .status(500)
          .json({ status: "Error", msg: "Cannot create member_shipping" })
      }
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
  
  router.delete("/:id", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).delete(req.params.id)
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
