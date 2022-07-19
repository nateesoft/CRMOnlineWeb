const express = require("express")
const router = express.Router()
const Task = require("../models/Promotion.model")

module.exports = () => {
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

  router.get("/:id", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).findById(req.params.id)
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.get("/product/:code", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).validPromotion(req.params.code)
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
      const response = await Task(req.headers.database).create(req.body)
      const data = JSON.parse(response.data)
      // io.emit('update_redeem', true);
      res.status(200).json({ status: response.status, msg: "Success", data })
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
      // io.emit('update_redeem', true);
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.patch("/", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).updatePromotionUse(req.body)
      const data = JSON.parse(response.data)
      // io.emit('update_redeem', true);
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
      // io.emit('update_redeem', true);
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  return router
}
