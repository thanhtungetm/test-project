const db = require("./index");
module.exports = mongoose => {
    const schema = mongoose.Schema({
        name: {
            type: String,
            require: [true, "Name is required!"]
        },
        score: {
            type: Number
        },
        quizes: [ {type: mongoose.Schema.Types.ObjectId, ref: 'quiz'}]
    }, { timestamps: true });

    // Replace _id with id and remove __V
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("test", schema);
};