const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;




const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)  // for validating objectId
}

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        let { name, email, mobile, collegeName, collegeId } = data  // Destructuring

        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "BAD REQUEST" })
            return
        }
        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: "Student name is required" })
            return
        }
        // if (!(/^(?:[-A-Z]+\.? )+[-A-Z]+$/.test(name))){
        //     res.status(400).send({ status: false, msg: "Student name should not have any special characters"})
        //     return
        // }
        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: "Email is required" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, msg: "Email should be valid email address" })
            return
        }
        let isEmailAlreadyUsed = await internModel.findOne({ email })
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, msg: "Email address already used" })
            return
        }
        if (!isValid(mobile)) {
            res.status(400).send({ status: false, msg: "Mobile number must be present" })
            return
        }
        if (!(/^\d{10}$/.test(mobile))) {
            res.status(400).send({ status: false, msg: "Mobile number should be of 10 digits" })
            return
        }
        let isMobileAlreadyUsed = await internModel.findOne({ mobile })
        if (isMobileAlreadyUsed) {
            res.status(400).send({ status: false, msg: "Mobile Number already used" })
            return
        }
        if (!isValid(collegeName)) {
            res.status(400).send({ status: false, msg: "Full name of college is required" })
            return
        }
        if (!isValid(collegeId)){
            res.status(400).send({ status: false, msg: "CollegeId is required"})
            return
        }
        if (!isValidObjectId(collegeId)){
            res.status(400).send({ status: false, msg: "This is not a valid collegeId"})
            return
        }

        const college = await collegeModel.find({ fullName: collegeName, isDeleted: false })
        if (!isValid(college)) {
            res.status(404).send({ status: false, msg: "College not found" })
            return
        }
        const createdIntern = await internModel.create(data)
            res.status(201).send({ data: createdIntern })
            return

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
    }
};


// GET COLLEGE DETAILS -:

const collegeDetails = async function (req, res) {
    try {
            let college_name = req.query.collegeName
            if (!isValid(college_name)){
                res.status(400).send({status: false, msg: "College name is required in Query param"})
                return
            }

            let collegeData = await collegeModel.findOne({ name: college_name })
            
            if (!isValid(collegeData)) {
                res.status(400).send({ status: false, message: "College name is Invalid" });
                return
            }
            const college_id = collegeData._id
            let internDetails = await internModel.find({ collegeId: college_id, isDeleted: false })
                res.status(200).send({ data: collegeData, Interns: internDetails })
                return
          
        } catch (err) {
        console.log(err)
        res.status(500).send({status: false, message: err.message })
    }
}


module.exports.createIntern = createIntern;
module.exports.collegeDetails = collegeDetails;