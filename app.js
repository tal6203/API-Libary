const express = require('express');
const app = express();
const routes = require('./routes/routes');
const path = require('path');
const port = 8080;

app.use(express.static(path.join('.', '/static/')));

app.use(express.static(path.join('.', '/script/')));


app.use(routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
