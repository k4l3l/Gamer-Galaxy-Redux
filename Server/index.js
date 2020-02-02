let env = process.env.NODE_ENV || 'development'

let settings = require('./config/settings')[env]

const app = require('express')()
app.use(require('cookie-parser')());
//enabling cors on preflight
app.use(require('cors')({
    origin: 'http://localhost:4200',
    credentials: true
}));
require('./config/database')(settings)
require('./config/express')(app)
require('./config/routes')(app)
require('./config/passport')()
app.listen(settings.port)
console.log(`Server listening on port ${settings.port}...`)
