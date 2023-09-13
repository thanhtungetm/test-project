const { QuizType } = require("../constant/index.constant");

module.exports = mongoose => {
    const schema = mongoose.Schema({
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        type: {
            type: Number,
            enum: [QuizType.YES_NO, QuizType.MULTI_CHOICE]
        },

        yesNoAnswer: {
            type: Boolean,
            default: false
        },

        options: [{
            body: String,
            correct: {
                type: Boolean,
                default: false
            }
        }],
        subjectId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'subject'
        }
    }, { timestamps: true });

    // Replace _id with id and remove __V
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("quiz", schema);
};