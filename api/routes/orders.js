const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    console.log('Inside Orders')
    res.json({
        message: 'It works'

    })
})

router.post('/',(req,res)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    // const order = req.body
    res.status(200).json({
        message:'Handling POST requests to /orders',
        order: order
    })
})

router.get('/:orderId',(req,res)=>{
    const id = req.params.orderId
    if (id === 'special'){
 
        res.status(200).json({
            orderId: id,
            message: 'Message is special'

        })
    }
    else {
        res.status(200).json({
            orderId: id,
            message: 'Not Special'
        })
    }
})
router.patch('/:orderId',(req,res)=>{
    // const id = req.params.orderId
    
        res.status(200).json({
       
            message: ' Order Message patched'

        })
    
})
router.delete('/:orderId',(req,res)=>{
    // const id = req.params.orderId
    
        res.status(200).json({
       
            message: 'Order Message deleted'

        })
    
})
module.exports = router