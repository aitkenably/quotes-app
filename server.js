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

  quotesApi.get('/quotes', (req, res) => res.json(db.quotes))
  quotesApi.get('/quotes/titles', (req, res) => res.json(db.titles()))
  quotesApi.get('/quotes/attributions', (req, res) => res.json(db.attributions()))
  quotesApi.get('/quotes/random', (req, res) => res.json(db.randomQuote()))

  // TODO: Streamline
  // TODO: Write tests
  quotesApi.get('/quotes/title/:slug', function (req, res) {
    const quotes = db.quotesByTitleSlug(req.params.slug)
    if (quotes.length === 0) {
      res.send(404)
    } else {
      res.json(quotes)
    }
  })

  quotesApi.get('/quotes/title/:slug/random', function (req, res) {
    const quote = db.randomQuoteByTitleSlug(req.params.slug)
    if (quote) {
      res.json(quote)
    } else {
      res.send(404)
    }
  })

  quotesApi.get('/quotes/attribution/:slug', function (req, res) {
    const quotes = db.quotesByAttributionSlug(req.params.slug)
    if (quotes.length === 0) {
      res.send(404)
    } else {
      res.json(quotes)
    }
  })

  quotesApi.get('/quotes/attribution/:slug/random', function (req, res) {
    const quote = db.randomQuoteByAttributionSlug(req.params.slug)
    if (quote) {
      res.json(quote)
    } else {
      res.send(404)
    }
  })

  quotesApi.listen(port, () =>
    console.log(`Quotes API listening on port ${port}...`))
})
