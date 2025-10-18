const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
    { 
        company_name: {
            type: String, 
            required: true,
            trim: true,
            maxlength: 100
        },
        company_email: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        company_phone: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20
        },
        company_address: {
            street: {
                type: String,
                required: true,
                trim: true,
                maxlength: 200
            },
            city: {
                type: String,
                required: true,
                trim: true,
                maxlength: 100
            },
            state: {
                type: String,
                required: true,
                trim: true,
                maxlength: 100
            },
            country: {
                type: String,
                required: true,
                trim: true,
                maxlength: 100
            },
            zipCode: {
                type: String,
                required: true,
                trim: true,
                maxlength: 20
            }
        },
        company_logo: {
            type: String,
            trim: true,
            default: null
        },
        company_website: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, 'Please enter a valid website URL'],
            default: null
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SuperAdmin',
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active'
        }
    },
    {timestamps: true},
    { strict: false }
);

module.exports = mongoose.model('Company', CompanySchema);
