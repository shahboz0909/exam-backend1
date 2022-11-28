import { Router } from "express";
import {deleteCategory, getCategories, postCategories,updateCategory,getSubCategories,getAllSubCategories, postSubCategories,updateSubCategories,deleteSubCategories} from '../controller/category.js'

 const categories = Router();

categories.get('/categories', getCategories)
categories.get('/categories/:id', getCategories)
categories.post('/postCategories', postCategories)
categories.put('/updateCategories/:id', updateCategory)
categories.delete('/deleteCategories/:id', deleteCategory)
categories.get('/getSubCategories', getAllSubCategories)
categories.get('/getSubCategories/:id', getSubCategories)
categories.post('/postSubCategories', postSubCategories)
categories.put('/updateSubCategories/:id', updateSubCategories)
categories.delete('/deleteSubCategories/:id', deleteSubCategories)

export default categories;