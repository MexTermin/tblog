
const express = require('express');
const { manualPort } = require('./keys');
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
require('./database')

// settings
const app = express();
app.set('port', process.env.PORT || manualPort.PORT);
app.use(express.urlencoded({ extended: true }));

//middleware
app.use(morgan('dev'))
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'))
app.use(express.json())

//routes
app.use("/", require('./routes/index'));


//Stactic files
app.use(express.static( path.join(__dirname, 'public')))

// server
app.listen(app.get('port'), () => {

    console.log("server on port ", app.get('port'));

});
