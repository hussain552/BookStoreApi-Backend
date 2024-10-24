import express from 'express';
import Contact from '../model/modelcontact.js';  // Import the Contact model

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }

        // Create a new contact entry
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        // Save the entry to the database
        await newContact.save();

        res.status(201).json({ msg: 'Message sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
