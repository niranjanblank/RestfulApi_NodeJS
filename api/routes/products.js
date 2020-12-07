const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    console.log('Inside Products')
    res.json({
        message: 'It works'

    })
})

router.post('/',(req,res)=>{
    res.status(200).json({
        message:'Handling POST requests to /products'
    })
})

router.get('/:productId',(req,res)=>{
    const id = req.params.productId
    if (id === 'special'){
 
        res.status(200).json({
            productId: id,
            message: 'Message is special'

        })
    }
    else {
        res.status(200).json({
            productId: id,
            message: 'Not Special'
        })
    }
})
router.patch('/:productId',(req,res)=>{
    // const id = req.params.productId
    
        res.status(200).json({
       
            message: 'Message patched'

        })
    
})
router.delete('/:productId',(req,res)=>{
    // const id = req.params.productId
    
        res.status(200).json({
       
            message: 'Message deleted'

        })
    
})


module.exports = router