const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const router = express.Router()
const Administrator = require("../models/administrator")

//GET ALL ADMINISTRATORS
router.get("/", async (req, res) => {
    const allAdmin = await Administrator.find()
    res.send(allAdmin)
})

//CREATE NEW ADMINISTRATOR
router.post("/", async (req, res) => {
    const administrator = new Administrator({
        fullName: req.body.fullName,
        emailId: req.body.emailId,
        phoneNo: req.body.phoneNo,
        avatar: req.body.avatar,
        loginId: req.body.loginId,
        password: req.body.password,
        status: req.body.status,
        dateCreated: new Date(),
        dateUpdated: new Date()
    })

    await administrator.save().then(() => {
        res.send(administrator)
    }).catch(error => {
        res.send({ error: "Error Occurred while saving the new administrator" })
    })
})

//GET ADMINISTRATOR BY ID
router.get("/:adminId", async (req, res) => {
    try {
        const administrator = await Administrator.findById(req.params.adminId)
        res.send(administrator)
    } catch (error) {
        res.send(`Administrator with adminId ${req.params.adminId} Not found`)
    }
})

//UPDATE ADMINISTRATOR BY ID
router.put("/:adminId", async (req, res) => {
    try {
        const administrator = await Administrator.findByIdAndUpdate(req.params.adminId, {
            fullName: req.body.fullName,
            emailId: req.body.emailId,
            phoneNo: req.body.phoneNo,
            avatar: req.body.avatar,
            loginId: req.body.loginId,
            password: req.body.password,
            status: req.body.status,
            dateUpdated: new Date()
        }, { new: true })
        res.send(administrator)
    } catch (error) {
        res.send(`Administrator with adminId ${req.params.adminId} Not found`)
    }
})

//DELETE ADMINISTRATOR BY ID
router.delete("/:adminId", async (req, res) => {
    const administrator = await Administrator.findByIdAndDelete(req.params.adminId, { new: true })
    res.send(administrator)
})

module.exports = router