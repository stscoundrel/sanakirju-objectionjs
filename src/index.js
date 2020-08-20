const toObjection = require('./services/objection')
const Model = require('./models/Word.js')
const { connect } = require('./database/setup.js')

module.exports = {
  toObjection,
  Model,
  connect
}
