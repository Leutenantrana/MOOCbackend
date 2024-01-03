const mongoose = require('mongoose')

if (process.argv.length < 5) {
    console.log("Give Parrword, Name, Number as command-line argument")


}
const Password = process.argv[2]
const Name = process.argv[3]
const Number = process.argv[4]
const URL = `mongodb+srv://ranasagar974:${Password}@cluster0.6pjuww7.mongodb.net/MoocDatabase?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(URL)
const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const MoocDatabase = mongoose.model('MoocDatabase', noteSchema)

const note = new MoocDatabase({
    name: Name,
    number: Number,
})

if (Name && Number) {
    note.save().then(result => {
        console.log('note saved')
        mongoose.connection.close()
    })

} else {
    MoocDatabase.find({})
        .then(notes => {
            notes.forEach(note => {
                console.log(`${note.name} - ${note.number}`);
            });
            mongoose.connection.close();
        })
        .catch(error => {
            console.error('Error retrieving notes:', error.message);
            mongoose.connection.close();
        });
}