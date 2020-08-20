const database = require('../database/setup.js')
const dictionary = require('./dictionary.js')
const Word = require('../models/Word.js')

/**
 * Set up Knex & Objection DB.
 * Populate with Dictionary data.
 */
const toObjection = async (clientConfig) => {
  database.setup(clientConfig)

  try {
    const words = await dictionary.getWords()

    for (let i = 0; i < words.length; i += 1) {
      await insertWord(words[i])
    }

    return { status: true }
  } catch (err) {
    return { status: false, err }
  }
}

/**
 * Insert word into DB.
 * Transaction of word + examples.
 */
const insertWord = async (entry) => {
  await Word.query().insertGraph(entry)
}

module.exports = toObjection
