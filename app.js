//const chalk = require('chalk')
const yargs = require('yargs')
//const validator = require('validator')                        required or loaded validator into app.js
const notesUtilities = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },   
    handler(argv) {
        notesUtilities.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtilities.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notesUtilities.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    handler() {
        notesUtilities.listNotes()
    }
})



yargs.parse()
//console.log(yargs.argv)

// if (command === 'add') {
//     console.log('Adding note!!')
// } else if (command === 'remove') {
//     console.log('Removing note!!')
// }