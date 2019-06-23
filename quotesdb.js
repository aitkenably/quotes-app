'use strict'

const csv = require('csvtojson')

module.exports = {
  init: function (csvFile, callback) {
    return new Promise(function (resolve, reject) {
      csv().fromFile(csvFile).then((records) => {
        const db = new QuotesDb()
        records.forEach((record) => db.addCsvRecord(record))
        resolve(db)
      })
    })
  }
}

class QuotesDb {
  constructor () {
    this.quotes = []
  }

  addCsvRecord (record) {
    const quote = new Quote(record.title, record.attribution, record.text)
    this.quotes.push(quote)
  }

  randomQuote () {
    return sample(this.quotes)
  }

  quotesByTitleSlug (slug) {
    return this.quotes.filter(q => q.titleSlug === slug)
  }

  randomQuoteByTitleSlug (slug) {
    return sample(this.quotesByTitleSlug(slug))
  }

  quotesByAttributionSlug (slug) {
    return this.quotes.filter(q => q.attributionSlug === slug)
  }

  randomQuoteByAttributionSlug (slug) {
    return sample(this.quotesByAttributionSlug(slug))
  }

  titles () {
    const response = []
    // TODO: Streamline this code
    this.quotes.forEach(function (q) {
      if (!response.some(r => r.title === q.title)) {
        const summary = {}
        summary.title = q.title
        summary.slug = q.titleSlug
        response.push(summary)
      }
    })

    return response
  }

  attributions () {
    const response = []
    // TODO: Streamline this code
    this.quotes.forEach(function (q) {
      if (!response.some(r => r.attribution === q.attribution)) {
        const summary = {}
        summary.attribution = q.attribution
        summary.slug = q.attributionSlug
        response.push(summary)
      }
    })

    return response
  }
}

class Quote {
  constructor (title, attribution, text) {
    this.title = title
    this.titleSlug = toSlug(title)
    this.attribution = attribution
    this.attributionSlug = toSlug(attribution)
    this.text = text
  }
}

function toSlug (text) {
  return text.toLowerCase().replace(/ /g, '-')
}

function sample (a) {
  return (a.length > 0 ? a[Math.floor(Math.random() * a.length)] : null)
}
