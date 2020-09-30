/* Carts.model code generator by automatic script */

const pool = require("../mysql-connect")
const table_name = "carts"

const zeroPad = (num, places) => String(num).padStart(places, '0')

module.exports = {
  findByCartNo: async (cart_no, callback) => {
    console.log("findByCartNo method start:")
    try {
      const sql = `select * from ${table_name} where cart_no=?;`
      const result = await pool.query(sql, [cart_no])
      callback(null, { status: "Success", data: JSON.stringify(result) })
    } catch (err) {
      callback(err, { status: "Error", msg: err.message })
    }
  },
  findAll: async (callback) => {
    console.log("findAll method start:")
    try {
      const sql = `select * from ${table_name}`
      const result = await pool.query(sql)
      callback(null, { status: "Success", data: JSON.stringify(result) })
    } catch (err) {
      callback(err, { status: "Error", msg: err.message })
    }
  },
  searchData: async (key, value, callback) => {
    console.log("searchData method start:")
    try {
      let sql = `select * from ${table_name}`;
      if(key!==''){
        sql = `${sql} where ${key} like '%${value}%'`;
      }
      const result = await pool.query(sql)
      callback(null, { status: "Success", data: JSON.stringify(result) })
    } catch (err) {
      callback(err, { status: "Error", msg: err.message })
    }
  },
  create: async (params, callback) => {
    console.log("create method start:")
    return new Promise(async (resolve, reject) => {
      try {
        const config = await pool.query(`select cart_running, cart_prefix, cart_size_running from company c limit 0,1;`)
        const { cart_prefix, cart_running, cart_size_running } = config[0];
        params.cart_no = cart_prefix + zeroPad(cart_running, cart_size_running); // generate prefix running

        const query = `INSERT INTO ${table_name} SET ? `
        const result = await pool.query(query, params)

        // update running +1
        await pool.query('update company set cart_running=cart_running+1')
        callback(null, { status: "Success", data: JSON.stringify(params.cart_no) })
      } catch (err) {
        callback(err, { status: "Error", msg: err.message })
      }
    })
  },
  update: (data, callback) => {
    console.log("update method start:")
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${table_name} SET col1=?, col2=?, col3=? WHERE uuid_index=? `
        const result = await pool.query(query, [
          data.col1,
          data.col2,
          data.col3,
          data.uuid_index
        ])
        callback(null, { status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        callback(err, { status: "Error", msg: err.message })
      }
    })
  },
  updateSummary: (data, callback) => {
    console.log("update method start:")
    return new Promise(async (resolve, reject) => {
      // summary to carts
      try {
        const query = `update ${table_name} c set 
        total_item=(select sum(qty) from carts_detail cd where cd.cart_no=c.cart_no),
        total_amount=(select sum(total_amount) from carts_detail cd where cd.cart_no=c.cart_no),
        total_point=(select sum(point) from carts_detail cd where cd.cart_no=c.cart_no) 
        where cart_no=?`;
        const result = await pool.query(query, [data.cart_no])
        callback(null, { status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        callback(err, { status: "Error", msg: err.message })
      }
    })
  },
  delete: (id, callback) => {
    console.log("delete method start:")
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table_name} WHERE uuid_index = ? `
        const result = await pool.query(query, [id])
        callback(null, { status: "Success", data: JSON.stringify(result) })
      } catch (err) {
        callback(err, { status: "Error", msg: err.message })
      }
    })
  },
}