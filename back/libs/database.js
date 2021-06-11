const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DBLOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); 
