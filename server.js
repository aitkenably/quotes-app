'use strict'

const express = require('express')
const createDatabase = require('./database')
const createQuotesRouter = require('./quotes-api')

// TODO: Accept database CSV from environment variable
createDatabase('./data/quotes.csv').then(function (db) {
  const app = express()
  app.use(createQuotesRouter(db))

  // TODO: Accept port from environmental variable
  const port = 8080

  app.listen(port, () =>
    console.log(`Quotes API listening on port ${port}...`))
})
