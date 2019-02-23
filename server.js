const express = require('express');
const morgan = require('morgan')

const app = express()
const port = 3000


app.use(morgan('tiny'))


app.get('/', function(req, res) {
  console.log('message in backend')
  res.send('message for frontend')
})

app.get('/bla', function(req, res) {
  console.log('message in backend')
  res.send('chicken')
})

function serverStart() {
  console.log('Server ready on ' + port);
}





app.listen(port, serverStart)
