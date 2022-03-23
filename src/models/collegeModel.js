const mongoose = require("mongoose");



const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name in abb is required",
        unique: true,
        lowercase: true,
        trim: true,
        // validate: {
        //     validator: function (name){
        //         if (/^(?:[-A-Z]+\.? )+[-A-Z]+$/.test(name)){
        //             return (true)
        //         }
        //         alert("You have entered an invalid name!")
        //         return (false)
        //     }
        // }
    },
    fullName: {
        type: String,
        required: "Full name of college is required",
        trim: true,
        // validate: {
        //     validator: function (fullName){
        //         if (/^(?:[-A-Z]+\.? )+[-A-Z]+$/.test(fullName)){
        //             return (true)
        //         }
        //         alert("You have entered an invalid fullName!")
        //         return (false)
        //     }
        // }
    },
    logoLink: {
        type: String,
        required: "Link is required"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



module.exports = mongoose.model("College", collegeSchema);