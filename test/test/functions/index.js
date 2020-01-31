const functions = require('firebase-functions');
const prpl = require('prpl-server');
const express = require('express');
const cors = require('cors')
const rendertron = require('rendertron-middleware');
const searchResult = require('./search-results');
const eventTemplateList = require('./event-template-list');

const app = express();

const rendertronMiddleware = rendertron.makeMiddleware({
  proxyUrl: 'https://render-tron.appspot.com/render',
  injectShadyDom: true,
});

app.use((req, res, next) => {
  req.headers['host'] = '<YOUR HOST URL HERE>';
  return rendertronMiddleware(req, res, next);
});

app.use(cors());
app.get('/api/search', function(req, res){
  var query = req.query.q;
  var statusCode = req.query.statusCode;
  var searchResultItems = searchResult.items;
  var matchedItems = searchResultItems.filter(template => {
    return template.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  });

  if(statusCode){
    res.status(statusCode);
  }
  
  res.json(matchedItems);
});

app.get('/api/p123/event-template-list', function(req, res){
  res.json(eventTemplateList.items);
});

const cacheControl = (req, res, next) => {
  // sets Cache-Control headers for 30 minutes
  res.set('Cache-Control', 'public; max-age=180000, s-maxage=360000, stale-while-revalidate=180000');
  next();
}

app.use(cacheControl);

app.get('/*', prpl.makeHandler('./build', require('./build/polymer.json')));

exports.app = functions.https.onRequest(app);