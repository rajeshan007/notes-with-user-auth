require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express() 
const {checkSchema} = require('express-validator')

const port = process.env.PORT || 3030

const configureDB = require('./config/db')
const routes = require('./config/routes')
configureDB()
app.use(express.json())
app.use(cors()) 


const usersCtlr =  require('./app/controllers/users-controller')
const notesCtlr = require("./app/controllers/notes-controller")
const noteValidationSchema = require ("./app/helpers/note-validationSchema")
const {userRegistrationSchema, userLoginSchema} = require('./app/helpers/user-validation-schema')
const  authenticateUser  = require('./app/middlewares/authenticateUser')


app.post('/api/users/register', checkSchema(userRegistrationSchema), usersCtlr.register)
app.post('/api/users/login',  checkSchema(userLoginSchema), usersCtlr.login)
app.get('/api/users/account', authenticateUser, usersCtlr.account)


app.get("/api/notes/list", authenticateUser, notesCtlr.list)
app.get("/api/notes/:id", authenticateUser, notesCtlr.show)
app.post("/api/notes/create", authenticateUser, checkSchema(noteValidationSchema) , notesCtlr.create)
app.put("/api/notes/:id", authenticateUser, checkSchema(noteValidationSchema), notesCtlr.update)
app.delete("/api/notes/:id", authenticateUser, notesCtlr.destroy)


app.use('/',routes)


app.listen(port, () => {
    console.log('server running on port', port)
})