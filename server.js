var express = require('express')
var app = express()

app.use(express.static('dist'))

var port = 3000
app.listen(port, function () {
  console.log('Server running: http://localhost:' + port)
})