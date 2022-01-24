
const express = require('express');
const ProducService = require('./../services/productServices');

const validatorHandle = require('./../middlewares/validatorHandle');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/productSchema');


const router = express.Router();
const service = new ProducService();

//con faker creamos datos aleatorios
router.get('/', async (req, res) => {
  const products =  await service.find();
  res.json(products);
});

//todo lo que es especifico debe ir antes de lo dinamico
router.get('/filter', (req, res)=>{
  res.send('Hola')
}
)


router.get('/:id', validatorHandle(getProductSchema, 'params'),
 async  (req, res, next) => {
  //desestructuracion de ecamascript
  /* const { id } = req.params;
  if (id == '999') {
    res.status(404).json({
      message: 'not found'
    })

  } else{
  res.status(200).json({
    id,
    name: 'Pikachu',
    price: 100
  })
} */
try {
  const { id } = req.params;
  const product =  await service.findOnde(id);
  res.json(product);

} catch (error) {
  next(error);
}


})

//creamos el post

router.post('/', validatorHandle(createProductSchema, 'body'), async (req, res) =>{
  const body = req.body;
  const newProduct = await service.create(body);
  console.log(newProduct);
  res.status(201).json(newProduct);
})

router.patch('/:id', validatorHandle(getProductSchema, 'params'),
 validatorHandle(updateProductSchema, 'body'),
 async (req, res, next) =>{
  try{
  const { id } =req.params;
  const body = req.body;
  const product = await service.update(id, body);
/*   res.json({
    message: 'updated',
    data: body,
    id,
  }) */
  res.json(product);}
  catch(error) {
    next(error);

  }

}
)

router.delete('/:id', async (req, res) =>{
  const { id } =req.params;
  const response = await service.delete(id);
  /* res.json({
    message: 'deleted',
    id,
  })
 */
res.json(response);
}
)
module.exports = router;


