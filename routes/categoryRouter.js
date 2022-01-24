
const express = require('express');
const validatorHandle = require('./../middlewares/validatorHandle');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/categorySchema');
const CategoryService = require('./../services/categoryService');


const service = new CategoryService();


const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories)
});

router.get('/:id', validatorHandle(getCategorySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category)

  } catch (error) {
    next(error)

  }
})

router.post('/', validatorHandle(createCategorySchema, 'body'), async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  console.log(newCategory)
  res.status(201).json(newCategory);
})

router.patch('/:id', validatorHandle(getCategorySchema, 'params'),
validatorHandle(updateCategorySchema, 'body'),
async(req, res, next ) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);

  } catch (error) {
    next(error);

  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.json(response);
})




module.exports = router;
