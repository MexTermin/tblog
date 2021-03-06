const express = require('express');
const { manualPort } = require('./keys');
const morgan = require('morgan')
const multer = require('multer')
const {v4: uuidv4 } = require('uuid')
const path = require('path')
const cors = require('cors')

const app = express();  
require('./database')
require('./passport/auth')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set('port', process.env.PORT || manualPort.PORT);

//middleware
app.use(cors())
app.use(morgan('dev'))
const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + uuidv4() + path.extname(file.originalname))
    }
})
app.use(multer({
    storage,
    dest: path.join(__dirname, '/public/uploads'),
    limits: {fileSize:200000},
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpe|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname))
        if(mimeType && extName){
            return cb(null, true)
        }
        cb("Error: The file must be a valid image")
    }
}).array('image'))

//routes
app.use(require('./routes/register'));
app.use(require('./routes/comments'))
app.use("/user",require('./routes/get_user'))
app.use("/post",require('./routes/post-routes'));
app.use("/public", express.static(`${__dirname}/public/uploads`))
app.use("/*", (req,res)=>{
    return res.status(404).json({message:'Route Not Found'})
})


//Stactic files
app.use(express.static( path.join(__dirname, 'public')))

// server
app.listen(app.get('port'), () => {

    console.log("server on port ", app.get('port'));

});
