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

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000', // Local development URL
  'https://bookstoreapi-frontend22.onrender.com', // Production URL
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the incoming origin is in the allowed origins list
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true); // Allow the origin
    },
  })
);

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/bookapi", BookapiRoute);
app.use("/ContactUs", Contactus);

// Define your POST route for adding books
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
