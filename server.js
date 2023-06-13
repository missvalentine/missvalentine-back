const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')
const connectDB = require('./config/db')
var colors = require('colors')
const app = express()
const contactRouter = require('./routes/contact')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const subcategoryRouter = require('./routes/subcategory')
const cartRouter = require('./routes/cart')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

const port = process.env.PORT || 5000

// Connect to database
connectDB()
// console.log('hello'.cyan, process.env.SECRET);

//Middlewares
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World! Miss Valentine server')
  res.end()
})

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/contact', contactRouter)
app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/subcategory', subcategoryRouter)
app.use('/api/cart', cartRouter)

app.listen(port, () => {
  console.log(` App listening at ${port}`)
})
