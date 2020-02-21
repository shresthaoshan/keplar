const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const Unsplash = require('unsplash-js').default
const pug = require('pug')
global.fetch = fetch

const unsplash = new Unsplash({
  accessKey: process.env.ACCESS_KEY || ""
})

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

let dat = ['dogs', 'doctor', 'dominos', 'people', 'pizza', 'purse', 'panorama']

app.get('/', async (req, res) => {
  unsplash.search.photos("puppies", 1, 12, { orientation: "portrait" })
  .then(res=>res.json())
  .then(json => {
    res.render('index', {"data" : json})
  });
})

app.get('/:search', (req, res) => {
  let searchItem = req.params.search.toLowerCase()
  if (searchItem != 'favicon.ico' && !(dat.includes(searchItem))) {
    dat.push(searchItem)
  }
  unsplash.search.photos(searchItem, 1, 12, { orientation: "portrait" })
  .then(res=>res.json())
  .then(json => {
    res.render('index', {"data" : json, "searchText": searchItem})
  });
})

app.post('/api/search-suggestions', (req, res) => {
  let searchData = new RegExp(req.body.userInput.trim(), 'gi')
  let matchedData = []
  dat.forEach(i => {
    if (searchData.test(i))
      matchedData.push(i)
  })
  res.json({suggestions: matchedData})
})


app.listen(3000, () => console.log("Server live"))