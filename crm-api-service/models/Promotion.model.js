const logger = require('../logger');
const pool = require("../mysql-connect")
const { getDB } = require("./FuncUtil")()

module.exports = (db) => {
  const module = {}
  const table_name = getDB(db, "promotion")

  module.findByCode = (code) => {
    logger.debug(`findByCode: ${code}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select *,
        DATE_FORMAT(start_time, '%Y-%m-%d') start_time,
        DATE_FORMAT(finish_time, '%Y-%m-%d') finish_time 
        from ${table_name} where product_code=?;`;
        logger.debug(sql);
        const result = await pool.query(sql, [code])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.validPromotion = (code) => {
    logger.debug(`validPromotion: ${code}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select product_code, qty_in_stock from ${table_name} where product_code=?`;
        logger.debug(sql);
        const result = await pool.query(sql, [code])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findById = (id) => {
    logger.debug(`findById: ${id}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select *,
        DATE_FORMAT(start_time, '%Y-%m-%d') start_time,
        DATE_FORMAT(finish_time, '%Y-%m-%d') finish_time 
        from ${table_name} where uuid_index=?;`;
        logger.debug(sql);
        const result = await pool.query(sql, [id])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findAll = () => {
    logger.debug("findAll")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select *,
        DATE_FORMAT(start_time, '%Y-%m-%d') start_time,
        DATE_FORMAT(finish_time, '%Y-%m-%d') finish_time 
        from ${table_name};`;
        logger.debug(sql);
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findShowUser = () => {
    logger.debug("findShowUser")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select *,
        DATE_FORMAT(start_time, '%Y-%m-%d') start_time,
        DATE_FORMAT(finish_time, '%Y-%m-%d') finish_time 
        from ${table_name} 
        where (curdate() between start_time  and finish_time);`;
        logger.debug(sql);
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.create = async (params) => {
    logger.debug(`create: ${params}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `INSERT INTO ${table_name} SET ?;`;
        logger.debug(sql);
        const result = await pool.query(sql, params)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updatePromotionUse = (data) => {
    logger.debug(`updatePromotionUse: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE ${table_name} 
        SET qty_in_stock=qty_in_stock-1 
        WHERE product_code=?;`;
        const result = await pool.query(sql, [ data.product_code ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.update = (data) => {
    logger.debug(`update: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE ${table_name} SET 
        product_code=?,
        redeem_name=?,
        point_to_redeem=?,
        start_time=?,
        finish_time=?,
        img_path=?,
        redeem_or_free=?,
        discount_amt=?,
        discount_percent=? 
        WHERE uuid_index=?;`;
        const result = await pool.query(sql, [
          data.product_code,
          data.redeem_name,
          data.point_to_redeem,
          data.start_time,
          data.finish_time,
          data.img_path,
          data.redeem_or_free,
          data.discount_amt,
          data.discount_percent,
          data.uuid_index,
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.delete = (id) => {
    logger.debug(`delete: ${id}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `DELETE FROM ${table_name} WHERE uuid_index = ?;`;
        logger.debug(sql);
        const result = await pool.query(sql, [id])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  return module
}
