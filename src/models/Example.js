const { Model } = require('objection')

class Example extends Model {
  static get tableName() {
    return 'examples'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['example', 'wordID'],

      properties: {
        id: { type: 'integer' },
        wordID: { type: 'integer' },
        example: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    const Word = require('./Word')

    return {
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: Word,
        join: {
          from: 'examples.wordID',
          to: 'words.id',
        },
      },
    }
  }
}

module.exports = Example
