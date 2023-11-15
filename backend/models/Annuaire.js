const mongoose = require('mongoose');

const annuaireSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: 32,
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    maxlength: 32,
  },
  fonctionGrade: {
    type: String,
    trim: true,
    required: [true, 'Fonction/Grade is required'],
  },
  structureDeRecherche: {
    type: String,
    trim: true,
    required: [true, 'Structure de recherche is required'],
  },
  bureau: {
    etablissement: {
      type: String,
      trim: true,
    },
    departement: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  tel: {
    type: String,
    trim: true,
  },
  fax: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Annuaire', annuaireSchema);
