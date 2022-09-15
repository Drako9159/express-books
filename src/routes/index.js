const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const json_books = fs.readFileSync("src/books.json", "utf-8");
let books = JSON.parse(json_books);

router.get("/", (req, res) => {
  res.render("index.ejs", { books });
});
router.get("/new-entry", (req, res) => {
  res.render("new-entry.ejs");
});
router.post("/new-entry", (req, res) => {
  const { title, author, image, description } = req.body;

  if (!title || !author || !image || !description) {
    res
      .status(400)
      .send("Entries must have a title, author, image and description");
    return;
  }
  let newBook = {
    id: uuidv4(),
    title: title,
    author: author,
    image: image,
    description: description,
  };

  books.push(newBook);
  fs.writeFileSync("src/books.json", JSON.stringify(books), "utf-8");

  /* res.send("received")*/
  res.redirect("/");
});
router.get("/delete/:id", (req, res) => {
  books = books.filter((e) => e.id !== req.params.id);

  fs.writeFileSync("src/books.json", JSON.stringify(books), "utf-8");
  res.redirect("/");
});

module.exports = router;
