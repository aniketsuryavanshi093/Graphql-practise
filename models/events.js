const mongoose = require("mongoose")

const schema =  mongoose.Schema
const event = new schema({
    title: {
        type: String , required: true
    },
    description:{
        type: String , required: true
    },
    date: {
        type:String , required: true
    },
    price: {
        type: Number , required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Event" , event) 