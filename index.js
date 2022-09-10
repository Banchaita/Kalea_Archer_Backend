require('dotenv').config({path:__dirname+"/.env"})
require('./server/connections')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const cors=require('cors')


const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors())


app.get('/', (req,res) => {
    res.sendFile(__dirname+'/server/views/index.html')
})


app.use('/files', express.static(__dirname + '/server/serivces/upload/admin'));
app.use('/files', express.static(__dirname + '/server/serivces/upload/advertisement'));
app.use('/files', express.static(__dirname + '/server/serivces/upload/customer'));
app.use('/files', express.static(__dirname + '/server/serivces/upload/category'));
app.use('/files', express.static(__dirname + '/server/serivces/upload/designer'));
app.use('/files', express.static(__dirname + '/server/serivces/upload/product'));




const admin = require('./server/router/admin')
app.use(process.env.api_v1+'admin',admin)

const dashboard = require('./server/router/dashboard')
app.use(process.env.api_v1+'dashboard',dashboard)

const designer = require('./server/router/designer')
app.use(process.env.api_v1+'designer',designer)

const customer = require('./server/router/customer')
app.use(process.env.api_v1+'customer',customer)

const advertisement = require('./server/router/advertisement')
app.use(process.env.api_v1+'advertisement',advertisement)

const category = require('./server/router/category')
app.use(process.env.api_v1+'category',category)

const product = require('./server/router/product')
app.use(process.env.api_v1+'product',product)

const collection = require('./server/router/collection')
app.use(process.env.api_v1+'collection',collection)

const order = require('./server/router/order')
app.use(process.env.api_v1+'order',order)

const transaction = require('./server/router/transaction')
app.use(process.env.api_v1+'transaction',transaction)



const port = process.env.port ||4000 
app.listen(port,()=>{
    console.log('server is running',+port);
})



