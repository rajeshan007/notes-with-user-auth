const Note = require("../models/note-model")
const _ = require("lodash")
const { validationResult } = require("express-validator")

const notesCtlr = {}

notesCtlr.list = async (req, res) => {
    try {
        const note = await Note.find({ userId: req.userId })
        res.json(note)
    } catch (e) {
        res.json(e)
    }


}


notesCtlr.create = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        } else {
            const body = _.pick(req.body, ["title", "body"])
            const note = await new Note(body)
            console.log(note);
            note.userId = req.userId
            await note.save()
            res.json(note)
        }
    } catch (e) {
        res.status(404).json(e)
    }

}

// find single record 
notesCtlr.show = async (req, res) => {
    const id = req.params.id
    try {
        const note = await Note.findOne({ _id: id, userId: req.userId })
        // const note =  await findById(id)
        if (!note) {
            res.status(404).json({})
        } else {
            res.json(note)
        }
    } catch (e) {
        res.json(e)
    }
}

// to update the record 
notesCtlr.update = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const note = await Note.findOneAndUpdate({ _id: id, userId: req.userId }, body, { new: true })
        if (!note) {
            res.status(404).json({})
        } else {
            res.json(note)
        }
    } catch (e) {
        res.json(e)
    }
}

// to delete a record 
notesCtlr.destroy = async (req, res) => {
    const id = req.params.id
    try {
        const note = await Note.findOneAndDelete({ _id: id, userId: req.userId })
        if (!note) {
            res.status(404).json({})
        } else {
            res.json(note)
        }

    } catch (e) {
        res.json(e)
    }
}

module.exports = notesCtlr