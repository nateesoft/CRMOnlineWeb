const logger = require("../logger")
const pool = require("../mysql-connect")
const { getDB } = require("./FuncUtil")()

module.exports = (db) => {
  const module = {}
  const table_name = getDB(db, "roles_mapping")
  const member = getDB(db, "member")

  module.findByUsernameAndPath = (username, path) => {
    logger.info(`findByUsernameAndPath: ${username}, ${path}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select rm.* 
        from ${member} m inner join ${table_name} rm 
        on m.member_role = rm.role_code 
        where (email=? or mobile=?) 
        and rm.app_path=?;`;
        logger.debug(sql);
        const result = await pool.query(sql, [username, username, path])
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

  return module
}
