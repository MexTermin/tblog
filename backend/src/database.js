const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Blogdb',{

    useNewUrlParser: true
})
    .then(db => console.log('DB is connect'))
    .catch(err => console.error(err))