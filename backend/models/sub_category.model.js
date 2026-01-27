import mongoose from "mongoose";

const Sub_CategorySchema  = new mongoose.Schema({
    name:{
        type : String,
        default : ""

    }, 
    image : {
        type :String,
        deafult : ""
    },
    categoryid :[
        {
            type : mongoose.Schema.ObjectId,
            ref : "category"
        }
    ]

},{
    timestamps :true 
});
const Sub_categoryModel = mongoose.model("sub_category", Sub_CategorySchema);
export default Sub_categoryModel;
