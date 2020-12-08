const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//connect to mongodb
const localURI='mongodb://localhost:27017/restDB'
mongoose.connect(localURI, {useNewUrlParser:true, useUnifiedTopology: true})
.then((result)=>{
    console.log('connected to db')
    //listen for requests
    app.listen(3000)
}).catch((err)=>{console.log(err)})


// prevent cors error
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*') // for CORS, * can be replaced to address like http://www.example.com
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-TYpe, Accept, Authorization')

    if (req.method === 'OPTIONS'){
        // browsers always sends options req first if we send post req
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})


const  productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')


app.get('/',(req,res)=>{
    res.json({
        message:'HomePage'
    })
})

// routes
app.use('/products',productRoutes) 
app.use('/orders',orderRoutes)   


// 404 routing
app.use((req,res,next)=>{
 res.json({
     message: 'Error'
 })
//  const error = new Error('Not Found')
//  error.status = 404
//  next(error) 
})

// app.use((error,req,res)=>{
//     res.status(error.status).json({
//         error :{
//             message: error.message
//         }
//     })
// })


// app.listen(3000)
// module.exports = app;