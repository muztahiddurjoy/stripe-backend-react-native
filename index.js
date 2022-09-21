require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Stripe = require('stripe')
const stripe = Stripe(process.env.SECRET_KEY)
const PORT = 6969;
app.use(express.json())
app.use(cors())


app.post('/bill', async (req,res)=>{
    try{
        const {name} = req.body
        if(!name){
            return res.status(500).json({error:"Please enter the name"})
        }
        else{
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(2*100),
                currency:'USD',
                payment_method_types:["card"],
                metadata: {name}
            })
            const clientSecret = paymentIntent.client_secret
            res.status(200).json({message:'Payment Initiated',clientSecret})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
})

app.listen(PORT,function(){
    console.log(`This app is running on port 6969`);
})