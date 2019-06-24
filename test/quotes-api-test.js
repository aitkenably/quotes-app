'use strict'

const request = require('supertest')
const expect = require('chai').expect
const express = require('express')

const createDatabase = require('../database')
const createQuotesRouter = require('../quotes-api')

// TODO: Testing sorting order
describe('Quotes API', function () {
  let app

  before(function () {
    return createDatabase('./test/star_wars.csv').then(function (db) {
      app = express()
      app.use(createQuotesRouter(db))
    })
  })

  describe('/quotes', function () {
    it('should respond with all quotes', function () {
      return request(app)
        .get('/quotes')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const quotes = response.body
          expect(quotes).to.be.a('array')
          expect(quotes.length).to.equal(7)
        })
    })
  })

  describe('/quotes/titles', function () {
    it('should respond with all titles', function () {
      return request(app)
        .get('/quotes/titles')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const titles = response.body
          expect(titles).to.be.a('array')
          expect(titles.length).to.equal(2)

          const starWars = titles[0]
          expect(starWars.title).to.equal('Star Wars')
          expect(starWars.slug).to.equal('star-wars')
        })
    })
  })

  describe('/quotes/attributions', function () {
    it('should respond with all attributions', function () {
      return request(app)
        .get('/quotes/attributions')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const attributions = response.body
          expect(attributions.length).to.equal(6)

          const leia = attributions[0]
          expect(leia.attribution).to.equal('Princess Leia')
          expect(leia.slug).to.equals('princess-leia')
        })
    })
  })

  describe('/quotes/random', function () {
    it('should respond with a random quote', function () {
      return request(app)
        .get('/quotes/random')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const quote = response.body

          expect(quote).to.be.a('object')
          expect(quote).to.have.own.property('text')
          expect(quote).to.have.own.property('attribution')
        })
    })
  })

  describe('/quotes/title/:slug', function () {
    it('should respond with quotes for a valid slug', function () {
      return request(app)
        .get('/quotes/title/return-of-the-jedi')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const quotes = response.body
          expect(quotes).to.be.a('array')
          expect(quotes.length).to.equal(4)

          const quote = quotes[0]
          expect(quote).to.be.a('object')
          expect(quote).to.have.own.property('text')
          expect(quote).to.have.own.property('attribution')
        })
    })
    it('should respond with a 404 for an invalid slug', function (done) {
      request(app)
        .get('/quotes/title/invalid-slug')
        .expect(404, done)
    })
  })

  describe('/quotes/title/:slug/random', function () {
    it('should respond with a random quote for a valid slug', function () {
      return request(app)
        .get('/quotes/title/return-of-the-jedi/random')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const quote = response.body

          expect(quote).to.be.a('object')
          expect(quote).to.have.own.property('text')
          expect(quote).to.have.own.property('attribution')
        })
    })
    it('should respond with a 404 for an invalid slug', function (done) {
      request(app)
        .get('/quotes/title/invalid-slug/random')
        .expect(404, done)
    })
  })

  describe('/quotes/attribution/:slug', function () {
    it('should respond with quotes for a valid slug', function () {
      return request(app)
        .get('/quotes/attribution/luke-skywalker')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const quotes = response.body
          expect(quotes).to.be.a('array')
          expect(quotes.length).to.equal(2)

          const quote = quotes[0]
          expect(quote).to.be.a('object')
          expect(quote).to.have.own.property('text')
          expect(quote).to.have.own.property('attribution')
        })
    })
    it('should respond with a 404 for an invalid slug', function (done) {
      request(app)
        .get('/quotes/attribution/invalid-slug')
        .expect(404, done)
    })
  })

  describe('/quotes/attribution/:slug/random', function () {
    it('should respond with a random quote for a valid slug', function () {
      return request(app)
        .get('/quotes/attribution/luke-skywalker/random')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const quote = response.body

          expect(quote).to.be.a('object')
          expect(quote).to.have.own.property('text')
          expect(quote).to.have.own.property('attribution')
        })
    })
    it('should respond with a 404 for an invalid slug', function (done) {
      request(app)
        .get('/quotes/attribution/invalid-slug/random')
        .expect(404, done)
    })
  })
})
