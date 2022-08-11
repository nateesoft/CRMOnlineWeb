const express = require("express")
const QRCode = require("qrcode")
const router = express.Router()
const fs = require("fs")

const utils = require('../utils/fileUtil');

module.exports = (args) => {
  router.get("/", (req, res) => {
    res.status(200).render("index", { title: "API CRM Online" })
  })

  router.get("/version", (req, res) => {
    res.status(200).send({ type: "SUCCESS", message: "1.0.0" })
  })

  router.get("/qrcode/:msg", async (req, res) => {
    try {
      const qrCodeText = req.params.msg
      if (req.xhr) {
        const url = await QRCode.toDataURL(qrCodeText)
        res.json({ url })
      } else {
        const { imagePath } = args
        const src = `${imagePath}/qrcode.png`
        const exists = await utils.fileExists(src)
        if (!exists) {
          const stream = fs.createWriteStream(src)
          const code = await QRCode.toFileStream(stream, qrCodeText)
        }
        res.setHeader('Content-type', 'image/png')
        res.sendFile(src)
      }
    } catch (err) {
      res.json(err)
    }
  })

  return router
}
