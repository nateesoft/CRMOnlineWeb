/* Carts.model code generator by automatic script */

const logger = require("../logger")
const pool = require("../mysql-connect")
const {
  getDB,
  zeroPad,
  computeDirection,
  computeAmount,
} = require("./FuncUtil")()

module.exports = (db) => {
  const module = {}
  const table_name = getDB(db, "carts")
  const tb_company = getDB(db, "company")
  const tb_carts_detail = getDB(db, "carts_detail")
  const tb_member = getDB(db, "member")
  const branch_table = getDB(db, "branch")

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
        const sql = `select * from ${table_name} order by cart_no desc;`
        logger.debug(sql)
        const result = await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findStatusApprove = (member_code) => {
    logger.debug("findStatusApprove")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} 
        where shopping_step='approve' 
        and member_code=? order by cart_no desc;`
        logger.debug(sql)
        const result = await pool.query(sql, [member_code])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findStatusNotApprove = (member_code) => {
    logger.debug("findStatusApprove")
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} 
        where shopping_step!='approve' and member_code=? 
        order by cart_no desc;`
        logger.debug(sql)
        const result = await pool.query(sql, [member_code])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.findAllByMember = (member_code) => {
    logger.debug(`findAllByMember: ${member_code}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where member_code = ? order by cart_no;`
        logger.debug(sql)
        const result = await pool.query(sql, [member_code])
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
        let sql = `select * from ${table_name} `
        if (key !== "") {
          sql = `${sql} where ${key} like '%${value}%' `
        }
        sql = `${sql} order by cart_create_date desc`
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
        let sql = `select cart_running, cart_prefix, cart_size_running from ${tb_company} c limit 0,1;`
        logger.debug(sql)
        const config = await pool.query(sql)
        const { cart_prefix, cart_running, cart_size_running } = config[0]
        params.cart_no = cart_prefix + zeroPad(cart_running, cart_size_running) // generate prefix running

        sql = `INSERT INTO ${table_name} SET ? `
        logger.debug(sql)
        await pool.query(sql, params)

        // update running +1
        sql = `update ${tb_company} set cart_running=cart_running+1;`
        logger.debug(sql)
        await pool.query(sql)
        resolve({ status: "Success", data: JSON.stringify(params.cart_no) })
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
        const sql = `UPDATE ${table_name} SET cart_no=?, member_code=? WHERE uuid_index=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
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

  module.updatePayment = (data) => {
    logger.debug(`updatePayment: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE ${table_name} SET 
        account_from_name=?,
        account_to_name=?,
        from_account_no=?,
        to_account_no=?,
        transfer_date=?,
        transfer_ref=?,
        transfer_amount=? 
        WHERE cart_no=? and member_code=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          data.account_from_name,
          data.account_to_name,
          data.from_account_no,
          data.to_account_no,
          data.transfer_date,
          data.transfer_ref,
          data.transfer_amount,
          data.cart_no,
          data.member_code,
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateShoppingStep = (data) => {
    logger.debug(`updateShoppingStep: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `UPDATE ${table_name} SET shopping_step=? WHERE cart_no=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [data.shopping_step, data.cart_no])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateBranchShipping = (data) => {
    logger.debug(`updateBranchShipping: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `UPDATE ${table_name} SET branch_shipping=? WHERE cart_no=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          data.branch_shipping,
          data.cart_no,
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateTransportAmount = (data) => {
    logger.debug(`updateTransportAmount: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `select b.*, c.total_net_amt 
        from ${table_name} c 
        inner join ${branch_table} b on c.branch_shipping = b.code 
        where c.cart_no=?;`
        const query = await pool.query(sql, [data.cart_no])
        const transportConfig = query[0]

        let total_transport_amt = 0

        // direction 1
        let direction = transportConfig.mapping_direction_length1
        let mappingType = transportConfig.mapping_type1
        let mappingBaht = transportConfig.mapping_baht1
        total_transport_amt = computeDirection(
          data.distance,
          direction,
          mappingType,
          mappingBaht
        )

        if (total_transport_amt === 0) {
          // direction 2
          direction = transportConfig.mapping_direction_length2
          mappingType = transportConfig.mapping_type2
          mappingBaht = transportConfig.mapping_baht2
          total_transport_amt = computeDirection(
            data.distance,
            direction,
            mappingType,
            mappingBaht
          )
        }

        if (total_transport_amt === 0) {
          // direction 3
          direction = transportConfig.mapping_direction_length3
          mappingType = transportConfig.mapping_type3
          mappingBaht = transportConfig.mapping_baht3
          total_transport_amt = computeDirection(
            data.distance,
            direction,
            mappingType,
            mappingBaht
          )
        }

        const totalNetAmount = transportConfig.total_net_amt

        // check amount 1
        const mappingBillAmt1 = transportConfig.mapping_bill_amt1
        const billType1 = transportConfig.bill_type1
        const addMoney1 = transportConfig.add_money1
        if (mappingBillAmt1) {
          const { total, type } = computeAmount(
            totalNetAmount,
            mappingBillAmt1,
            billType1,
            addMoney1
          )
          if (type === "free") {
            total_transport_amt = 0
          } else {
            total_transport_amt = total_transport_amt + total
          }
        }

        // check amount 2
        const mappingBillAmt2 = transportConfig.mapping_bill_amt2
        const billType2 = transportConfig.bill_type2
        const addMoney2 = transportConfig.add_money2
        if (mappingBillAmt2) {
          const { total, type } = computeAmount(
            totalNetAmount,
            mappingBillAmt2,
            billType2,
            addMoney2
          )
          if (type === "free") {
            total_transport_amt = 0
          } else {
            total_transport_amt = total_transport_amt + total
          }
        }

        sql = `UPDATE ${table_name} 
              SET distance=?,
              total_transport_amt=?,
              total_net_amt=(total_amount+total_transport_amt) 
              WHERE cart_no=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          data.distance,
          total_transport_amt,
          data.cart_no,
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateSlipPath = (data) => {
    logger.debug(`updateSlipPath: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `UPDATE ${table_name} SET slip_path=? WHERE cart_no=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [data.slip_path, data.cart_no])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateShoppingApprove = (data) => {
    logger.debug(`updateShoppingApprove: ${data}`)
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `UPDATE ${table_name} 
        SET shopping_step=?,
        emp_code_update=?,
        emp_reason=?,
        emp_update_date=now() 
        WHERE cart_no=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          data.shopping_step,
          data.emp_code_update,
          data.emp_reason,
          data.cart_no,
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  module.updateSummary = (data) => {
    logger.debug(`updateSummary: ${data}`)
    return new Promise(async (resolve, reject) => {
      // summary to carts
      try {
        const sql = `update ${table_name} c set 
        total_item=(select sum(qty) from ${tb_carts_detail} cd where cd.cart_no=c.cart_no),
        total_amount=(select sum(total_amount) from ${tb_carts_detail} cd where cd.cart_no=c.cart_no),
        total_point=(select sum(point) from ${tb_carts_detail} cd where cd.cart_no=c.cart_no) 
        where cart_no=?;`
        logger.debug(sql)
        const result = await pool.query(sql, [data.cart_no])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject(err, { status: "Error", msg: err.message })
      }
    })
  }

  module.updatePointAndPurchaseToCustomer = (data) => {
    logger.debug(`updatePointAndPurchaseToCustomer: ${data}`)
    return new Promise(async (resolve, reject) => {
      const { cart_no, member_code } = data
      try {
        const sql = `update ${tb_member} set 
        total_score=total_score + (select total_point from ${table_name} c1 
        where c1.cart_no=? 
        and c1.shopping_step ='approve' 
        and c1.member_code =?),
        total_purchase=total_purchase + (select total_amount from ${table_name} c2 
        where c2.cart_no=? 
        and c2.shopping_step ='approve' 
        and c2.member_code =?)
        where code =?;`
        logger.debug(sql)
        const result = await pool.query(sql, [
          cart_no,
          member_code,
          cart_no,
          member_code,
          member_code,
        ])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject(err, { status: "Error", msg: err.message })
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

  module.findByCartToShopping = (cart_no) => {
    logger.debug(`findByCartToShopping: ${cart_no}`)
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${table_name} where cart_no=? and shopping_step='order';`
        logger.debug(sql)
        const result = await pool.query(sql, [cart_no])
        resolve({ status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        logger.error(err)
        reject({ status: "Error", msg: err.message })
      }
    })
  }

  return module
}
