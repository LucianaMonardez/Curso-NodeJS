const faker = require('faker');
const boom = require('@hapi/boom')

class ProducService {

  constructor(){
    this.products = [];
    this.generate();
  }

   generate(){
    const limit =  100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })

    }
  }
  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    console.log(newProduct);
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout (() => {
        resolve(this.products);
      }, 5000);
        })
  }

  async findOnde(id){
    //const name = this.getTotal();
    const product = this.products.find(item => item.id == id);
    if(!product){
      throw boom.notFound('Producto no encontrado')
    }
    if(product.isBlock){
      //error 409
      throw boom.conflict('Producto esta bloqueado')
    }
    return product;
  }

  async update(id, changes){
    const index = this.products.findIndex( item => item.id == id);
    if(index === -1){
      throw boom.notFound('Producto no encontrado');
    }
    //esto evita que se cree un nuevo id
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id == id);
    if(index === -1){
      throw boom.notFound('Producto no encontrado');
    }
    this.products.splice(index, 1);
    return{ id };
  }

}
module.exports = ProducService;
