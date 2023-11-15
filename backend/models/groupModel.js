const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: [true, 'Nom is required'],
    maxlength: 255,
  },
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Annuaire',
    required: [true, 'Responsable is required'],
  },
  description: {
    type: String,
    trim: true,
  },
  membres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Annuaire',
    },
  ],
  projects: [
    {
      // Define the structure of a project within the group
      // You can expand this based on your project requirements
      name: {
        type: String,
        trim: true,
        required: [true, 'Project name is required'],
        maxlength: 255,
      },
      // Add more fields for a project as needed
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
