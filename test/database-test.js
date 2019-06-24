'use strict'

const expect = require('chai').expect
const quotesDb = require('../quotesdb.js')

describe('QuotesDB initialization', function () {
  //  TODO: Test initialization errors (wrong fields)
})

describe('QuotesDB', function () {
  let db
  before(function () {
    return quotesDb.init('./test/star_wars.csv').then(function (_db) {
      db = _db
    })
  })

  describe('titles', function () {
    it('should have Return of the Jedi and Star Wars titles', function () {
      const titles = db.titles()

      expect(titles).to.exist
      expect(titles).to.be.a('array')
      expect(titles.length).to.equal(2)

      // TODO: Need to test sort order
      const starWars = titles[0]
      expect(starWars.title).to.equal('Star Wars')
      expect(starWars.slug).to.equal('star-wars')
    })
  })

  describe('attributions', function () {
    it('should have valid attributions', function () {
      const results = db.attributions()
      expect(results.length).to.equal(6)

      // TODO: Need to test sort order
      const leia = results[0]
      expect(leia.attribution).to.equal('Princess Leia')
      expect(leia.slug).to.equals('princess-leia')
    })
  })

  describe('randomQuote', function () {
    it('should return a random quote', function () {
      const q = db.randomQuote()

      expect(q).to.exist
      expect(q).to.be.a('object')
      expect(q).to.have.own.property('text')
      expect(q).to.have.own.property('attribution')
    })
  })

  describe('quotesByTitleSlug', function () {
    it('should have valid quotes for Return of the Jedi', function () {
      const quotes = db.quotesByTitleSlug('return-of-the-jedi')

      expect(quotes).to.exist
      expect(quotes).to.be.a('array')
      expect(quotes.length).to.equal(4)

      const q = quotes[0]
      expect(q).to.be.a('object')
      expect(q).to.have.own.property('text')
      expect(q).to.have.own.property('attribution')
    })

    it('should have no quotes for The Empire Strikes Back', function () {
      const quotes = db.quotesByTitleSlug('the-empire-strikes-back')

      expect(quotes).to.exist
      expect(quotes).to.be.a('array')
      expect(quotes.length).to.equal(0)
    })
  })

  describe('randomQuoteByTitleSlug', function () {
    it('should return a random quote for Return of the Jedi', function () {
      const q = db.randomQuoteByTitleSlug('return-of-the-jedi')

      expect(q).to.exist
      expect(q).to.be.a('object')
      expect(q).to.have.own.property('text')
      expect(q).to.have.own.property('attribution')
    })

    it('shoud not return of a random quote for The Empire Strikes Back', function () {
      const q = db.randomQuoteByTitleSlug('the-empire-strikes-back')
      expect(q).to.not.exist
    })
  })

  describe('quotesByAttributionSlug', function () {
    it('should have valid quotes for Luke Skywalker', function () {
      const quotes = db.quotesByAttributionSlug('luke-skywalker')

      expect(quotes).to.exist
      expect(quotes).to.be.a('array')
      expect(quotes.length).to.equal(2)

      // TODO: Need to test sort order
      const q = quotes[0]
      expect(q).to.be.a('object')
      expect(quotes[0]).to.have.own.property('text')
      expect(quotes[0]).to.have.own.property('attribution')
    })

    it('should have no quotes for Han Solo', function () {
      const quotes = db.quotesByAttributionSlug('han-solo')

      expect(quotes).to.exist
      expect(quotes).to.be.a('array')
      expect(quotes.length).to.equal(0)
    })
  })

  describe('randomQuoteByAttributionSlug', function () {
    it('should return a random quote for Luke Skywalker', function () {
      const q = db.randomQuoteByAttributionSlug('luke-skywalker')

      expect(q).to.exist
      expect(q).to.be.a('object')
      expect(q).to.have.own.property('text')
      expect(q).to.have.own.property('attribution')
    })

    it('shoud not return of a random quote for Han Solo', function () {
      const q = db.randomQuoteByAttributionSlug('han-solo')
      expect(q).to.not.exist
    })
  })
})
