const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        validate: {
          validator: function(value){
             const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
             if(!(this.email.match(emailRegx))){
                return 
             }

             return this.email;
          },
          message: props => `${props.value} is not a valid email address`
        },
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true})


UserSchema.pre("save", async function(next){
     if(!this.isModified('password')){
       next()
     }
     
     const salt = await bcrypt.genSalt(10);
     this.password = bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);