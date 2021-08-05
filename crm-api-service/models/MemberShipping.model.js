/* MemberShipping.model code generator by automatic script */
const logger = require('../logger');
const pool = require("../mysql-connect")
const { getDB } = require("./FuncUtil")()

module.exports = (db) => {
  const module = {}
  const table_name = getDB(db, "member_shipping")
  const tableMember = getDB(db, "member")

  module.findByMemberCode = (member_code) => {
    logger.debug(`findByMemberCode: ${member_code}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where member_code=?;`;
        logger.debug(sql);
        const result = await pool.query(sql, [member_code])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findByMemberCodeOrEmail = (member_code) => {
    logger.debug(`findByMemberCodeOrEmail: ${member_code}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} ms 
        inner join ${tableMember} m on ms.member_code =m.code 
        where m.code=? or m.email =?;`;
        logger.debug(sql);
        const result = await pool.query(sql, [member_code, member_code])
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
        const sql = `select * from ${table_name};`;
        logger.debug(sql);
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
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
          sql = `${sql} where ${key} like '%${value}%'`;
        }
        logger.debug(sql);
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.create = (params) => {
    logger.debug(`create: ${params}`)
    return new Promise(async (resolve, reject) => {
      try {
        delete params.create;//remove create property :)
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

  module.update = (data) => {
    logger.debug(`update: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE ${table_name} SET 
        map_latitude=?,
        map_longitude=?,
        address_type=?,
        member_name=?,
        address1=?,
        address2=?,
        sub_district=?,
        district=?,
        province=?,
        postcode=?,
        member_lastname=?,
        member_prefix =? 
        WHERE member_code=?;`;
        logger.debug(sql);
        const result = await pool.query(sql, [
          data.map_latitude,
          data.map_longitude,
          data.address_type,
          data.member_name,
          data.address1,
          data.address2,
          data.sub_district,
          data.district,
          data.province,
          data.postcode,
          data.member_lastname,
          data.member_prefix,
          data.member_code,
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

  module.deleteByMemberCode = (member_code) => {
    logger.debug(`deleteByMemberCode: ${member_code}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `DELETE FROM ${table_name} WHERE member_code = ?;`;
        logger.debug(sql);
        await pool.query(sql, [member_code])
        resolve({ status: "Success", data: JSON.stringify(member_code) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  return module
}
