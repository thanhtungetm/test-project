const { ModeTest } = require("../constant/index.constant");

module.exports = mongoose => {
    const schema = mongoose.Schema({
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        address: {
            type: String,
        },
        fullname: {
            type: String,
            required: [true, "Full name is required"],
        },
        active:{
            type: Boolean,
            default: true
        },
        favorites:[
            {type: mongoose.Schema.Types.ObjectId, ref: 'subject'}
        ],
        histories:[
            { 
                quizId: {type: mongoose.Schema.Types.ObjectId, ref: 'quiz'},
                score: {type: Number, default :0},
                answer: {type: String},
                mode: {type: Number, enum: [ModeTest.RANDOM, ModeTest.TEST]}
            }
        ],
        role: {
            type: String,
            default: 'User'
        }
    });

    return mongoose.model("user", schema);
};