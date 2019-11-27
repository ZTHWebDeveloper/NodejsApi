const express = require('express');
const productRoute = require('./routes/product')//product Route
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());//If for API,it is used.
app.use(productRoute);//productRoute
mongoose.connect('mongodb+srv://naungnaung:PKs7mWuztwPHfRQ7@cluster0-qmjxz.mongodb.net/nodeapi')//PKs7mWuztwPHfRQ7
.then(connected =>{
    app.listen(process.env.PORT||5000,() =>{
        console.log('Server is running!! '+5000);
    }); 
})
.catch(err =>{
    console.log(err);
});
