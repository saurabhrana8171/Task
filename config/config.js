const mongoose = require("mongoose");
const NODE_ENV = process.env.NODE_ENV || "production";
require('dotenv').config({ path: '.env.'+NODE_ENV });
const mongoUrl = process.env.DATABASE 
mongoose.connect(mongoUrl,
{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('connection successful')
}).catch((error) => {
    console.log('something went wrong',error);
}) 