const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const htmlRoutes = require('./app/routes/htmlRoutes');
const apiRoutes = require('./app/routes/apiRoutes');

app.use(htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
});