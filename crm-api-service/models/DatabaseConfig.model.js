/* DatabaseConfig.model code generator by automatic script */

const logger = require("../logger");
const pool = require("../mysql-connect")

module.exports = db => {
  const module = {}

  module.showAllDatabase = async () => {
    logger.debug("showAllDatabase")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `show databases;`;
        logger.debug(sql);
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err);
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.filterByCRMDatabaseConfig = async (database) => {
    logger.debug("filterByCRMDatabaseConfig")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `show tables from ${database} like 'ui_menu';`;
        logger.debug(sql);
        const result = await pool.query(sql)
        resolve(result.length)
      } catch (err) {
        logger.error(err);
        reject(0)
      }
    })
  }

  return module
}
