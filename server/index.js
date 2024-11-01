const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


//swagger - API DOCS
const swaggerUI = require('swagger-ui-express');
const YAML = require('yaml');
const fs  = require('fs');


const file = fs.readFileSync('swagger/swagger.yml', 'utf-8')
const swaggerDocument = YAML.parse(file)


//import de rutas
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const SingleProductRoutes = require('./routes/singleProduct')
const ordersRoutes = require('./routes/orders')
const cartsRoutes = require('./routes/carts')

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

//Doc Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//rutas
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/product', SingleProductRoutes);
app.use('/orders', ordersRoutes);
app.use('/carts', cartsRoutes);





module.exports = app;
app.listen(port, () => {
  console.log('App listening at http://localhost:${port}');
});
