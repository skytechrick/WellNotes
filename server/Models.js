import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const URL = `mongodb+srv://${process.env.Mongodb_Username}:${process.env.Mongodb_Password}@${process.env.Mongodb_Domain}/${process.env.Mongodb_DataBase}`;
mongoose.connect(URL);
console.log(URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});
const Schema = mongoose.Schema;
const Model = mongoose.model;








const userSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        lowercase: true,
    },
    Authentication:{
        Token:{
            type: String,
        },
        Date:{
            type: Date,
            default: Date()
        }
    },
    Tokens_Earned:{
        type: Number,
        required: true
    },
    Journals:[
        {
            _id : false,
            ID:{
                type: String,
                required: true
            },
            Title:{
                type: String,
                required: true
            },
            Description:{
                type: String,
                required: true
            },
            Date:{
                type: Date,
                default: Date()
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date()
    },
});

const Users = Model('Users', userSchema);

export {Users};