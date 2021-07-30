const mongoose = require('mongoose');
const express = require('express');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const cors = require('cors');
const app = express();
//Allow cors origin
app.use(cors());
// Add mong db url to connect mongoose
mongoose.connect('url');
mongoose.connection.once('open',()=>{
 console.log('connencted to database');
})