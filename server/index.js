const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Admin = require('./models/admin.model')
const Notif = require('./models/notif.model')
const SubIntern = require('./models/submitted.model')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config()
const MONGO_URI = process.env.MONGO_URI;

app.use(cors()) 
app.use(express.json())

console.log("server starting")

mongoose.connect(MONGO_URI) 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected")
})


app.get('/hello', (req, res) => {
    res.send('hello world')
})

app.post('/api/register', async (req, res) => { 
    console.log(req.body)
    try {
            await User.create({
            stuname: req.body.stuname,
            firstname: req.body.FirstName,
            lastname: req.body.LastName,
            academicyear: req.body.AcademicYear,
            mothername: req.body.MotherName,
            fathername: req.body.FatherName,
            mobileno: req.body.MobileNo,
            email: req.body.Email,
            password: req.body.Password,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate' })
    }
    
})

app.post('/api/login', async (req, res) => { 
    const user = await User.findOne({
            email: req.body.Email,
            password: req.body.Password,
        })

        if (user) {

            const jwttoken  = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                }, 
                'secret222secret'
            )

            return res.json({ status: 'ok', token: jwttoken })

        } else {
            res.json({ status: 'error', token: false })
        }
})

app.post('/api/getuser', async (req, res) => {

    const userdata = await User.findOne({
        email: req.body.Email,
    })
    res.json(userdata)

})


app.post('/api/adminlogin', async (req, res) => { 
    const admin = await Admin.findOne({
            email: req.body.Email,
            password: req.body.Password,
        })

        if (admin) {

            const jwttoken  = jwt.sign( 
                {
                    name: admin.name,
                    email: admin.email,
                }, 
                'adminsecret222secret'
            )

            return res.json({ status: 'ok', token: jwttoken })

        } else {
            res.json({ status: 'error', token: false })
        }
})

app.post('/api/getadmin', async (req, res) => {
    console.log('test')
    const admindata = await Admin.findOne({
        email: req.body.Email,
    })
    res.json(admindata)
    console.log(admindata)
})

app.post('/api/postnotif', async (req, res) => { 
    console.log(req.body)
    try {
            await Notif.create({
            email: req.body.Email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            title: req.body.Title,
            info: req.body.Info,
            link: req.body.lLink,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate' })
    }
    
})

app.get('/api/getnotifs', async (req, res) => {
    const notifs = await Notif.find()
    res.json(notifs)
    console.log(notifs)
})

app.post('/api/getmynotifs', async (req, res) => {
    const notifs = await Notif.find({
        email: req.body.Email,
    })
    res.json(notifs)
})

app.post('/api/deletemynotifs', async (req, res) => {
    console.log(req.body.stuname)
    const notifs = await Notif.deleteOne({
        email: req.body.Email,
        title: req.body.thetitle,
    })
    res.json(notifs)
    console.log(notifs)
})

app.post('/api/subintern', async (req, res) => { 
    console.log(req.body)
    try {
            await SubIntern.create({
                email: req.body.Email,
                stuname: req.body.stuname,
                provider: req.body.Provider,
                fromduration: req.body.FromDuration,
                toduration: req.body.ToDuration,
                whatfor: req.body.WhatFor,
                domain: req.body.Domain,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate' })
    }
    
})

app.post('/api/getmyinterns', async (req, res) => {
    console.log(req.body.stuname)
    const myinternsdata = await SubIntern.find({
        email: req.body.Email,
    })
    res.json(myinternsdata)
    console.log(myinternsdata)
})

app.post('/api/deletemyinterns', async (req, res) => {
    console.log(req.body.stuname)
    const myinternsdata = await SubIntern.deleteOne({
        email: req.body.Email,
        whatfor: req.body.wfor,
    })
    res.json(myinternsdata)
    console.log(myinternsdata)
})

app.post('/api/getinternsforadmin', async (req, res) => {

    const internsdataforadmin = await SubIntern.find({
        stuname: req.body.searchquery,
    })
    res.json(internsdataforadmin)
    console.log(internsdataforadmin)
})

app.post('/api/getuserforadmin', async (req, res) => {

    const userdataforadmin = await User.findOne({
        stuname: req.body.searchquery,
    })
    res.json(userdataforadmin)
    console.log(userdataforadmin)
})

app.get('/api/getalluserforadmin', async (req, res) => {
    const alluserdataforadmin = await User.find()
    res.json(alluserdataforadmin)
})


app.listen(1337, () => {
    console.log('server started on port 1337')
})