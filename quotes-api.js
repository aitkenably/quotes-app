'use strict'

module.exports = function createQuotesRouter (database) {
  const router = require('express').Router()

  router.get('/quotes', (req, res) => res.json(database.quotes))
  router.get('/quotes/titles', (req, res) => res.json(database.titles()))
  router.get('/quotes/attributions', (req, res) => res.json(database.attributions()))
  router.get('/quotes/random', (req, res) => res.json(database.randomQuote()))

  // TODO: Streamline
  // TODO: Write tests
  router.get('/quotes/title/:slug', function (req, res) {
    const quotes = database.quotesByTitleSlug(req.params.slug)
    if (quotes.length === 0) {
      res.send(404)
    } else {
      res.json(quotes)
    }
  })

  router.get('/quotes/title/:slug/random', function (req, res) {
    const quote = database.randomQuoteByTitleSlug(req.params.slug)
    if (quote) {
      res.json(quote)
    } else {
      res.send(404)
    }
  })

  router.get('/quotes/attribution/:slug', function (req, res) {
    const quotes = database.quotesByAttributionSlug(req.params.slug)
    if (quotes.length === 0) {
      res.send(404)
    } else {
      res.json(quotes)
    }
  })

  router.get('/quotes/attribution/:slug/random', function (req, res) {
    const quote = database.randomQuoteByAttributionSlug(req.params.slug)
    if (quote) {
      res.json(quote)
    } else {
      res.send(404)
    }
  })

  return router
}
