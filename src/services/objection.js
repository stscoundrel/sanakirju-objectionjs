const sanakirju = require('sanakirju')
const database = require('../database/setup.js')

/**
 * Set up Knex & Objection DB.
 * Populate with Dictionary data.
 */
const toObjection = async (clientConfig) => {
  database.setup(clientConfig)

  const dictionary = await sanakirju.fromXML()

  return dictionary
}

module.exports = toObjection
