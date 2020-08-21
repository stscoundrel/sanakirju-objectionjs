# Sanakirju Objection.js

Objection.js / SQL implementation of Sanakirju, a Karelian - Finnish dictionary with over 90 000 words. Based on data from Karjalan Kielen Sanakirja.

### Install

`yarn add sanakirju-objectionjs`

### Usage

sanakirju-objectionjs uses the core sanakirju to fetch all the dictionary data from XML files. Provides migration & model for Knex supported SQL databases, like PostgreSQL, MySQL, MariaDB or SQLite.

##### Set up database.

```javascript
const { toObjection } = require('sanakirju-objectionjs')

// Your Knex config. DO NOT define "migrations" folder".
const knexConf = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './local.db',
  },
  pool: {
    afterCreate: (conn, cb) => {
      conn.run('PRAGMA foreign_keys = ON', cb);
    },
  },
}

/**
 * Pass your config & populate the database.
 * Might take a minute.
 */
 try {
     const res = await toObjection(knexConf)
     console.log(res)
 } catch(err) {
     console.log(err)
 }

```

##### Query the database

Open connection, use the Model to do any Objection.js query.

```javascript
const { Model, connection } = require('sanakirju-objectionjs')

const config = { // Your Knex conf }

/**
 * Open connection somewhere in your app.
 * You are free to open connection without Sanakirju too.
 */
await connect(knexConf)


// Query some data with
const aWords = await Model.query()
    .select('word', 'definition')
    .where('startsWith', 'a')
    .orderBy('word');

const sWordsWithExamples = await Model.query().withGraphFetched('examples')
    .select('word', 'definition')
    .where('startsWith', 's')
    .orderBy('word');

```

##### Model

Sanakirju provides the following data for the model:

```javascript
Word:
{
  type: 'object',
  required: ['word'],

  properties: {
    id: { type: 'integer' },
    word: { type: 'string' },
    definition: { type: 'string' },
    startsWith: { type: 'string' },
  }


```

### Sources.

Words & translations are from [Karjalan Kielen Sanakirja](http://kaino.kotus.fi/cgi-bin/kks/kks_etusivu.cgi) created by [Institute for the Languages of Finland](https://www.kotus.fi/en). The original material is licenced under [Creative Commons International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
