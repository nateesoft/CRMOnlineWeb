/* Orders.model code generator by automatic script */
const logger = require("../logger")
const moment = require("moment")
const pool = require("../mysql-connect")
const { getDB, zeroPad } = require("./FuncUtil")()

module.exports = (db) => {
  const module = {}
  const table_name = getDB(db, "orders")
  const tb_company = getDB(db, "company")
  const tb_carts = getDB(db, "carts")

  module.findById = (id) => {
    logger.debug(`findById: ${id}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where uuid_index=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [id])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findByCartNo = (cart_no) => {
    logger.debug(`findByCartNo: ${cart_no}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where cart_no=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [cart_no])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findAll = () => {
    logger.debug("findAll")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name};`
        logger.debug(sql)
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.searchData = (key, value) => {
    logger.debug(`searchData: ${key} ${value}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `select * from ${table_name}`
        if (key !== "") {
          sql = `${sql} where ${key} like '%${value}%'`
        }
        logger.debug(sql)
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.create = (params) => {
    logger.debug(`create: ${params}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `select order_running, order_prefix, order_size_running from ${tb_company} c limit 0,1;`
        const config = await pool.query(sql)
        const { order_prefix, order_running, order_size_running } = config[0]
        params.order_no =
          order_prefix + zeroPad(order_running, order_size_running) // generate prefix running
        params.order_create_date = moment().format("YYYY-MM-DD HH:mm:ss")

        sql = `INSERT INTO ${table_name} SET ?;`
        logger.debug(sql)
        await pool.query(sql, params)

        // update running +1
        sql = `update ${tb_company} set order_running=order_running+1`
        logger.debug(sql)
        await pool.query(sql)
        resolve({ status: "Success", data: params.order_no })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.update = (data) => {
    logger.debug(`update: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE ${table_name} 
        SET order_no=?, cart_no=?, member_code=? WHERE uuid_index=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          data.order_no,
          data.cart_no,
          data.member_code,
          data.uuid_index,
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateMemberApprove = (data) => {
    logger.debug(`updateMemberApprove: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE ${table_name} 
        SET member_code_update=?, 
        member_remark=?, 
        order_status=?,
        order_update_date='${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}',
        signature=?, 
        member_mobile=? 
        WHERE order_no=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          data.member_code_update,
          data.member_remark,
          data.order_status,
          data.signature,
          data.member_mobile,
          data.order_no,
        ])

        // update carts table
        await pool.query(
          `update ${tb_carts} set shopping_step='finish' where cart_no=?;`,
          [data.cart_no]
        )

        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.delete = (id) => {
    logger.debug(`delete: ${id}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `DELETE FROM ${table_name} WHERE uuid_index = ?;`
        logger.debug(sql)
        const result = await pool.query(sql, [id])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  return module
}
