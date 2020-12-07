const express = require('express')

const app = express()
const  productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')


app.get('/',(req,res)=>{
    res.json({
        message:'HomePage'
    })
})

// middleware
app.use('/products',productRoutes) //sends json resposnse
app.use('/orders',orderRoutes)   
// next()


app.listen(3000)
// module.exports = app;