const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	title: String,
	author: String,
	read: Boolean,
	link: String,
});

module.exports.Books = mongoose.model("book", bookSchema);
