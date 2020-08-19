const { Model } = require('objection')
const Knex = require('knex')
const knexConf = require('./knexfile.js')

/**
 * Handle Knex / Objection initialisation
 * Make sure tables are setup.
 */
const setup = async (clientConfig) => {
  const knex = getKnex(clientConfig)
  Model.knex(knex)

  await migrateTables(knex)
}

/**
 * Get Knex instance.
 */
const getKnex = (clientConf) => {
  const config = getConfig(clientConf)
  return Knex(config)
}

/**
 * Combine base config with client conf.
 * Allows client to give own DB details,
 * but keeps our migrations folder.
 */
const getConfig = (clientConf) => {
  if (clientConf.migrations) {
    delete clientConf.migrations
  }

  return { ...knexConf, ...clientConf }
}

/**
 * Migrate tables for the data.
 */
const migrateTables = async (knex) => {
  await knex.migrate.latest()
}

module.exports = {
  setup,
}
