const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const multer = require('multer');
const fs = require('fs'); 


const createProduct = asyncHandler(async (req, res) => {
  try {
    // Create a function to handle the file upload using multer
    const uploadImage = (req, res, next) => {
      const storage = multer.diskStorage({
        destination: './upload', // Specify the upload directory
        filename: (req, file, cb) => {
          const date = Date.now();
          const fileExtension = file.originalname.split('.').pop();
          const fileName = date + '.' + fileExtension;
          cb(null, fileName);
        }
      });

      const upload = multer({ storage }).single('image'); // 'image' should match the field name in your form

      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ success: false, error: 'Image upload failed' });
        }
        next();
      });
    };

    // Use the uploadImage middleware to handle file upload
    uploadImage(req, res, async () => {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      // Create the product with the image filename
      const newProduct = await Product.create({
        ...req.body,
        image: req.file.filename // Assuming 'image' is the field for the image file
      });

      res.json(newProduct);
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/*

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const uploadImage = (req, res, next) => {
      const storage = multer.diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const date = Date.now();
          const fileExtension = file.originalname.split('.').pop();
          const fileName = date + '.' + fileExtension;
          cb(null, fileName);
        }
      });

      const upload = multer({ storage }).single('image');

      upload(req, res, (err) => {
        if (err) {
          console.error('Image upload failed:', err);
          return res.status(400).json({ success: false, error: 'Image upload failed' });
        }
        console.log('File uploaded successfully:', req.file); // Log the uploaded file
        next();
      });
    };

    // Use the uploadImage middleware to handle file upload
    uploadImage(req, res, async () => {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      try {
        const id = req.params.id;
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: id },
          { $set: { ...req.body, image: req.file ? req.file.filename : undefined } }, // Check if req.file is defined before setting image
          { new: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});*/

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const uploadImage = (req, res, next) => {
      const storage = multer.diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const date = Date.now();
          const fileExtension = file.originalname.split('.').pop();
          const fileName = date + '.' + fileExtension;
          cb(null, fileName);
        }
      });

      const upload = multer({ storage }).single('image');

      upload(req, res, (err) => {
        if (err) {
          console.error('Image upload failed:', err);
          return res.status(400).json({ success: false, error: 'Image upload failed' });
        }
        console.log('File uploaded successfully:', req.file); // Log the uploaded file
        next();
      });
    };

    // Use the uploadImage middleware to handle file upload
    uploadImage(req, res, async () => {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      try {
        const id = req.params.id;

        // Check if a new image is uploaded
        const newImage = req.file ? req.file.filename : undefined;

        // Get the existing product to check its current image
        const existingProduct = await Product.findOne({ _id: id });
        const existingImage = existingProduct ? existingProduct.image : undefined;

        const updatedProduct = await Product.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...req.body,
              image: newImage || existingImage, // Use the new image if available, otherwise keep the existing image
            },
          },
          { new: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



/*const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id; // Get the product ID from the request params
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: id });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});*/


const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id; // Get the product ID from the request params
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: id });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the associated image file from the 'upload' folder
    if (deletedProduct.image) {
      const imagePath = `./upload/${deletedProduct.image}`;
      fs.unlinkSync(imagePath); // This will delete the file synchronously
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});





module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  
};
