let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')

let api_routes = require('./routes/api.js')

let app = express()

app.use(express.static(path.join(__dirname, 'student-sign-in-client', 'dist')))

app.use(bodyParser.json())

app.use('/api', api_routes)

//  Error handlers - for route not found
app.use( (req, res, next) =>{
    res.status(404).send('Not found')
})
// Error handlers for server errors
app.use((err, req,res,next) =>{
    console.log(err.stack)
    res.status(500).send('Server error')
})

let server = app.listen(process.env.PORT || 3000, () => {
    console.log("Express server running on port", server.address().port)
})