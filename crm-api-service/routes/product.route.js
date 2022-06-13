const express = require("express")
const router = express.Router()
const Task = require("../models/Product.model")

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
  
  router.get("/:id/:data", async (req, res, next) => {
    try {
      const { id, data: dataSearch } = req.params;
      let response = {};
      if(id==='search'){
        if(dataSearch==='no_data'){
          response = await Task(req.headers.database).findAll()
        }else{
          response = await Task(req.headers.database).search(dataSearch);
        }
      }else{
        response = await Task(req.headers.database).findById(id)
      }
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
      // find data exists or not
      const { code } = req.body;
      const foundCode = await Task(req.headers.database).findByCode(code)
      const result = JSON.parse(foundCode.data);
      if(result.length>0){
        return res
        .status(400)
        .json({ status: "Information Incorrect", msg: 'Code is already exists' })
      }
      const response = await Task(req.headers.database).create(req.body)
      const data = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })
  
  router.post("/save_list", async (req, res, next) => {
    try {
      // find data exists or not
      const { headers, data } = req.body;
      headers.push('uuid_index')
      const response = await Task(req.headers.database).createList(headers, data)
      const responseData = JSON.parse(response.data)
      res.status(200).json({ status: response.status, msg: "Success", responseData })
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
  
  return router
}
