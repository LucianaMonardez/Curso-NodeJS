const  boom = require("@hapi/boom");



function validatorHandle(schema, property){
  return (req, res, next) => {
    //midlewrae de forma dinamica
    const data = req[property] ;
    //abortearly muestra todos los errores
    const { error } = schema.validate(data, { abortEarly: false}) ;
    if(error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandle;
