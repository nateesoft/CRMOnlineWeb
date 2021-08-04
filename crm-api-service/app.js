const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const basicAuth = require("express-basic-auth")
const socketIo = require('socket.io')
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

// Socket.io
const io = socketIo();
app.io = io;

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
const memberMasterRouter = require("./routes/login.route")(options)
const lineLoginRouter = require("./routes/line_login.route")(options)
const crudRouter = require("./routes/table_crud.route")(options)
const companyRouter = require("./routes/company.route")(options)
const productRouter = require("./routes/product.route")(options)
const productGroupRouter = require("./routes/product_group.route")(options)
const stockRouter = require("./routes/stock.route")(options)
const promotionRouter = require("./routes/promotion.route")(io)
const roleRouter = require("./routes/role.route")(options)
const roleMappingRouter = require("./routes/roles_mapping.route")(options)
const memberRouter = require("./routes/member.route")(io)
const redeemRouter = require("./routes/redeem.route")(io)

// router for shopping
const cartsDetailRouter = require("./routes/carts_detail.route")(options)
const cartsRouter = require("./routes/carts.route")(options)
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

// swagger api document
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/", indexRouter)
app.use("/api/login", basicAuth({ users: { admin: fixPassword } }), memberMasterRouter)
app.use("/api/line", lineLoginRouter)
app.use("/api/crud", crudRouter)

// master
app.use("/api/company", basicAuth({ users: { admin: fixPassword } }), companyRouter)
app.use("/api/branch", basicAuth({ users: { admin: fixPassword } }), branchRouter)
app.use("/api/product", basicAuth({ users: { admin: fixPassword } }), productRouter)
app.use("/api/product_group", basicAuth({ users: { admin: fixPassword } }), productGroupRouter)
app.use("/api/stock", basicAuth({ users: { admin: fixPassword } }), stockRouter)
app.use("/api/promotion", basicAuth({ users: { admin: fixPassword } }), promotionRouter)
app.use("/api/redeem", basicAuth({ users: { admin: fixPassword } }), redeemRouter)
app.use("/api/role", basicAuth({ users: { admin: fixPassword } }), roleRouter)
app.use("/api/member", basicAuth({ users: { admin: fixPassword } }), memberRouter)
app.use("/api/roles_mapping", basicAuth({ users: { admin: fixPassword } }), roleMappingRouter)

// order shopping
app.use("/api/carts", basicAuth({ users: { admin: fixPassword } }), cartsRouter)
app.use("/api/carts_detail", basicAuth({ users: { admin: fixPassword } }), cartsDetailRouter)
app.use("/api/shipping", basicAuth({ users: { admin: fixPassword } }), memberShippingRouter)
app.use("/api/validate_slip", basicAuth({ users: { admin: fixPassword } }), slipImageRouter)
app.use("/api/orders", basicAuth({ users: { admin: fixPassword } }), ordersRouter)

// database config
app.use("/api/database_config", basicAuth({ users: { admin: fixPassword } }), dbConfigRouter)

// left menu
app.use("/api/leftmenu", basicAuth({ users: { admin: fixPassword } }), leftMenuRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    status: 'Someting wrong with api request:'+err
  })
})

// socket.io events
io.on( "connection", function( client ) {
  io.to(client.id).emit('client_id', client.id);
  client.on('disconnect', ()=>{
    io.to(client.id).emit('client_close', false);
  })
});

module.exports = app
