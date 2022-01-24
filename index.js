const express = require('express');

const app = express();

const { logErrors, handleError, boomErrorHandler} = require('./middlewares/errorHanlder')

const routerApi = require('./routes');
app.use(express.json());

app.use(                //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);

routerApi(app);


const port =3000;

app.use(logErrors);
app.use(boomErrorHandler);
app.use(handleError);



app.get('/', (req, res) => {
    res.send('Holiii soy un sv de express ')
});

app.get('/nuevo-endpoint', (req, res) => {
  res.send('Holiii soy una nueva ruta  ')
});




app.listen(port, () => {
  console.log('Esta en el puerto' + port)
})
