import express from "express";
import cors from 'express'
import categories from './src/router/category.router.js'
import products from "./src/router/products.router.js";


const PORT = process.env.PORT || 5000;

let app = express()
app.use(express.json())
app.use(categories)
app.use(products)




app.listen(PORT, console.log(5000))

