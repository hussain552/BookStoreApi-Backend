import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Book from "./model/book.model.js";
import BookapiRoute from "./route/bookapi.js";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import Contactus from "./route/Contactus.js";
const app = express();

app.use(cors({
  origin: 'https://bookstoreapi-frontend22.onrender.com',
  
  
}));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error: ", error);
}


// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/bookapi",BookapiRoute);
app.use("/ContactUs",Contactus)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

























app.post("/api/books", async (req, res) => {
    try {
      const { name, price, category, image, title } = req.body;
  
      // Create a new book instance
      const newBook = new Book({
        name,
        price,
        category,
        image,
        title,
      });
  
      // Save the book to the database
      await newBook.save();
      res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (error) {
      console.error("Error adding book:", error);
      res.status(500).json({ message: "Error adding book", error: error.message });
    }
  });