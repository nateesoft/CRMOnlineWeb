const express = require("express")
const router = express.Router()
const Task = require("../models/MemMaster")

/* GET employ listing. */
router.post("/login", (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  Task.validLogin(username, password, (err, response) => {
    if (err) {
      res.status(500).json({ status: "Error", msg: err.sqlMessage || err.errno })
    } else {
      if (response.status === "Invalid") {
        res.status(200).json({
          status: response.status,
          msg: "Username/Password invalid",
        })
      } else {
        const data = JSON.parse(response.data)[0]
        res.status(200).json({
          status: response.status,
          msg: "Success",
          data: {
            prefix: data.Member_TitleNameThai,
            firstName: data.Member_FirstName,
            lastName: data.Member_LastName,
            pointBalance: data.Member_TotalScore,
            pointRedemption: data.Member_TotalPurchase,
          },
        })
      }
    }
  })
})

router.post("/", (req, res, next) => {
  Task.create(req.body, (err, rows) => {
    if (err) {
      res.status(500).json({ status: "Error", msg: err.sqlMessage || err.errno })
    } else {
      res.status(200).json({ data: rows.affectedRows })
    }
  })
})

module.exports = router
