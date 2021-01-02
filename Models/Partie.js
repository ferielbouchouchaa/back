const mongoose = require('mongoose')

const PartieSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    user_Create:{
        id:Number,
        name:{type :String}

    },
    users :[{
        id:{type:Number}

    }],
    messages:[{
        userSent:{type:Number},
        value:{type:String},
        date:{type: Date, default: Date.now}
    }]

})

const Msg= mongoose.model('partie',PartieSchema,"partie");
module.exports=Msg;