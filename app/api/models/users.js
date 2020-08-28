// Load Mongoose, Bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Salts Quantity
const saltRounds = 10;

// Schemes Definition
const Schema = mongoose.Schema;

// Create Scheme Users
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },    
    dateRegister: {
        type: Date,
        trim: false,
        required: true
    }
});

// Before storing the password in the database we encrypt it with Bcrypt
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// Exports Users Model
module.exports = mongoose.model('User', UserSchema);