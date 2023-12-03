import ProductModel from '../models/productSchema.js';

export const getProducts = async (_, res) => {
  try {
    const data = await ProductModel.find({});

    const filteredData = data
      .filter((product) => product._doc.isActive === true)
      .map((product) => ({
        ...product._doc,
        isActive: undefined,
      }));

    res.json({ data: filteredData, message: 'Productos encontrados' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error al conectarse con la base de datos',
    });
  }
};

export const postProduct = async (req, res) => {
  const { body } = req;

  const newProduct = ProductModel({
    image: body.image,
    name: body.name,
    cost: body.cost,
    ingredients: body.ingredients,
    isAvailable: true,
    isOrdered: false,
    isActive: true,
  });
  try {
    await newProduct.save();
    res.status(201).json({
      data: null,
      message: 'Producto creado exitosamente.',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'El nombre de pruducto ya está en uso.',
      });
      return;
    }
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error guardando el Producto.',
    });
  }
};

export const putProduct = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const action = await ProductModel.updateOne({ _id: id }, body);

    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontró un producto con ese id',
      });
      return;
    }

    res.json({
      data: null,
      message: 'El prducto ha sido actualizado exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'El nombre del producto ya está en uso',
      });
      return;
    }

    res.status(500).json({
      data: null,
      message: 'Ocurrió un error actualizando el pruducto',
    });
  }
};

export const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const action = await ProductModel.updateOne(
      { _id: id, isActive: true },
      { isActive: false },
    );

    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontró un producto con ese id',
      });
      return;
    }

    res.json({
      data: null,
      message: 'El producto ha sido eliminado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error eliminando el producto',
    });
  }
};
