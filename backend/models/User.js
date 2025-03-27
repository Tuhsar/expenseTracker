const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema(
    {
        fullName : { type: String , required: true},
        email: {type: String , required:true},
        password: {type: String, required:true},
        profileImageUrl: {type: String, required:null},
    },
    { timestamp:true}
);

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
};

module.exports = mongoose.model("User" ,UserSchema);