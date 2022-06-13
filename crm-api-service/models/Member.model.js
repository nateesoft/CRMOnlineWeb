const logger = require("../logger")
const pool = require("../mysql-connect")
const { zeroPad, getDB } = require("./FuncUtil")()

module.exports = (db) => {
  const module = {}
  const table_name = getDB(db, "member")
  const tb_company = getDB(db, "company")
  const tb_login = getDB(db, "login")
  const tb_orders = getDB(db, "orders")

  module.checkDuplicateCreateMember = (data) => {
    logger.debug(`checkDuplicateCreateMember: ${data}`)
    return new Promise(async (resolve, reject) => {
      const { email, mobile, line_id } = data
      try {
        const sql = `select email, mobile, line_id from ${table_name} 
        where email=? or mobile=? or line_id=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [email, mobile, line_id])
        if (result.length > 0) {
          return resolve({ status: "Success", data: JSON.stringify(result[0]) })
        }
        return resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findByLineUserId = (lineUserId) => {
    logger.debug(`findByLineUserId: ${lineUserId}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where line_user_id=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [lineUserId])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

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

  module.findMemberFromCartNo = (cartNo) => {
    logger.debug(`findMemberFromCartNo: ${cartNo}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select m.email from ${tb_orders} o 
                    inner join ${table_name} m on o.member_code = m.code 
                    where o.cart_no ='${cartNo}';`
        logger.debug(sql)
        const result = await pool.query(sql, [cartNo])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findByEmail = (email) => {
    logger.debug(`findByEmail: ${email}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where email=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [email])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findByMobileAndEmail = (email, mobile) => {
    logger.debug(`findByMobileAndEmail: ${email} ${mobile}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where email=? and mobile=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [email, mobile])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findByMobileOrEmail = (username) => {
    logger.debug(`findByMobileOrEmail: ${username}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where email=? or mobile=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [username, username])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findByEmail = (email) => {
    logger.debug(`findByEmail: ${email}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where email=? or mobile=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [email, email])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findAll = (start, end) => {
    logger.debug("findAll")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} order by code limit ${start},${end} ;`
        logger.debug(sql)
        const result = await pool.query(sql)
        resolve({
          status: "Success",
          data: JSON.stringify(result)
        })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.getDataForClient = () => {
    logger.debug("getDataForClient")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where member_role='member' order by code;`
        logger.debug(sql)
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateMemberFromClient = (member) => {
    logger.debug(`updateMemberFromClient: ${member.length}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `update ${table_name} 
        set total_purchase=?,
        total_score=? where code=?;`
        logger.debug(sql)
        let countToUpdate = 0
        for (let i = 0; i < member.length; i++) {
          const memberData = JSON.parse(member[i])
          const result = await pool.query(sql, [
            memberData.Member_TotalPurchase,
            memberData.Member_TotalScore,
            memberData.Member_Code
          ])
          countToUpdate = countToUpdate + result.affectedRows
        }
        resolve({
          status: "Success",
          data: JSON.stringify({ result: countToUpdate })
        })
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
        let sql = `select * from ${table_name} where 1=1 `
        if (key !== "") {
          sql = `${sql} and ${key} like '%${value}%'`
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

  module.create = (data) => {
    logger.debug(`create: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `select member_running, prefix_running, size_running, member_register_point 
        from ${tb_company} c limit 0,1;`
        const config = await pool.query(sql)
        const {
          prefix_running,
          member_running,
          size_running,
          member_register_point
        } = config[0]
        data.code = prefix_running + zeroPad(member_running, size_running) // generate prefix running
        data.total_score = member_register_point

        sql = `INSERT INTO ${table_name} SET ?;`
        logger.debug(sql)
        const result = await pool.query(sql, data)

        // update running +1
        sql = `update ${tb_company} set member_running=member_running+1;`
        logger.debug(sql)
        await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
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
        const sql = `UPDATE ${table_name} SET  
        prefix = ?, 
        first_name = ?, 
        last_name = ?, 
        birthday = ?, 
        mobile = ?, 
        line_id = ?, 
        line_user_id = ?, 
        system_updated = now() 
        WHERE code=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          data.prefix,
          data.first_name,
          data.last_name,
          data.birthday,
          data.mobile,
          data.line_id,
          data.line_user_id,
          data.code
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateRole = (data) => {
    logger.debug(`updateRole: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE ${table_name} SET  
        member_role = ?,
        first_name=?,
        last_name=?,
        system_updated = now(),
        total_score=?,
        total_purchase=? 
        WHERE uuid_index=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          data.member_role,
          data.first_name,
          data.last_name,
          data.total_score,
          data.total_purchase,
          data.uuid_index
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.changePassword = (data) => {
    logger.debug(`changePassword: ${data}`)
    return new Promise(async (resolve, reject) => {
      const { username } = data
      const password = Buffer.from("123456").toString("base64")
      try {
        const sql = `UPDATE ${tb_login} SET password = ? WHERE username=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [password, username])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateLineUserId = (data) => {
    logger.debug(`updateLineUserId: ${data}`)
    return new Promise(async (resolve, reject) => {
      const { email, lineUserId } = data
      try {
        const sql = `UPDATE ${table_name} SET line_user_id = ? WHERE email = ?;`
        logger.debug(sql)
        const result = await pool.query(sql, [lineUserId, email])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.delete = (email) => {
    logger.debug(`delete: ${email}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `DELETE FROM ${table_name} WHERE email = ?;`
        logger.debug(sql)
        const result = await pool.query(sql, [email])
        sql = `DELETE FROM ${tb_login} WHERE username = ?;`
        logger.debug(sql)
        const result2 = await pool.query(sql, [email])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.verifyTokenLine = (lineId) => {
    logger.debug(`verifyTokenLine: ${lineId}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select l.* from ${table_name} m 
          inner join ${tb_login} l on m.email = l.username 
          where line_id =? and member_active ='Y';`
        logger.debug(sql)
        const member = await pool.query(sql, [lineId])
        resolve({ status: "Success", data: JSON.stringify(member[0]) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.getLineId = (lineId) => {
    logger.debug(`getLineId: ${lineId}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where Line_Id=?;`
        logger.debug(sql)
        const member = await pool.query(sql, [lineId])
        if (member.length == 0) {
          reject({ status: "Warning", msg: "Not Found" })
        } else {
          resolve({ status: "Success", data: JSON.stringify(member) })
        }
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  return module
}
