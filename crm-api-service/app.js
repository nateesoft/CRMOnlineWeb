const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const basicAuth = require("express-basic-auth")
const http = require("http")
const { Server } = require("socket.io");

require('dotenv').config();

const logger = require('./logger');

// api document
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'CRM API SERVICE',
      description: 'Support Web Daily Online Web',
      contact: {
        name: 'Nathee Sungthong-ngam'
      },
    },
    basePath: '/api',
    securityDefinitions: {
      auth: {
        type: 'basic'
      }
    },
    security: [
      { 
        auth: [] 
      }
    ]
  },
  apis: ['./routes/*.js']
}

if(!global.requireModel) {
  global.requireModel = name=>{
    return require(__dirname+'/models/'+name+'.model.js');
  }
}
if(!global.requireControl) {
  global.requireController = name=>{
    return require(__dirname+'/controllers/'+name+'.controller.js');
  }
}
if(!global.requireRoute) {
  global.requireRoute = name=>{
    return require(__dirname+'/routes/'+name+'.route.js');
  }
}

const helmet = require("helmet")
const cors = require("cors")
const nocache = require('nocache');

const fixPassword = process.env.FIX_PASSWORD;

const setupLogger = (req, res, next) => {
  logger.debug(`${req.method} ${req.path} ${res.statusCode}`);
  next();
}

const app = express()
app.use(cors());
app.use(setupLogger);
app.use(helmet())
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(nocache());
app.use(helmet.hidePoweredBy({ setTo: 'SOFTPOS' }));
app.disable('etag');

// SocketIO
const server = http.createServer(app)
const io = new Server(server);

const mailer = require('./infra/mailer/usecases')({
  smtpHost: 'smtp.ethereal.email',
  smtpPort: 587,
  smtpSecureProtocol: false,
  smtpUser: 'reagan.littel54@ethereal.email',
  smtpPassword: 'QryzWxR1vcBdumaC3R',
  smtpSender: 'no-reply@digitalten.xyz',
});

const options = {
  imagePath: __dirname + '/public/images',
  mailer
}

const indexRouter = require("./routes/index")(options)
const branchRouter = require("./routes/branch.route")(options)
const loginRouter = require("./routes/login.route")(options)
const lineLoginRouter = require("./routes/line_login.route")(options)
const companyRouter = require("./routes/company.route")(options)
const productRouter = require("./routes/product.route")(options)
const productGroupRouter = require("./routes/product_group.route")(options)
const stockRouter = require("./routes/stock.route")(options)
const promotionRouter = require("./routes/promotion.route")()
const roleRouter = require("./routes/role.route")(options)
const roleMappingRouter = require("./routes/roles_mapping.route")(options)

const memberRouter = require("./routes/member.route")(io)
const redeemRouter = require("./routes/redeem.route")(io)

// router for shopping
const cartsDetailRouter = require("./routes/carts_detail.route")(options)
const cartsRouter = require("./routes/carts.route")(io)
const memberShippingRouter = require("./routes/member_shipping.route")(options)
const slipImageRouter = require("./routes/slip_image.route")(options)
const ordersRouter = require("./routes/orders.route")(options)

// router for database config
const dbConfigRouter = require('./routes/database_config.route')(options)

// router for leftmenu
const leftMenuRouter = require('./routes/left_menu.route')(options)

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// set date prototyp
Date.prototype.toJSON = function(){
  const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
  this.setHours(hoursDiff);
  return this.toISOString();
};

// swagger api document
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/", indexRouter)
app.use("/api/login", WithAuth(), loginRouter)
app.use("/api/line", lineLoginRouter)

function myAuthorizer(username, password) {
  const userMatches = basicAuth.safeCompare(username, 'admin')
  const passwordMatches = basicAuth.safeCompare(password, fixPassword)

  return userMatches & passwordMatches
}

function getUnauthorizedResponse(req) {
  return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'Unauthorized'
}

function WithAuth() {
  return basicAuth({ authorizer: myAuthorizer, unauthorizedResponse: getUnauthorizedResponse })
}

// master
app.use("/api/company", WithAuth(), companyRouter)
app.use("/api/branch", WithAuth(), branchRouter)
app.use("/api/product", WithAuth(), productRouter)
app.use("/api/product_group", WithAuth(), productGroupRouter)
app.use("/api/stock", WithAuth(), stockRouter)
app.use("/api/promotion", WithAuth(), promotionRouter)
app.use("/api/redeem", WithAuth(), redeemRouter)
app.use("/api/role", WithAuth(), roleRouter)
app.use("/api/member", WithAuth(), memberRouter)
app.use("/api/roles_mapping", WithAuth(), roleMappingRouter)

// order shopping
app.use("/api/carts", WithAuth(), cartsRouter)
app.use("/api/carts_detail", WithAuth(), cartsDetailRouter)
app.use("/api/shipping", WithAuth(), memberShippingRouter)
app.use("/api/validate_slip", WithAuth(), slipImageRouter)
app.use("/api/orders", WithAuth(), ordersRouter)

// database config
app.use("/api/database_config", WithAuth(), dbConfigRouter)

// left menu
app.use("/api/leftmenu", WithAuth(), leftMenuRouter)

// socket.io events
io.on( "connection", function( client ) {
  io.to(client.id).emit('client_id', client.id);
  client.on('disconnect', ()=>{
    io.to(client.id).emit('client_close', false);
  })
});

io.on('connection', (socket) => {
  console.log('Client connected by id: ' + socket.id);
});

/**
 * Event listener for HTTP server "error" event.
 */

 function onError(error) {
  console.log('onError', error);
  if (error.syscall !== "listen") {
    throw error
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  console.log("Listening on " + bind)
}

const port = process.env.API_PORT || "5000"

server.on("error", onError)
server.on("listening", onListening)

server.listen(port, () => {
  console.log("API running port:", port)
});

module.exports = app;
