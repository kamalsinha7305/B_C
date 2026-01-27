import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    
    userid : {
        type : mongoose.Schema.ObjectId , 
        ref : "User"
    },
    orderId:{
        type :String ,
        required :[true, "provide orderId"],
        unique :true 
    },
    product_id :{
       type: mongoose.Schema.ObjectId,
       ref:"product"
    },
    product_details :{
        name :String,
        image :Array ,       

    },
    payment_id :{
        
        type :String, 
        default : ""
    },
    payment_status :{
        type: String, 
        default : ""
    },
    delivery_address : {
          type : mongoose.Schema.ObjectId,
          ref :"address"
    }, 
    delivery_status : {

    },
    subTotalAmt : {
        type:Number , 
        default:0
    },
    totalAmt : {
        type : Number,
        default : 0,

    },
    invoice_receipt : {
        type : String, 
        default : null
    }
},{
    timestamps :true 
})
const Ordermodel =mongoose.model("order",OrderSchema);
export default Ordermodel;
