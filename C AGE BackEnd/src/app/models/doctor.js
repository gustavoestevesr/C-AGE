const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    doctorNumber: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,        
        lowercase: true,
    },
    phone: {
        type: String,
    },   
    clinic: {
        type: String,
    }, 
    speciality: {
        type: String,
    },  
    password: {
        type: String,
        require: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// encriptografar a senha
DoctorSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;