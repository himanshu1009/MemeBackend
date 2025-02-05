const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const postSchema=new Schema({
    Title:{
        type:String
    },
    Caption:{
        type:String,
        required:true
    },
    Upvotes:[
        {
            type:Schema.Types.ObjectId,
            ref:'Users',
            required:true
        }
    ],
    Comments:[{
        Description:{
            type:String,
            required:true
        },
        User:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
    }],
    Image:{
        type:String
    },
    User:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('Posts',postSchema);

