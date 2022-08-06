const mongoose = require("mongoose")

const AdministratorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    emailId: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    avatar: {
        type: String,
        minlength: 3,
        maxlength: 500
    },
    phoneNo: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    loginId: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    status: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    }
})

module.exports = new mongoose.model("Administrator",AdministratorSchema)