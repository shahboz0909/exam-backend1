import { Router } from "express";
import {postProduct, updateProduct, deleteProduct} from '../controller/products.js'



const products = Router();


products.post('/postProduct', postProduct) 
products.put('/updateProduct/:id', updateProduct)
products.delete('/deleteProduct/:id', deleteProduct)




export default products