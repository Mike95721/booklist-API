const createError = require("http-errors");
const ObjectId = require("mongodb").ObjectId;
const { Books } = require("./models/books");
//let todoList = []
//let idno = 0

exports.index = async function (req, res) {
	Books.find().then((books) => res.send(books));
};

exports.create = async function (req, res, next) {
	if (!req.body.title) {
		return next(createError(400, "title of the book is required"));
	}

	const book = new Books({
		title: req.body.title,
		author: req.body.author,
		read: req.body.read,
		link: req.body.link,
	});
	book.save().then(() => res.send({ result: true }));
};

exports.show = async function (req, res, next) {
	Books.findOne({ _id: ObjectId(req.params.id) }).then((bookItem) => {
		if (!bookItem) {
			return next(createError(404, "no book with that id"));
		}
		res.send(bookItem);
	});
};

exports.showAuthor = async function (req, res, next) {
	Books.find({ author: req.params.author }).then((bookItem) => {
		if (!bookItem) {
			return next(createError(404, "no author with that name!"));
		}
		res.send(bookItem);
	});
};

exports.showTitle = async function (req, res, next) {
	Books.find({ title: req.params.title }).then((bookItem) => {
		if (!bookItem) {
			return next(createError(404, "no book with that name!"));
		}
		res.send(bookItem);
	});
};

exports.update = async function (req, res, next) {
	Books.findOne({ _id: ObjectId(req.params.id) }).then((bookItem) => {
		if (!bookItem) {
			return next(createError(404, "no book with that id"));
		}

		bookItem.title = req.body.title;
		bookItem.author = req.body.author;
		bookItem.read = req.body.read;
		bookItem.link = req.body.link;
		bookItem.save().then(() => res.send({ result: true }));
	});
};

exports.delete = function (req, res, next) {
	Books.deleteOne({ _id: ObjectId(req.params.id) })
		.then((r) => {
			if (r.deletedCount) {
				return res.send({ result: true });
			}
			return next(createError(404, "no book with that id"));
		})
		.catch((err) => console.log(err));
};
