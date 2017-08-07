const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

//connect to database
require('./server/models').connect(config.dbUri);

const app = express();

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.use(bodyParser.urlencoded({ extended: false }));


//passport
app.use(passport.initialize());
const localSignUp = require('./server/passport/local-signup');
const localLogin = require('./server/passport/local-login');
passport.use('local-signup', localSignUp);
passport.use('local-login', localLogin);

const authMiddle = require('./server/middleware/auth-check');
app.use('/api', AuthCheckMiddleware);


// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(3000, () => {console.log('Server is running on http://localhost:3000');
});