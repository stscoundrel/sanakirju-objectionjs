const { Model } = require('objection')

class Word extends Model {
  static get tableName() {
    return 'words'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['word'],

      properties: {
        id: { type: 'integer' },
        word: { type: 'string' },
        definition: { type: 'string' },
        startsWith: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    const Example = require('./Example')

    return {
      examples: {
        relation: Model.HasManyRelation,
        modelClass: Example,
        join: {
          from: 'words.id',
          to: 'examples.wordID',
        },
      },
    }
  }

  /**
   * Autoinsert "startsWith" by word.
   */
  $beforeInsert(context) {
    this.startsWith = this.word.charAt(0)
  }
}

module.exports = Word
