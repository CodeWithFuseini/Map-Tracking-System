const mongoose = require("mongoose");

const connectDB = async () => {
    const db = await mongoose.connect(process.env.MONGO_URI);
    if(db.connection){
        console.log(`MongoDB Connected: ${db.connection.host}`);
        return 
    }

    console.log("DB failed to connect");
    process.exit(1);

}

module.exports = connectDB;