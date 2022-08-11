const express = require("express")
const multer = require("multer")

const router = express.Router()
const fs = require("fs")

const upload = multer({ dest: "./upload/" })

module.exports = (options) => {
  router.post("/upload", upload.single("file"), (req, res) => {
    try {
      const filename = req.file.filename
      const old_file = `./upload/${filename}`
      const new_file = `./public/images/${req.file.originalname}`

      fs.rename(old_file, new_file, function (err) {
        if (err) throw err
        console.log("File Renamed.")
      })

      res.status(200).send({ status: "Success", msg: "Upload Success" })
    } catch (error) {
      return res
        .status(500)
        .json({ status: "Internal Server Error", msg: error.sqlMessage })
    }
  })

  return router;
}
