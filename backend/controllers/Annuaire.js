const Annuaire = require('../models/Annuaire');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const validateMongoDbId = require('../utils/validateMongodbId');
const fs = require('fs');

                                                                           
const addAnnuaire = asyncHandler(async (req, res, next) => {
    try {
      // Check if a new slug is required
      if (req.body.firstname || req.body.lastname) {
        req.body.slug = slugify(`${req.body.firstname} ${req.body.lastname}`);
      }
  
      const newAnnuaire = await Annuaire.create(req.body);
  
      res.status(201).json({
        success: true,
        annuaire: newAnnuaire,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  
// Load all annuaires
const allAnnuaires = asyncHandler(async (req, res, next) => {
    try {
      const annuaires = await Annuaire.find().sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        annuaires,
      });
      next();
    } catch (error) {
      return next(error);
    }
  });
  
// Show a single annuaire
const singleAnnuaire = asyncHandler(async (req, res, next) => {
  try {
    const annuaire = await Annuaire.findById(req.params.id);
    res.status(200).json({
      success: true,
      annuaire,
    });
    next();
  } catch (error) {
    return next(error);
  }
});

// Edit an annuaire
const editAnnuaire = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if a new slug is required
    if (req.body.firstname || req.body.lastname) {
      req.body.slug = slugify(`${req.body.firstname} ${req.body.lastname}`);
    }

    const existingAnnuaire = await Annuaire.findOne({ _id: id });

    const updatedAnnuaire = await Annuaire.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body, id: existingAnnuaire.id } },
      { new: true }
    );

    if (!updatedAnnuaire) {
      return res.status(404).json({ message: 'Annuaire not found' });
    }

    res.json(updatedAnnuaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete an annuaire
const deleteAnnuaire = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedAnnuaire = await Annuaire.findOneAndDelete({ _id: id });
    if (!deletedAnnuaire) {
      return res.status(404).json({ message: 'Annuaire not found' });
    }

    res.json(deletedAnnuaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  addAnnuaire,
  allAnnuaires,
  singleAnnuaire,
  editAnnuaire,
  deleteAnnuaire,
};
