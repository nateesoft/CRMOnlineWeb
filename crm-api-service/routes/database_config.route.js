/* DatabaseConfig.route code generator by automatic script */

const express = require("express")
const router = express.Router()
const Task = require("../models/DatabaseConfig.model")

module.exports = args => {

  router.get("/", async (req, res) => {
    const response = await Task().showAllDatabase()
    const data = JSON.parse(response.data)
    const database = []
    for(let i=0;i<data.length;i+=1){
      const responseCheckTable = await Task().filterByCRMDatabaseConfig(data[i].Database)
      if(responseCheckTable > 0){
        const encryptDb = Buffer.from(data[i].Database).toString('base64');
        const company = await Task().getCompanyNameFromDatabase(data[i].Database);
        const companyData = JSON.parse(company.data)
        
        if(companyData.length>0){
          database.push({
            database: data[i].Database,
            encrypt: encryptDb,
            query: `/?data=${encryptDb}`,
            name: companyData[0].name,
          });
        }
      }
    }
    res.status(200).json({
      status: response.status,
      msg: "Success",
      data: database,
    })
  })
  
  return router
}
