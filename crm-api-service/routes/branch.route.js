const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Task = require("../models/Branch.model");

module.exports = args => {
  /**
   * @swagger
   *
   * /branch:
   *  get:
   *    tags:
   *      - Branch
   *    description: Show all branch list
   *    parameters:
   *      - name: database
   *        type: string
   *        in: header
   *        required: true
   *    responses:
   *      '200':
   *        description: A successful response
   *      '401':
   *        description: Unauthoriztion API request
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/", async (req, res, next) => {
    try {
      const response = await Task(req.headers.database).findAll();
      const data = JSON.parse(response.data)
      return res.status(200).json({ status: 200, msg: "Success", data })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
    
  })
  
  /**
   * @swagger
   * 
   * /branch/{id}:
   *  get:
   *    tags:
   *      - Branch
   *    description: Show all branch list
   *    parameters:
   *      - name: database
   *        type: string
   *        in: header
   *        required: true
   *      - name: id
   *        type: string
   *        in: path
   *    responses:
   *      '200':
   *        description: A successful response
   *      '401':
   *        description: Unauthoriztion API request
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'Error', errors: errors.array() });
    }
    try {
      const id = req.params.id;
      const result = await Task(req.headers.database).findById(id)
      return res.status(result.status).json({
        status: result.status, 
        msg: result.message, 
        error: result.error,
        data: result.data
      })
    } catch (error) {
      return res.status(error.status).json({
        status: error.status, 
        msg: error.message, 
        error: error.error,
        data: error.data
      })
    }
  })

  /**
   * @swagger
   * 
   * /branch/getcode/{id}:
   *  get:
   *    tags:
   *      - Branch
   *    description: Show all branch list
   *    parameters:
   *      - name: database
   *        type: string
   *        in: header
   *        required: true
   *      - name: id
   *        type: string
   *        in: path
   *    responses:
   *      '200':
   *        description: A successful response
   *      '401':
   *        description: Unauthoriztion API request
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/getcode/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const result = await Task(req.headers.database).findByCode(code)
      return res.status(200).json({
        status: result.status, 
        msg: result.message, 
        error: result.error,
        data: result.data
      })
    } catch (error) {
      return res.status(error.status).json({
        status: error.status, 
        msg: error.message, 
        error: error.error,
        data: error.data
      })
    }
    
  })
  
  /**
   * @swagger
   * 
   * /branch:
   *  post:
   *    tags:
   *      - Branch
   *    description: Create new branch
   *    parameters:
   *      - name: branch input
   *        in: body
   *        description: Branch input to create
   *        schema:
   *          type: object
   *          properties:
   *            code:
   *              type: string
   *            name:
   *              type: string
   *            map_latitude:
   *              type: number
   *            map_longitude:
   *              type: number
   *      - name: database
   *        type: string
   *        in: header
   *        required: true
   *    responses:
   *      '200':
   *        description: A successful response
   *      '401':
   *        description: Unauthoriztion API request
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/", [
    body('code').not().isEmpty().trim(),
    body('name').not().isEmpty().trim(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'Error', 
        errors: errors.array() 
      });
    }

    // find data exists or not
    const { code } = req.body;
    const foundCode = await Task(req.headers.database).findByCode(code)
    if(foundCode.length>0){
      return res
      .status(400)
      .json({ status: "Information Incorrect", msg: 'Code is already exists' })
    }
  
    try {
      const result = await Task(req.headers.database).create(req.body)
      return res.status(result.status).json({
        status: result.status, 
        msg: result.message, 
        error: result.error,
        data: result.data
      })
    } catch (error) {
      return res.status(error.status).json({
        status: error.status, 
        msg: error.message, 
        error: error.error,
        data: error.data
      })
    }
  })
  
  /**
   * @swagger
   * 
   * /branch/{id}:
   *  put:
   *    tags:
   *      - Branch
   *    description: Update old branch
   *    parameters:
   *      - name: branch input
   *        in: body
   *        description: Branch input to update
   *        schema:
   *          type: object
   *          properties:
   *            code:
   *              type: string
   *            name:
   *              type: string
   *            map_latitude:
   *              type: number
   *            map_longitude:
   *              type: number
   *      - name: database
   *        type: string
   *        in: header
   *        required: true
   *      - name: id
   *        type: string
   *        in: path
   *    responses:
   *      '200':
   *        description: A successful response
   *      '401':
   *        description: Unauthoriztion API request
   *      '500':
   *        description: Internal Server Error
   */
  router.put("/:id", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'Error', errors: errors.array() });
    }
    try {
      const payload = {...req.body, uuid_index: req.params.id}
      const result = await Task(req.headers.database).update(payload)
      return res.status(result.status).json({
        status: result.status, 
        msg: result.message, 
        error: result.error,
        data: result.data
      })
    } catch (error) {
      return res.status(error.status).json({
        status: error.status, 
        msg: error.message, 
        error: error.error,
        data: error.data
      })
    }
  })
  
  /**
   * @swagger
   * 
   * /branch/{id}:
   *  patch:
   *    tags:
   *      - Branch
   *    description: Update old branch
   *    parameters:
   *      - name: branch input
   *        in: body
   *        description: Branch input to update
   *        schema:
   *          type: object
   *          properties:
   *            map_latitude:
   *              type: number
   *            map_longitude:
   *              type: number
   *      - name: database
   *        type: string
   *        in: header
   *        required: true
   *      - name: id
   *        type: string
   *        in: path
   *    responses:
   *      '200':
   *        description: A successful response
   *      '401':
   *        description: Unauthoriztion API request
   *      '500':
   *        description: Internal Server Error
   */
  router.patch("/:id", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'Error', errors: errors.array() });
    }
    try {
      const payload = {...req.body, uuid_index: req.params.id}
      const result = await Task(req.headers.database).updatePatch(payload)
      return res.status(result.status).json({
        status: result.status, 
        msg: result.message, 
        error: result.error,
        data: result.data
      })
    } catch (error) {
      return res.status(error.status).json({
        status: error.status, 
        msg: error.message, 
        error: error.error,
        data: error.data
      })
    }
  })
  
  /**
   * @swagger
   * 
   * /branch/{id}:
   *  delete:
   *    tags:
   *      - Branch
   *    description: Delete branch by id
   *    parameters:
   *      - name: database
   *        type: string
   *        in: header
   *        required: true
   *      - name: id
   *        type: string
   *        in: path
   *    responses:
   *      '200':
   *        description: A successful response
   *      '401':
   *        description: Unauthoriztion API request
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/:id", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'Error', errors: errors.array() });
    }
    try {
      const result = await Task(req.headers.database).delete(req.params.id)
      return res.status(result.status).json({
        status: result.status, 
        msg: result.message, 
        error: result.error,
        data: result.data
      })
    } catch (error) {
      return res.status(error.status).json({
        status: error.status, 
        msg: error.message, 
        error: error.error,
        data: error.data
      })
    }
  })
  
  return router
}
