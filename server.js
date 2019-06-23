'use strict'

const quotesDb = require('./quotesdb')
const express = require('express')

// TODO: Logging

// TODO: Accept csv file from environmental variable
quotesDb.init('./data/quotes.csv').then(function (db) {
  const quotesApi = express()

  // TODO: Accept port from environmental variable
  const port = 8080

  // Health check
  quotesApi.get('/', (req, res) => res.send('OK'))

  quotesApi.get('/quotes', function (req, res) {
    res.json(db.quotes)
  })

  quotesApi.get('/quotes/titles', function (req, res) {
    res.json(db.titles())
  })

  quotesApi.listen(port, () =>
    console.log(`Quotes API listening on port ${port}...`))
})

//  Return random quote                  /quotes/random

//  Return all titles and slugs          /quotes/titles
//  Return all quotes by title-slug      /quotes/title/:slug
//  Return random quote by title-slug    /quotes/title/:slug/random

//  Return all attributors and slugs     /quotes/attributions
//  Return all quotes by attributor      /quotes/attribution/:slug
//  Return random quote by attributor    /quotes/attribution/:slug/random
