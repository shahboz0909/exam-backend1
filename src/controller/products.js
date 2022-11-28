import { read, write } from "../utils/FS.js"



export const postProduct = (req, res, next) => {
  try {
    let products = read('products.json');
    let subCategories = read('subCategories.json');

    let { sub_category_id, product_name, model, color, price } = req.body;

    let subCategory = subCategories.find(data => data.sub_category_id == sub_category_id)
    if (!subCategory) {
      return res.send({
        status: 400,
        message: "bu mahsulotga subCategory mavjud emas"
      })
    } else {
      let newProduct = {
        product_id: products.at(-1)?.product_id + 1 || 1,
        sub_category_id, product_name, model, color, price
      }
      products.push(newProduct);
      write('products.json', products);
      return res.send({
        status: 200,
        message: "added",
        data: newProduct
      })
    }

  } catch (error) {
    next(res.sendStatus(500))
  }
}


export const updateProduct = (req, res, next) => {

  try {
    let { id } = req.params

    let

      { product_id,
        product_name,
        model,
        color,
        price } = req.body;


    let products = read('products.json');

    let product = products.find(data => data.product_id == id)
    if (!product) {
      return res.send({
        status: 400,
        message: "bunaqa product yoq"
      })
    } else {
      product_name ? product.product_name = product_name : false;
      model ? product.model = model : false;
      color ? product.color = color : false;
      price ? product.price = price : false;

      write('products.json', products);
      return res.send({
        status: 200,
        message: "updated",
        data: product
      })

    }
  } catch (error) {
    next(res.sendStatus(500))
  }
}


export const deleteProduct = (req, res, next) => {
  let { id } = req.params;

  const allProduct = read('products.json');

  const foundProduct = allProduct.filter(e => e.product_id != id)
  if (foundProduct) {
    write('products.json', foundProduct)
  }

  res.end(JSON.stringify({
    message: "this product has been deleted"
  }))
}
