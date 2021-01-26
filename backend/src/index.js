const express = require('express');
const { manualPort } = require('./keys');

// settings
const app = express();
app.set('port', process.env.PORT || manualPort.PORT);
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", require('./routes/index'));

// server
app.listen(app.get('port'), () => {

    console.log("server on port ", app.get('port'));

});
