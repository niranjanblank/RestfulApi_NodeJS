const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/orders')
const Product = require('../models/products')


router.get('/',(req,res)=>{
    Order.find().select('quantity product _id').then(result=>{
        const response = {
            count: result.length,
            products: result.map(element => {
                return{
                    quantity: element.quantity,
                    product: element.product,
                    _id: element._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/orders/'+element._id
                    }
                }
            })
        }
        res.json(response)
    }).catch(err=>{
        console.log(err)
        res.json({
            error: err.message
        })
    })
})

router.post('/',(req,res)=>{
    // const order = {
    //     productId: req.body.productId,
    //     quantity: req.body.quantity
    // }
    Product.findById(req.body.productId)
    .then(product=>{
        if(!product){
            return res.status(404).json(
                {
                    message: 'Product not found'
                })
             }
             const order = new Order({
                quantity: req.body.quantity,
                product: req.body.productId
            }) 
            // const order = req.body
           return order.save()  
    }).then(result=>{
        console.log(result)
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
   
    
   
})

router.get('/:orderId',(req,res)=>{
    const id= req.params.orderId
    Order.findById(id).then(result=>{
        console.log(result)
        res.json(result)
    }).catch(err=>{
        console.log(err)
        res.json({
            error: err.message
        })
    })
})
router.patch('/:orderId',(req,res)=>{
    // const id = req.params.orderId
    
    const id = req.params.orderId
    const updateOps ={}
    for ( const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
//{ $set:{name: req.body.newName, price: req.body.newPrice}}
    Order.updateOne({_id:id},{ $set:updateOps}).then(result=>{
        res.json({
            message: 'Producted updated',
            request: {
                type:'GET',
                url: 'http://localhost:3000/orders/'+id
            }
        })
    }).catch(err=>{
        console.log(err)
        res.json(err.message)
    })
    
})
router.delete('/:orderId',(req,res)=>{
    // const id = req.params.orderId
    
     // const id = req.params.productId
    const id = req.params.productId
    Order.remove({_id: id}).then(result=>{
        res.status(200).json({
       
            message: 'Deleted'

        })
    }).catch(err=>{
        console.log(err)
        res.json({
            message:err.message
        })
    })
    
})
module.exports = router