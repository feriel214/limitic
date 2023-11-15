const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');




// import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoute')
const categoryRoutes=require('./routes/categoryRoutes')
const cartRoutes = require('./routes/cartRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
//mayouur
const AnnuaireRoutes=require('./routes/Annuaire')
const pubRoutes=require('./routes/pubRoutes')
const groupRoutes=require('./routes/GroupRoutes')

const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error");

//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));

const corsOptions = {
    origin: ['http://localhost:4200' ,'http://localhost:5000' ], // Update this to your Angular app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization', // Add your custom headers here
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(cookieParser());



//ROUTES MIDDLEWARE
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api',productRoutes);
app.use('/api',categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/annuaire',AnnuaireRoutes);
app.use('/pub',pubRoutes);
app.use('/group',groupRoutes);

app.use( '/getimage' , express.static('./upload')  );
// error middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});