const QrCode = require("qrcode-reader")
const Jimp = require("jimp")
const request = require("request")

module.exports = {
  checkImage: (sourceFile) => {
    return new Promise((resolve, reject) => {
      Jimp.read(sourceFile, function (err, image) {
        if (err) {
          return reject({ status: "Error", msg: "Not found images" })
        }

        const qr = new QrCode()
        qr.callback = (err2, value) => {
          if (err2) {
            console.log("Error to read qrcode:", err2)
            return reject({
              status: "Error",
              msg: err2
            })
          }
          resolve(value.result)
          console.log(value.result)
        }
        qr.decode(image.bitmap)
      })
    })
  },
  validateImage: (url) => {
    return new Promise((resolve, reject) => {
      request({ url, encoding: null }, (err, resp, buffer) => {
        Jimp.read(buffer, (err, image) => {
          if (err) {
            return reject({ status: "Error", msg: err })
          }
          const qr = new QrCode()
          qr.callback = (err2, value) => {
            if (err2) {
              console.log("Error to read qrcode:", err2)
              return reject({
                status: "Error",
                msg: err2
              })
            }
            resolve(value.result)
            console.log(value.result)
          }
          qr.decode(image.bitmap)
        })
      })
    }) // end promise
  }
}
