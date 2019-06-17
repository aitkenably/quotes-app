const express = require('express')
const quotesApi = express()

const port = 8080

quotesApi.get('/', function (req, res) {
  res.send('Hello World!')
})

quotesApi.listen(port, () =>
  console.log(`Quotes API listening on port ${port}...`))
