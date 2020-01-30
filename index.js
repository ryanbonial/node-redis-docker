const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const dbClient = redis.createClient({
  host: 'redis-server',
  port: 6379
});

dbClient.set('visits', 0);

app.get('/', (req, res) => {
  dbClient.get('visits', (err, visits) => {
    const newVisitCt = +visits + 1;
    dbClient.set('visits', newVisitCt);
    res.send(`There have been ${newVisitCt} visits to this page`);
  });
});

app.get('/shutdown', (req, res) => {
  process.exit(0);
});

app.get('/crash', (req, res) => {
  process.exit(1);
});

app.listen(8080, () => {
  console.log('ListENinG On PoRT 8080...');
});