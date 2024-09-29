import productModel from '../models/productSchema.js';

export const getProducts = async (_, res) => {
  try {
    const data = await productModel.find({});
    console.log(data);
    const filteredData = data
      .filter((product) => product._doc.isActive === true)
      .map((product) => ({
        id: product._doc._id,
        _id: undefined,
        image: product._doc.image,
        name: product._doc.name,
        cost: product._doc.cost,
        ingredients: product._doc.ingredients,
        isAvailable: product._doc.isAvailable,
      }));

    res.json({ data: filteredData, message: 'Products found' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'An error occurred while connecting to the database',
    });
  }
};

export const postProduct = async (req, res) => {
  const { body } = req;

  const newProduct = productModel({
    image: body.image,
    name: body.name,
    cost: body.cost,
    ingredients: body.ingredients,
    isAvailable: body.isAvailable,
    isActive: true,
  });
  try {
    await newProduct.save();

    res.status(201).json({
      data: null,
      message: 'Successfully created product.',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'Product name is already in use.',
      });
      return;
    }
    res.status(500).json({
      data: null,
      message: 'An error occurred saving the product.',
    });
  }
};

export const putProduct = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const action = await productModel.updateOne({ _id: id }, body);

    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No product found with that id',
      });
      return;
    }

    res.json({
      data: null,
      message: 'The product has been successfully updated',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'Product name is already in use',
      });
      return;
    }

    res.status(500).json({
      data: null,
      message: 'An error occurred updating the product',
    });
  }
};

export const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const action = await productModel.updateOne(
      { _id: id, isActive: true },
      { isActive: false },
    );

    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No product found with that id',
      });
      return;
    }

    res.json({
      data: null,
      message: 'The product has been successfully removed',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'An error occurred deleting the product',
    });
  }
};
