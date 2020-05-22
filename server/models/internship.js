const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

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