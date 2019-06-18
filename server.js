'use strict'
// Needs testing. Needs logging. Needs random support.
const quotes = require('./quotes.json')
const express = require('express')

const quotesApi = express()

const port = 8080

quotesApi.get('/', function (req, res) {
  res.send("OK")
})

quotesApi.get('/quotes', function (req, res) {
  const summary = ({ name, slug }) => ({ name, slug })
  const cmp = (a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
  res.json(quotes.map(q => summary(q)).sort(cmp))
})

quotesApi.get('/quotes/:slug', function (req, res) {
  const result = quotes.filter(q => q.slug === req.params['slug'])
  if (result.length <= 0) {
    res.sendStatus(404)
  } else {
    res.json(result[0].quotes)
  }
})

quotesApi.listen(port, () =>
  console.log(`Quotes API listening on port ${port}...`))