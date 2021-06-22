const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const multer = require('multer');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const mysqlstore = require('express-mysql-session');

const { database } = require('./keys');

// initializations
const app = express();
require('./lib/passport');

//settings
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'))
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

var hbs = exphbs.create({});

hbs.handlebars.registerHelper('switch', function(value, options) {
  this.switch_value = value;
  this.switch_break = false;
  return options.fn(this);
});

hbs.handlebars.registerHelper('case', function(value, options) {
  if (value == this.switch_value) {
    this.switch_break = true;
    return options.fn(this);
  }
});

hbs.handlebars.registerHelper('default', function(value, options) {
   if (this.switch_break == false) {
     return value;
   }
});

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'concuadrosmysqlsession',
    resave: false,
    saveUninitialized : false,
    store : new mysqlstore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/images/upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
app.use(multer({storage: storage}).array('images'));

// Global Variables
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.cart = req.flash('cart');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes/index'));
app.use('/shop',require('./routes/shop'));
app.use('/account',require('./routes/account'));
app.use('/cart',require('./routes/cart'));
app.use('/pages',require('./routes/pages'));
// Public
app.use(express.static(path.join(__dirname,'public')));

// Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});
