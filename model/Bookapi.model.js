import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  isbn13: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{13}$/
  },
  price: {
    type: String,
    required: true,
    match: /^\$[0-9]+\.[0-9]{2}$/
  },
  image: {
    type: String,
    required: true,
    match: /^(http|https):\/\/[^ "]+$/
  },
  url: {
    type: String,
    required: true,
    match: /^(http|https):\/\/[^ "]+$/
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
