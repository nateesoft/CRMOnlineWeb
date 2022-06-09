/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require('path')
const fs = require('fs-extra')
const mysql = require('mysql2')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
function getConfigurationByFile(env) {
  const pathToConfigFile = path.resolve("cypress", "config", `${env}.json`)
  return fs.readJson(pathToConfigFile)
}

module.exports = async (on, config) => {
  const env = config.env.configFile || "local"
  const data = await getConfigurationByFile(env)
  on('task', { queryDb: query => queryTestDb(query, data)})
  return data
}

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.database_config)
  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      try {
        error ? reject(error):resolve(results)
      } catch (err) {
        reject(err)
      } finally {
        connection.end()
      }
      
    })
  })
}
