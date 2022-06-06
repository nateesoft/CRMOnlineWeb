const express = require("express")
const moment = require("moment")
const router = express.Router()
const cc = require("coupon-code")
const Task = require("../models/Promotion.model")
const TaskRedeem = require("../models/Redeem.model")

const generateRedeemCode = () => {
  return cc.generate()
}

module.exports = (io) => {

  router.get("/", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).findShowUser()
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.get("/list", async (req, res, next) => {
    try {
      const response = await TaskRedeem(req.headers.database).findAll()
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.get("/client", async (req, res, next) => {
    try {
      const response = await TaskRedeem(req.headers.database).getDataForClient()
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.put("/client", async (req, res, next) => {
    try {
      const payload = req.body
      const response = await TaskRedeem(req.headers.database).updateRedeemFromClient(payload)
      const data = JSON.parse(response.data)
      // io.emit('update_member', true);
      // io.emit('update_redeem', true);
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.post("/", async (req, res, next) => {
    try {
      const { uuid_index, product_code, member_code_use } = req.body
      const response = await Task(req.headers.database).findByCode(product_code)
      const promotion = JSON.parse(response.data)[0]
      const redeemCodeGen = generateRedeemCode()

      const redeemModel = {
        uuid_index,
        redeem_code: redeemCodeGen,
        product_code,
        redeem_name: promotion.redeem_name,
        point_to_redeem: promotion.point_to_redeem,
        use_in_branch: "",
        emp_code_redeem: "",
        member_code_use,
        qty_in_use: 1,
        system_create: moment().format("YYYY-MM-DD HH:mm:ss"),
        redeem_date: null, // update agian from active status
        in_time: moment().add(30, "minutes").format("YYYY-MM-DD HH:mm:ss"),
        status_use: "in_progress", // in_progress|success|expired
        active: "Y", // Y|N
        redeem_or_free: promotion.redeem_or_free, // (R)edeem or (F)ree
        discount_amt: promotion.discount_amt,
        discount_percent: promotion.discount_percent
      }
      
      const response1 = await TaskRedeem(req.headers.database).create(payload)

      // emit socket io
      const sendPayload = { ...redeemModel, database: req.headers.database, status: 'create' }
      io.emit("sync_redeem", JSON.stringify(sendPayload))

      res.status(200).json({ status: response1.status, msg: "Success", data: "" + redeemCodeGen })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  return router
}
