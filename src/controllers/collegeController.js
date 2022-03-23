const collegeModel = require("../models/collegeModel");



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const createCollege = async function (req, res){
    try {
        let data = req.body;
        let { name, fullName, logoLink } = data   // Destructuring

        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "BAD REQUEST" }) // javascript property
            return
        }
        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: "Abb name is required" })
            return
        }
        // if (!(/^(?:[-A-Z]+\.? )+[-A-Z]+$/.test(name))){
        //     res.status(400).send({ status: false, msg: "Name should not have any special characters"})
        //     return
        // }
        let isNameAlreadyUsed = await collegeModel.findOne({ name })
        if (isNameAlreadyUsed) {
            res.status(400).send({ status: false, msg: "This name has already used" })
            return
        }
        if (!isValid(fullName)) {
            res.status(400).send({ status: false, msg: "Full name is required" })
            return
        }
        // if (!(/^(?:[-A-Z]+\.? )+[-A-Z]+$/.test(fullName))){
        //     res.status(400).send({ status: false, msg: "fullName should not have any special characters"})
        //     return
        // }
        if (!isValid(logoLink)) {
            res.status(400).send({ status: false, msg: "LogoLink is required"})
            return
        }
        else {
            let createdCollege = await collegeModel.create(data)
            res.status(201).send({ data: createdCollege })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message});
    }
};





module.exports.createCollege = createCollege;