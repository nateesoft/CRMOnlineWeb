const express = require("express")
const router = express.Router()
const Task = require("../models/RoleMapping.model")

module.exports = () => {

  router.post("/auth", async (req, res, next) => {
    try {
      const { user, path } = req.body;
      let newPath = path.replace('/:cart_no', '')
      const response = await Task(req.headers.database).findByUsernameAndPath(user, newPath);
      const data = JSON.parse(response.data)
      if(data.length > 0){
        res.status(200).json({ status: 'Allow', msg: "Authentication Pass"})
      } else {
        res.status(200).json({ status: 'No', msg: "Access Denied"})
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })
  
  return router
}
