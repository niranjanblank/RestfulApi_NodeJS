const express = require('express')
const router = express.Router()
const Product = require('../models/products')
router.get('/',(req,res)=>{
    Product.find().then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
        res.json({
            error: err.message
        })
    })
})

router.post('/',(req,res)=>{
    // const  product = {
    //     name: req.body.name,
    //     price: req.body.price
    // }

    const product = new Product(req.body)
    product.save().then((result)=>{

        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })

    res.status(200).json({
        message:'Handling POST requests to /products',
        createdProduct: product
    })
})

router.get('/:productId',(req,res)=>{
    // const id = req.params.productId
    // if (id === 'special'){
 
    //     res.status(200).json({
    //         productId: id,
    //         message: 'Message is special'

    //     })
    // }
    // else {
    //     res.status(200).json({
    //         productId: id,
    //         message: 'Not Special'
    //     })
    // }
    const id= req.params.productId
    Product.findById(id).then(result=>{
        console.log(result)
        res.json(result)
    }).catch(err=>{
        console.log(err)
        res.json({
            error: err.message
        })
    })
    
})
router.patch('/:productId',(req,res)=>{
    const id = req.params.productId
    const updateOps ={}
    for ( const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
//{ $set:{name: req.body.newName, price: req.body.newPrice}}
    Product.updateOne({_id:id},{ $set:updateOps}).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
        res.json(err.message)
    })
     
    
})
router.delete('/:productId',(req,res)=>{
    // const id = req.params.productId
    const id = req.params.productId
    Product.remove({_id: id}).then(result=>{
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