require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
// const PORT = 4000;
// const CONNECTION_STRING = "mongodb://localhost:27017/massbuy";
const CONNECTION_STRING = "mongodb+srv://meedoMontana:MontanaMongo01@myafricequipdb.rsxoiac.mongodb.net/MassBuy";
const path = require('path');
const routes = require('./routes');
const bodyparser = require('body-parser');
const { cloudinaryConfig } = require("./config/cloudinaryConfig")

mongoose.set("strictQuery", false);

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => console.log('Mongo Running'));
mongoose.connection.on('error', (err) => console.log(err)); app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
//     if (req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         return res.status(200).json({});
//     }
//     next();
// });

app.use('*', cloudinaryConfig);

app.get('/', (req, res) => {
    res.send("this is index route for endpoints, welcome to your MASSBUY project endpoints");
});

app.listen(PORT);
console.log('App is running on port:' + PORT);
