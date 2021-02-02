

const express = require('express');
const { manualPort } = require('./keys');
const morgan = require('morgan')
const multer = require('multer')
const passport = require('passport')
const session = require('express-session')
const {v4: uuidv4 } = require('uuid')
const path = require('path')
const cons = require('consolidate');

const app = express();
require('./database')
require('./passport/auth')

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
    app.set('port', process.env.PORT || manualPort.PORT);

//middleware
app.use(morgan('dev'))
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + uuidv4() + path.extname(file.originalname))
    }
})
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize:2000000},
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpe|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname))
        if(mimeType && extName){
            return cb(null, true)
        }
        cb("Error: The file must be a valid image")
    }
}).single('image'))
app.use(cookieParser('Este es mi ultra secreto'))
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use(require('./routes/routes'));


//Stactic files
app.use(express.static( path.join(__dirname, 'public')))

// server
app.listen(app.get('port'), () => {

    console.log("server on port ", app.get('port'));

});
