// backend route
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Posts = require('../models/publicaciones');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Generate a unique filename
    const extension = path.extname(file.originalname); // Get the file extension
    cb(null, uniqueSuffix + extension); // Set the filename as uniqueSuffix.extension
  },
});

const fileFilter = (req, file, cb) => {
  // Validate the file type
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed.'));
  }
};

const upload = multer({ storage, fileFilter });

// Create a post
router.post(
  '/publicar',
  [
    upload.single('picture'), // Handle the picture file upload
    body('caption').notEmpty().withMessage('Caption is required.'), // Validate the caption field
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { caption } = req.body;
      const picture = req.file.path; // Get the uploaded file path

      const post = new Posts({ caption, picture });
      await post.save();

      res.status(200).json({ message: 'Post created successfully', post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;