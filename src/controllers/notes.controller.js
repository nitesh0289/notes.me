const Notes = require("../models/notes.model");
const User = require("../models/users.model");

async function createNote(req, res) {
  const { text } = req.body;
  try {
    if (req.userEmail) res.status(403).json({ success: 403, message: "You're not authorized" });
    console.log(req.userId);
    const user = await User.findById(req.userId);
    if (!user) res.status(404).json({ success: 404, message: "User not found!" });
    console.log({ user });
    const newNote = new Notes({
      text,
      userId: user._id,
    });

    await newNote.save();
    res.status(201).json({ success: 200, data: newNote });
  } catch (error) {
    res.status(500).json({ success: 500, message: `Error creating note ${error}` });
  }
}

async function getNote(req, res) {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
}
async function getAllNotes(req, res) {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
}
async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = await Notes.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
}
async function deleteNote(req, res) {
  try {
    const note = await Notes.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
}

module.exports = {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
};
