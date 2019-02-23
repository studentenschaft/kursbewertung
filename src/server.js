const express = require('express');
import morgan from 'morgan'

const app = express()
const port = 4000

app.use(morgan('tiny'))

app.get('/', function(req, res) {
  console.log('message in backend')
  res.send('message for frontend')
})

app.get('/bla', function(req, res) {
  console.log('message in backend')
  res.send('chicken')
})

app.listen(port, function serverStart() {
  console.log('Server ready on ' + port);
})
