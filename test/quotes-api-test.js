'use strict'

const request = require('supertest')
const expect = require('chai').expect
const express = require('express')

const createDatabase = require('../database')
const createQuotesRouter = require('../quotes-api')

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

          // TODO: Need to test sort order
          const starWars = titles[0]
          expect(starWars.title).to.equal('Star Wars')
          expect(starWars.slug).to.equal('star-wars')
        })
    })
  })
})
