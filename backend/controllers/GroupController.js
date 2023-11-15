const Group = require('../models/groupModel');
const Annuaire = require('../models/Annuaire');
const asyncHandler = require('express-async-handler');

// Create a new group
const createGroup = asyncHandler(async (req, res) => {
  try {
    const newGroup = await Group.create(req.body);
    res.status(201).json({
      success: true,
      group: newGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all groups
const getAllGroups = asyncHandler(async (req, res) => {
  try {
    const groups = await Group.find().populate('responsable');
    res.status(200).json({
      success: true,
      groups,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single group by ID
const getGroupById = asyncHandler(async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('responsable membres');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json({
      success: true,
      group,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a group by ID
const editGroup = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const existingGroup = await Group.findOne({ _id: id });

    const updatedGroup = await Group.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body, id: existingGroup.id } },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a group by ID
const deleteGroup = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const deletedGroup = await Group.findOneAndDelete({ _id: id });

    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json(deletedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  editGroup,
  deleteGroup,
};
