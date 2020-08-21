const { Model } = require('objection')
const Knex = require('knex')
const knexConf = require('./knexfile.js')

/**
 * Handle Knex / Objection initialisation
 * Make sure tables are setup.
 */
const setup = async (clientConfig) => {
  const knex = getKnex(clientConfig)

  await migrateTables(knex)
}

/**
 * Get Knex instance.
 */
const getKnex = (clientConf) => {
  const config = getConfig(clientConf)
  const knex = Knex(config)
  Model.knex(knex)

  return knex
}

/**
 * Combine base config with client conf.
 * Allows client to give own DB details,
 * but keeps our migrations folder.
 */
const getConfig = (clientConf) => {
  const overrides = clientConf

  if (overrides.migrations) {
    delete overrides.migrations
  }

  return { ...knexConf, ...overrides }
}

/**
 * Migrate tables for the data.
 */
const migrateTables = async (knex) => {
  await knex.migrate.latest()
}

module.exports = {
  setup,
  connect: getKnex,
}
