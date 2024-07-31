const Book = require("./../models/book.model")
exports.findAll = (req, res) => {
  Book.find()
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of books.",
      });
    });
};

exports.create = async(req, res) => {
  try {
    const book_name = req.body.book_name
    //console.log(book_name);
    existing_book = await Book.find({book_name:book_name})
    if (existing_book){
      return res.status(400).send({message: "Book already exists."})
    }
    res.json({"msg": "Book added"})
    
  } catch (error) {
    console.log(error);
    res.json({error: error})
  }
  // // Validate request
  // if (!req.body) {
  //   return res.status(400).send({
  //     message: "Please fill all required field",
  //   });
  // }

  // const book = new Book({
  //   book_name: req.body.book_name,
  //   author_name: req.body.author_name,
  //   author_email: req.body.author_email,
  //   phone: req.body.phone,
  // });
  // book
  //   .save()
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Something went wrong while creating new book.",
  //     });
  //   });
};


exports.findOne = (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "book not found with id " + req.params.id,
        });
      }
      res.send(book);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "book not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error getting book with id " + req.params.id,
      });
    });
};

// to update book
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  Book.findByIdAndUpdate(
    req.params.id,
    {
      book_name: req.body.book_name,
      author_name: req.body.author_name,
      author_email: req.body.author_email,
      phone: req.body.phone,
    },
    { new: true }
  )
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "book not found with id " + req.params.id,
        });
      }
      res.send(book);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "book not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating book with id " + req.params.id,
      });
    });
};
// Delete a book with the specified id in the request
exports.delete = (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "book not found with id " + req.params.id,
        });
      }
      res.send({ message: "book deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "book not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete book with id " + req.params.id,
      });
    });
};
