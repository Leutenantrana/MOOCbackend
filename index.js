const express = require('express')
const app = express()

let notes = [{
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
},
{
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
},
{
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
},
{
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
}
]
const date = new Date();
const gmtTime = date.toUTCString();
const info = `Phonebook has info for ${notes.length} people <br/><br/> ${gmtTime} (Indian Standard Time)`


app.get('/api/persons', (request, response) => {
    response.json(notes)
})


app.get('/info', (request, response) => {
    response.send(info)

   
})
const PORT = 4000

app.listen(PORT, () => {
    console.log(`app running at port : ${PORT}`)
})