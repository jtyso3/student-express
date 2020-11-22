let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', (req, res, next) =>{
    Student.findAll().then( students => {
        return res.json(students)
    })
})

router.post('/students', (req, res, next) =>{
    Student.create(req.body).then( (data) => {
        return res.status(201).send('ok')
    })
})

module.exports = router