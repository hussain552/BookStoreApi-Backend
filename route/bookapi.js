import express from 'express';
import axios from 'axios';

const router = express.Router();

// Define route to fetch book data from external API
router.get('/', async (req, res) => {
  try {
    // Fetch data from external API
    const response = await axios.get('https://api.itbook.store/1.0/search/mongodb');
    const data = response.data;
    
    // Extract books from the response
    const books = data.books;

    // Send the fetched book data as the API response
    res.json(books); // Send books array directly
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
