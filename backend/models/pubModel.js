const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  idAnnuaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Annuaire',
    required: [true, 'idAnnuaire is required'],
  },
  titre: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
    maxlength: 255,
  },
  publicdate: {
    type: Date,
    required: [true, 'Publication date is required'],
  },
  abstract: {
    type: String,
    trim: true,
    required: [true, 'Abstract is required'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Publication', publicationSchema);
