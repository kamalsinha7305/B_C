import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,

    },

    image:
    {
        type: Array,
        default: []
    }
    ,
    categoryid: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        }
    ],
    sub_categoryid: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "sub_category"
        }
    ],

    unit: {
        type: String,
        default: "",
    },
    stock: {
        type: number,
        default: 0

    },
    price: {
        type: Number,
        default: 0

    },
    discount: {
        type: Number,
        default: null
    },

    description: {
        type: String,
        dfault: "",

    },
    more_details: {
        type: Object,
        defalt: null
    },
    publish: {
        type: Boolean,
        type: true
    }

}, {
    timestamps: true
});
const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;
