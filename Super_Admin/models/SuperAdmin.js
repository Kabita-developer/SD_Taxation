const mongoose = require('mongoose');
const SuperAdminSchema = new mongoose.Schema(
    { 
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required: true},
        role: {type: String, default: 'superadmin'},
        resetPasswordToken: {type: String},
        resetPasswordExpires: {type: Date}
    },
    {timestamps: true}
);


module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);