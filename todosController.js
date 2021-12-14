const req = require("express/lib/request");
const createError = require("http-errors");
let bookList = []; //create an empty array
let idno = 0;

exports.index = function (req, res) {
	res.send(bookList);
};

exports.create = function (req, res, next) {
	if (!req.body.author) {
		return next(createError(400, "name is required"));
	}

	bookList.push({
		id: idno,
		author: req.body.author,
		title: req.body.title,
		read: req.body.read,
		link: req.body.link,
	});
	idno++;
	res.send({ result: "true" });
};

exports.show = function (req, res, next) {
	//verifying
	const bookItem = bookList.find((item) => item.id == req.params.id);
	if (!bookItem) {
		return next(createError(404, "no book with that id"));
	}
	res.send(bookItem);
};

exports.showAuthor = function (req, res, next) {
	//verifying
	const bookItem = bookList.find((item) => item.author == req.params.author);
	if (!bookItem) {
		return next(createError(404, "no book with that id"));
	}
	res.send(bookItem);
};

exports.update = function (req, res, next) {
	//verifying
	const bookItem = bookList.find((item) => item.id == req.params.id);

	if (!req.body.author) {
		return next(createError(400, "author is required"));
	}

	if (!bookItem) {
		return next(createError(404, "no book with that id"));
	}
	//updating
	bookList = bookList.map((item) => {
		if (item.id == req.params.id) {
			(item.author = req.body.author), (item.title = req.body.title);
		}

		return item;
	});

	res.send({ result: true });
};

exports.delete = function (req, res, next) {
	//verifying
	const bookItem = bookList.find((item) => item.id == req.params.id);

	if (!bookItem) {
		return next(createError(404, "no book with that id"));
	}

	//deleting
	bookList = bookList.filter((item) => item.id != req.params.id);
	res.send({ result: true });
};
