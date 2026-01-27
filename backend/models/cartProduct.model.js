import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({

    product:{
        type : mongoose.Schema.ObjectId,
        ref : ""
    },
    quantity : {
        type:Number,
        default: 1 

    },
    userId :{
        type :mongoose.Schema.ObjectId,
        ref : "product"
    }

},{
    timestamps:true
})

const  CartProductModel = mongoose.model("cartProductSchema",cartProductSchema)
export default CartProductModel;
