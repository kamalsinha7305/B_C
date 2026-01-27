import mongoose from "mongoose";

const CategorySchema  = new mongoose.Schema({
    name:{
        type : String,
        default : null

    }, 
    image : {
        type :String,
        deafult : ""
    },

},{
    timestamps :true 
})

const categoryModel = mongoose.model("category", CategorySchema);

export default categoryModel;
