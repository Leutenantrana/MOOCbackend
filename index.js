const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const Phonebook = require('./models/notes')




morgan.token('type', (req) => JSON.stringify(req.body))
const infor = function(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.type(req, res)
    ].join(' ')
}
app.use(express.json());

app.use(morgan(infor))
const date = new Date();
const gmtTime = date.toUTCString();


const info = `Phonebook has info for ${Phonebook.length} people <br/><br/> ${gmtTime} (Indian Standard Time)`


app.get('/api/persons', (request, response) => {
    Phonebook.find({})
        .then(notes => {
            response.json(notes)
        })
        .catch((error) => {
            console.error(error.message)
        })
})


app.get('/info', (request, response) => {
    Phonebook.countDocuments({}, (err, count) => {
        if (err) {
            console.error('Error counting documents:', err.message);
            mongoose.connection.close();
        } else {
            console.log(`Total number of entries in the database: ${count}`);
            mongoose.connection.close();
        }
    });


})
app.get('/api/persons/:id', (request, response) => {
    Phonebook.findById(request.params.id)
        .then(person => {
            response.json(person)

        })
        .catch(() => {
            response.status(404).end()
        })



})
app.delete('/:id', (request, response, next) => {
    Phonebook.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(203).end()
        })
        .catch(error => next(error))
})
app.put('/:id', (request, response, next) => {
    const body = request.body

    const person = new Phonebook({
        name: body.name,
        number: body.number,
    })

    Phonebook.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
                .catch(error => next(error))
        })
})

app.post('/', (request, response, next) => {
    const body = request.body

    const note = new Phonebook({
        name: body.name,
        number: body.number
    })
    note.save()
        .then(savednote => {
            response.json(savednote)
        })
        .catch(error => next(error))
})





const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`app running at port : ${PORT}`)
})