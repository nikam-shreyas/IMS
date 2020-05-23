const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    application:{
        submittedDate:{
            type: Date,
            required: true
        },
        approvedDate:{
            type: Date
        },
        workplace: {
            type: String,
            required: true
        },
        durationOfInternship: {
            type:String,
            required: true
        },
        reference:{
            type:String
        },
        offerLetter:{
            type: String, //to be changed to Document in later stages
            required: true
        }
    },
    approvedBy:[],
    docs: {
        ApplicationStatus: {
            type: String,
            default: 'N'
        },
        UndertakingStatus: {
            type: String,
            default: 'N'
        },
        OfferLetterStatus: {
            type: String,
            default: 'N'
        },
        MarksheetsStatus: {
            type: String,
            default: 'N'
        },
        AttendanceStatus: {
            type: String,
            default: 'N'
        },
    },
        completionStatus: {
            type: String,
            default: 'N'
        },
        holder: {
            type: String,
            default: 'Class coordinator'
        }
    });



module.exports = mongoose.model('Internship', internshipSchema)