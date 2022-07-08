/* Carts.route code generator by automatic script */

const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const moment = require("moment")
const Task = require("../models/Carts.model")
const MemberTask = require("../models/Member.model")
const TaskDetail = require("../models/CartsDetail.model")
const TaskOrders = require("../models/Orders.model")
const TaskOrdersDetail = require("../models/OrdersDetail.model")

module.exports = (io) => {
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

  router.get("/find-cart/:type/:member_code", async (req, res, next) => {
    try {
      const { type, member_code } = req.params
      let response
      if (type === "approve") {
        response = await Task(req.headers.database).findStatusApprove(
          member_code
        )
      } else {
        response = await Task(req.headers.database).findStatusNotApprove(
          member_code
        )
      }
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.get("/findByMember/:member_code", async (req, res, next) => {
    try {
      const member_code = req.params.member_code
      const response = await Task(req.headers.database).findAllByMember(
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

  router.post("/payment", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).updatePayment(req.body)
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.patch("/shopping_step", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).updateShoppingStep(
        req.body
      )
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.patch("/update-branch-shipping", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).updateBranchShipping(
        req.body
      )
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.patch("/payment-transport-amt", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).updateTransportAmount(
        req.body
      )
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.patch("/slip_path", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).updateSlipPath(req.body)
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.patch("/shopping_approve", async (req, res, next) => {
    try {
      const { cart_no, shopping_step, member_code } = req.body
      await Task(req.headers.database).updateShoppingApprove(req.body)

      if (shopping_step === "approve") {
        // copy to orders tables
        const Carts = await Task(req.headers.database).findByCartNo(
          req.body.cart_no
        )
        const CartsParse = JSON.parse(Carts.data)[0]
        const CartsData = {
          ...CartsParse,
          cart_create_date: moment(
            new Date(CartsParse.cart_create_date)
          ).format("YYYY-MM-DD HH:mm:ss"),
          emp_update_date: moment().format("YYYY-MM-DD HH:mm:ss"),
          uuid_index: uuidv4(),
        }
        const order_no = await TaskOrders(req.headers.database).create(
          CartsData
        )

        // copy to orders_detail tables
        const CartsDetail = await TaskDetail(req.headers.database).findByCartNo(
          req.body.cart_no
        )
        const CartsDetailData = JSON.parse(CartsDetail.data)
        for (let i = 0; i < CartsDetailData.length; i += 1) {
          const dataIns = {
            ...CartsDetailData[i],
            order_no: order_no.data,
          }
          await TaskOrdersDetail(req.headers.database).create(dataIns)
        }

        // update point to customer
        await Task(req.headers.database).updatePointAndPurchaseToCustomer({
          cart_no,
          member_code,
        })

        // emit socket io
        const getMemberModel = await MemberTask(req.headers.database).findByMemberCode(member_code)
        const sendPayload = { data: JSON.parse(getMemberModel.data), database: req.headers.database, action_status: 'update' }
        io.emit("sync_member", JSON.stringify(sendPayload))

        return res.status(200).json({
          status: "Success",
          msg: "Create Order Success",
        })
      }

      // update other status
      return res.status(200).json({
        status: "Success",
        msg: `Update status cart to ${shopping_step}`,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.get("/:cart_no", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).findByCartNo(
        req.params.cart_no
      )
      const carts = JSON.parse(response.data)
      const response2 = await TaskDetail(req.headers.database).findByCartNo(
        req.params.cart_no
      )
      const carts_detail = JSON.parse(response2.data)
      res.status(200).json({
        status: response.status,
        msg: "Success",
        data: { carts, carts_detail },
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.post("/", async (req, res, next) => {
    try {
      const { carts, carts_detail } = req.body
      await Task(req.headers.database).create(carts)

      // create cart_detail
      await TaskDetail(req.headers.database).create({
        ...carts_detail,
        cart_no: carts.cart_no,
      })

      // update summary carts
      await Task(req.headers.database).updateSummary({ cart_no: carts.cart_no })
      let response = await Task(req.headers.database).findByCartNo(
        carts.cart_no
      )
      // return success create cart order
      res.status(200).json({
        status: "Success",
        msg: "Success",
        data: JSON.parse(response.data),
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.put("/", async (req, res, next) => {
    try {
      const { carts, carts_detail } = req.body
      const response = await TaskDetail(req.headers.database).findByProduct(
        carts_detail.product_code,
        carts.cart_no
      )
      const result = JSON.parse(response.data)

      if (result.length > 0) {
        const carts_upd = {
          uuid_index: result[0].uuid_index,
          qty: carts_detail.qty + result[0].qty,
          total_amount: carts_detail.total_amount + result[0].total_amount,
          options: carts_detail.options,
          special_text: carts_detail.special_text,
          point: carts_detail.point + result[0].point,
        }

        // update summary
        await TaskDetail(req.headers.database).update({
          ...carts_detail,
          ...carts_upd,
        })
        await Task(req.headers.database).updateSummary({
          cart_no: carts.cart_no,
        })

        // find by cart no again
        const response3 = await Task(req.headers.database).findByCartNo(
          carts.cart_no
        )
        const data = JSON.parse(response3.data)[0]
        res.status(200).json({ status: response3.status, msg: "Success", data })
      } else {
        await TaskDetail(req.headers.database).create({
          ...carts_detail,
          cart_no: carts.cart_no,
        })
        await Task(req.headers.database).updateSummary({
          cart_no: carts.cart_no,
        })
        const response = await Task(req.headers.database).findByCartNo(
          carts.cart_no
        )

        // return success create cart order
        const data = JSON.parse(response.data)[0]
        res.status(200).json({ status: response.status, msg: "Success", data })
      }
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

  router.post("/load-cart-to-shopping", async (req, res, next) => {
    try {
      const { cart_no } = req.body
      let response = await Task(req.headers.database).findByCartToShopping(cart_no);
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
