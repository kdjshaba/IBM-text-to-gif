const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Mongoose Schema for storing search logs in db
const HistoryLogSchema = new Schema({
    gifUrl: {
        type: String,
        required:true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('HistoryLog', HistoryLogSchema)