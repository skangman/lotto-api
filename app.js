const express = require('express');
const path = require('path');

const app = express();
const port = 3000

// var port = process.env.PORT || 9696;


const api = require('./route/api');

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
})


app.use(express.static('public'))

app.use('/api', api);


app.listen(port, () => {
   console.log("application is listening on:", port);
});

