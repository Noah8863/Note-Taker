const express = require('express');
const routes = require('./routes/routes');
const htmlroutes = require('./routes/htmlroutes');

const app = express();
const PORT = 3001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// static middleware
app.use(express.static('./public'));

app.use('/api', routes);
app.use('/', htmlroutes);

app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);
