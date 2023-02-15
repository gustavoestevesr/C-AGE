const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ElderlySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    susNumber: {
        type: String,
        unique: true,
        require: true,
    },
    birthdayDate: {
        type: String,                
    },
    email: {
        type: String,
        lowercase: true,
    },
    phone: {
        type: String,
    },    
    age: {
        type: Number,
    },
    bloodType: {
        type: String,
        uppercase: true,
    },
    status: {
        type: String,
        lowercase: false,
        default: 'perfeito'
    },
    cep: {
        type: String,
    },
    number: {
        type: String,
    },
    emergencyContact: {
        emergencyName: {
            type: String,
        },
        emergencyEmail: {
            type: String,
        },
        emergencyPhone: {
            type: String,
        },
        emergencyCep: {
            type: String,
        },
        emergencyNumber: {
            type: String,
        },
    },
    allergy: {
        type: String,
    },
    continuousMedication: {
        type: String,
    },
    socialHabit: {
        type: String,       
    },
    appointments: [{
        doctorName: {
            type: String,
        },
        appointmentTitle: {
            type: String,
        },
        appointmentDescription: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }],
    comments: [{
        doctorName: {
            type: String,
        },
        commentTitle: {
            type: String,
        },
        commentDescription: {
            type: String,
        },
        tag: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }],
    intercorrences: [{              
        intercorrenceTitle: {
            type: String,
        },
        intercorrenceDescription: {
            type: String,
        },
        intercorrencePainLevel: {
            type: String,
        },        
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }],
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
ElderlySchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Elderly = mongoose.model('Elderly', ElderlySchema);

module.exports = Elderly;