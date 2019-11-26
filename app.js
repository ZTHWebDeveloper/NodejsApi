const express = require('express');
const productRoute = require('./routes/product')//product Route
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 8500;
app.use(bodyParser.json());//If for API,it is used.
app.use(productRoute);//productRoute
mongoose.connect('mongodb+srv://naungnaung:PKs7mWuztwPHfRQ7@cluster0-qmjxz.mongodb.net/nodeapi')//PKs7mWuztwPHfRQ7
.then(connected =>{
    app.listen(port,() =>{
        console.log('Server is running!! '+port);
    }); 
})
.catch(err =>{
    console.log(err);
});
