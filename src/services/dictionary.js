const sanakirju = require('sanakirju')

/**
 * Return dictionary words.
 * Format to fit DB schema.
 */
const getWords = async () => {
  const entries = await sanakirju.fromXML()

  const words = formatEntries(entries)

  return words
}

/**
 * Formats dictionary for DB Schema.
 * Sanakirju entries may have multiple meanings,
 * treat them as individual words.
 */
const formatEntries = (entries) => {
  const formattedEntries = []

  for (let i = 0; i < entries.length; i += 1) {
    entries[i].definitions.forEach((definition) => {
      console.log(definition)
      formattedEntries.push(formatEntry(entries[i].word, definition))
    })
  }

  return formattedEntries
}

/**
 * Format individual entry.
 */
const formatEntry = (word, definition) => ({
  word,
  definition: definition.definition,
  examples: definition.examples,
})

module.exports = {
  getWords,
}
