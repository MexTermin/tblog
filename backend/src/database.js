const mongoose = require('mongoose')
const { mongo_uri } = require('./keys');

mongoose.connect(mongo_uri.uri,{

    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
})
    .then(db => console.log('DB is connect'))
    .catch(err => console.error(err))