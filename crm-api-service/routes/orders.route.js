/* Orders.route code generator by automatic script */

const express = require("express")
const router = express.Router()
const Task = require("../models/Orders.model")
const TaskOrderDetail = require("../models/OrdersDetail.model")
const TaskMember = require("../models/Member.model")

module.exports = args => {

  router.get("/", async (req, res) => {
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
  
  router.post("/search", async (req, res) => {
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
  
  router.get("/:id", async (req, res) => {
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
  
  router.get('/confirm_order/:cart_no', async (req, res)=>{
    try {
      const cart_no = req.params.cart_no
      const orders_response = await Task(req.headers.database).findByCartNo(cart_no);
      const orders = JSON.parse(orders_response.data);
      if(orders.length===0){
        return res.status(200).json({ status: response.status, msg: "Not found Order", data: [] })
      }
      const order_no = orders[0].order_no;
      const orders_detail_response = await TaskOrderDetail(req.headers.database).findByOrderNo(order_no);
      const memberProfile = await TaskMember(req.headers.database).findMemberFromCartNo(cart_no)
      const email = JSON.parse(memberProfile.data)[0].email
      const orders_detail = JSON.parse(orders_detail_response.data);
      return res.status(200).json({
        status: "Success",
        msg: "Success",
        data: {
          orders: orders[0],
          orders_detail,
          member_email: email
        },
      })
    } catch (error) {
      return res.status(500).json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })
  
  router.post("/", async (req, res) => {
    try {
      const response = await Task(req.headers.database).create(req.body)
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })
  
  router.patch("/", async (req, res) => {
    try {
      const response = await Task(req.headers.database).updateMemberApprove(req.body)
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })
  
  router.put("/", async (req, res) => {
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
  
  router.delete("/:id", async (req, res) => {
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
