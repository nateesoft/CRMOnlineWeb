const express = require("express")
const router = express.Router()
const Task = require("../models/Member.model")
const TaskLogin = require("../models/Login.model")
const moment = require("moment")

module.exports = (io) => {

  router.get("/line/:lineUserId", async (req, res, next) => {
    try {
      const lineUserId = req.params.lineUserId
      const response = await Task(req.headers.database).findByLineUserId(
        lineUserId
      )
      const data = JSON.parse(response.data)
      if (data.length > 0) {
        res
          .status(200)
          .json({ status: response.status, msg: "Success", data: data[0] })
      } else {
        res
          .status(200)
          .json({ status: response.status, msg: "Success", data: [] })
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.get("/findAll/:page/:limit", async (req, res, next) => {
    try {
      console.log("page=", req.params.page)
      console.log("limit=", req.params.limit)

      const page = req.params.page || 1
      const limit = req.params.limit || 20

      let start, end
      if (page === 1) {
        start = 0
        end = limit
      } else {
        start = (page - 1) * limit
        end = limit
      }

      const response = await Task(req.headers.database).findAll(
        parseInt(start),
        parseInt(end)
      )
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.get("/client2", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).getDataForClient()
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.put("/client2", async (req, res, next) => {
    try {
      const payload = req.body
      const response = await Task(req.headers.database).updateMemberFromClient(
        payload
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

  router.get("/:email", async (req, res, next) => {
    try {
      const email = req.params.email
      const response = await Task(req.headers.database).findByEmail(email)
      const respData = JSON.parse(response.data)
      res.status(200).json({
        status: response.status,
        msg: "Success",
        data: {
          ...respData[0],
          birthday: moment(new Date(respData[0].birthday)).format("YYYY-MM-DD")
        }
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.post("/", async (req, res, next) => {
    // check duplicate email, mobile, line_id
    const response = await Task(
      req.headers.database
    ).checkDuplicateCreateMember(req.body)
    const {
      email: input_email,
      mobile: input_mobile,
      line_id: input_line_id
    } = req.body
    const { email, mobile, line_id } = JSON.parse(response.data)
    if (email && email === input_email) {
      return res.status(400).json({
        status: "Register_Error",
        msg: `ข้อมูลอีเมล์(${input_email}) ถูกนำไปใช้แล้ว`
      })
    }
    if (mobile && mobile === input_mobile) {
      return res.status(400).json({
        status: "Register_Error",
        msg: `ข้อมูลเบอร์โทรศัพท์(${input_mobile}) ถูกนำไปใช้แล้ว`
      })
    }
    if (line_id && line_id === input_line_id) {
      return res.status(400).json({
        status: "Register_Error",
        msg: `ข้อมูลไลน์ id(${input_line_id}) ถูกนำไปใช้แล้ว`
      })
    }

    // process to create new member
    try {
      const memberModel = {
        code: req.body.code,
        uuid_index: req.body.uuid_index,
        prefix: req.body.prefix,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email,
        system_created: req.body.system_created,
        system_updated: req.body.system_updated,
        total_score: 0,
        total_purchase: req.body.total_purchase,
        point_expired_date: req.body.point_expired_date,
        expired_date: req.body.expired_date,
        birthday: req.body.birthday,
        line_id: req.body.line_id,
        line_user_id: req.body.line_user_id,
        member_role: req.body.member_role
      }
      const loginModel = {
        username: req.body.username,
        password: Buffer.from(req.body.password).toString("base64"),
        member_active: "Y"
      }
      const response = await Task(req.headers.database).create(memberModel)
      const response1 = await TaskLogin(req.headers.database).create(loginModel)
      // add mobile
      const loginMobileForm = {
        username: req.body.mobile,
        password: Buffer.from(req.body.password).toString("base64"),
        member_active: "Y"
      }

      const response2 = await TaskLogin(req.headers.database).create(loginMobileForm)

      const getMemberModel = await Task(req.headers.database).findByEmail(req.body.email)

      // emit socket io
      const sendPayload = { data: JSON.parse(getMemberModel.data), database: req.headers.database, action_status: 'create' }
      io.emit("sync_member", JSON.stringify(sendPayload))
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response2.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.put("/:id", async (req, res, next) => {
    try {
      const payload = { ...req.body, uuid_index: req.params.id }
      const response = await Task(req.headers.database).update(payload)
      const data = JSON.parse(response.data)
      
      // emit socket io
      const getMemberModel = await Task(req.headers.database).findByEmail(req.body.email)
      const sendPayload = { data: JSON.parse(getMemberModel.data), database: req.headers.database, action_status: 'update' }
      io.emit("sync_member", JSON.stringify(sendPayload))

      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  router.patch("/:id", async (req, res, next) => {
    try {
      const payload = { ...req.body, uuid_index: req.params.id }
      let response
      if (req.params.id === "change_password") {
        const { email, mobile } = req.body
        const memberResult = await Task(
          req.headers.database
        ).findByMobileAndEmail(email, mobile)
        const memberData = JSON.parse(memberResult.data)
        if (memberData.length === 0) {
          return res.status(500).json({
            status: "Error",
            msg: "Email or Mobile mismatch in system!"
          })
        }
        response = await Task(req.headers.database).changePassword({
          username: email
        }) // update new email password
        response = await Task(req.headers.database).changePassword({
          username: mobile
        }) // update new mobile password
      } else if (req.params.id === "update_line_user_id") {
        const { email } = req.body
        const memberResult = await Task(req.headers.database).findByEmail(email)
        const memberData = JSON.parse(memberResult.data)
        if (memberData.length === 0) {
          return res
            .status(500)
            .json({ status: "Error", msg: "Email mismatch in system!" })
        }
        response = await Task(req.headers.database).updateLineUserId(req.body)
      } else {
        response = await Task(req.headers.database).updateRole(payload)
      }
      const data = JSON.parse(response.data)

      // emit socket io
      const sendPayload = { data: payload, database: req.headers.database, action_status: 'update' }
      io.emit("sync_member", JSON.stringify(sendPayload))

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
