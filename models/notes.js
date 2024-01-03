const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
console.log('Connecting to Database')
const URL = process.env.MONGODB_URI
mongoose.connect(URL)
    .then(() => {
        console.log('Connected to DataBase')
    })
    .catch((error) => {
        console.log(error.message)
    })



const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})



noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const MoocDatabase = mongoose.model('MoocDatabase', noteSchema)

module.exports = MoocDatabase