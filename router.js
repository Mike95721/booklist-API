const express = require("express");
const router = express.Router();
const books = require("./todosController");

router.put("/books/:id", books.update);
router.delete("/books/:id", books.delete);

router.get("/books", books.index);
router.post("/books/create", books.create);
router.get("/books/:id", books.show);

module.exports = router;