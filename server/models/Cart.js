const mongoose=require('mongoose')

const CartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cartItems:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    bill: {
        type: Number,
        default: 0
      },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Cart=mongoose.model('Cart',CartSchema);
module.exports=Cart;