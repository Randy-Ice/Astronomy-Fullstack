const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000
app.use(express.json());
//register routes
const blogRoutes = require('./Routes/blogRoutes');

//middleware auth
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./Logger/winston');


app.use(helmet());

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled')
}

process.on('uncaughtException', (ex) => {
    console.log(ex.message);
    logger.error(ex.message)
})

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Homepage'})
})

app.use('/api/blogs', blogRoutes)

//404 page
app.all('*', (req, res) => {
    res.status(404).send('No data found by that criteria')
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Database connection established, listening on port: ${PORT}`)
    })
})
.catch(err => {
    console.log(err)
    logger.error(err)
})

