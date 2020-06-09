const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title) searches for more than 1 duplicate but that defeats the purpose of the function
    const duplicateNote = notes.find((note) => note.title === title) // stops when the first duplicate is found, else returns 'undefined'

    debugger
    if (!duplicateNote) { //if there is no duplicate Note
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title)

    if (notes.length == newNotes.length) {
        console.log(chalk.red.inverse('No note found!'))
    } else {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(newNotes)
    }       
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your notes-'))
    notes.forEach((note) => console.log(note.title));
}
 
const saveNotes = (notes) => {
    const noteJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',noteJSON)
}

const readNote = (title) => {
    const notes = loadNotes()
    const toReadNote = notes.find((note) => note.title === title)
    
    if (toReadNote) {
        console.log(chalk.bold.underline.magentaBright(toReadNote.title))
        console.log(toReadNote.body)
    } else {
        console.log(chalk.red.inverse('Such Note not found!'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}