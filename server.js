const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = requie('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db:sequelize
    })
};
const app = express();
const PORT = process.env.PORT || 5001;
const hbs = exphbs.create({ helpers });
app.use(session(sess));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(routes);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); 

sequelize.sync({ force:false }).then(()=> {
    app.listen(PORT, () => console.log('Now Unicorns are listening on 5001'));
});
