const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
      
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5
    },
    lat: {
        type: Number,
        require: true
    },
    lng: {
        type: Number,
        require: true
    }
}, {timestamps: true} );

module.exports = mongoose.model("Pin", PinSchema);