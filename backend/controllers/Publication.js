const Publication = require('../models/pubModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

// Add a new publication
const addPublication = asyncHandler(async (req, res, next) => {
  try {
    // Check if a new slug is required
    if (req.body.titre) {
      req.body.slug = slugify(req.body.titre);
    }

    const newPublication = await Publication.create(req.body);

    res.status(201).json({
      success: true,
      publication: newPublication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all publications
const allPublications = asyncHandler(async (req, res, next) => {
  try {
    const publications = await Publication.find().populate('idAnnuaire');

    res.status(200).json({
      success: true,
      publications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single publication by ID
const singlePublication = asyncHandler(async (req, res, next) => {
  try {
    const publication =await Publication.findById(req.params.id).populate('idAnnuaire');

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.status(200).json({
      success: true,
      publication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Edit a publication
const editPublication = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if a new slug is required
    if (req.body.titre) {
      req.body.slug = slugify(req.body.titre);
    }

    const existingPublication = await Publication.findOne({ _id: id });

    const updatedPublication = await Publication.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body, id: existingPublication.id } },
      { new: true }
    );

    if (!updatedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.json(updatedPublication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a publication
const deletePublication = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedPublication = await Publication.findOneAndDelete({ _id: id });

    if (!deletedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.json(deletedPublication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  addPublication,
  allPublications,
  singlePublication,
  editPublication,
  deletePublication,
};
