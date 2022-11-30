import { read, write } from "../utils/FS.js"


export const getCategories = (req, res, next) => {
  try {
    let categories = read('categories.json');
    let subCategories = read('subCategories.json');
    let arry1 = [];
    let { id } = req.params;

    for (let i = 0; i < categories.length; i++) {
      let abj = {};
      let arry = [];
      abj.category_id = categories[i].category_id;
      abj.category_name = categories[i].category_name;
      if (subCategories) {
        for (let j = 0; j < subCategories.length; j++) {
          if (categories[i].category_id == subCategories[j].category_id) {
            let abj = {};
            abj.subCategoryId = subCategories[j].sub_category_id;
            abj.subCategoryName = subCategories[j].sub_category_name;
            arry.push(abj);
          }
        }
      }

      if (arry.length != 0) {
        abj.subCategoris = arry;
      }
      arry1.push(abj);
    }

    if (id) {
      return res.send({
        status: 200,
        message: "ok",
        data: arry1.find(data => data.category_id == id)
      })
    }

    return res.send({
      status: 200,
      message: "ok",
      data: arry1
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "intenal error"
    })
  }
}




export const postCategories = (req, res, next) => {
  try {

    let { category_name } = req.body;
    let categories = read('categories.json');

    let category_names = categories.find(data => data.category_name == category_name)
    if (category_names) {
      return res.send({
        status: 400,
        message: "bu nomdagi categoriya mavjud"
      })
    } else {
      let newCategory = {
        category_id: categories.at(-1)?.category_id + 1 || 1,
        category_name
      }
      categories.push(newCategory);
      write('categories.json', categories);
      return res.send({
        status: 200,
        message: "added",
        data: newCategory
      })
    }

  } catch (error) {
    res.sendStatus(500)
  }
}



export const updateCategory = (req, res, next) => {
  let { id } = req.params;

  const allCategories = read('categories.json');
  const { category_name } = req.body

  const foudnCategories = allCategories.find(e => e.category_id == id)

  foudnCategories.category_name = category_name || foudnCategories.category_name

  write('categories.json', allCategories)

  res.end(JSON.stringify({
    message: "Category has been updated"
  }))
}

export const deleteCategory = (req, res, next) => {
  let { id } = req.params;

  const allCategories = read('categories.json');
  const { category_name } = req.body

  const foudnCategories = allCategories.findIndex(e => e.category_id == id)
  allCategories.splice(foudnCategories, 1)
  write('categories.json', allCategories)

  res.end(JSON.stringify({
    message: "Category has been delete"
  }))
}



export const getAllSubCategories = (req, res, next) => {
  let subCategories = read('subCategories.json');
  if (subCategories) {
    res.end(JSON.stringify(subCategories))
  } else {
    res.end(JSON.stringify('subcategoriya topilmadi'))
  }
}




export const getSubCategories = (req, res, next) => {
  try {
    let categories = read('categories.json');
    let subCategories = read('subCategories.json');
    let products = read('products.json');

    subCategories.forEach(element => {
      element.products = products.filter(data => data.sub_category_id == element.sub_category_id);
      element.products.forEach(data => delete data.sub_category_id)
    });

    let { id } = req.params;
    if (id) {
      return res.send({
        status: 200,
        message: "ok",
        data: subCategories.find(data => data.sub_category_id == id)
      })
    }

    return res.send({
      status: 200,
      message: "ok",
      data: subCategories
    })
  } catch (error) {
    next(res.sendStatus(500))
  }
}




export const postSubCategories = (req, res, next) => {
  try {

    let { sub_category_name, category_id } = req.body;
    let categories = read('categories.json');
    let subCategories = read('subCategories.json');

    let sub_category_names = subCategories.find(data => data.sub_category_name == sub_category_name)
    if (sub_category_names) {
      return res.send({
        status: 400,
        message: "bunday nomdagi subcategoriya mavjud"
      })
    } else {
      let newSubCategory = {
        sub_category_id: subCategories.at(-1)?.sub_category_id + 1 || 1,
        category_id,
        sub_category_name
      }

      subCategories.push(newSubCategory);
      write('subCategories.json', subCategories);
      return res.send({
        status: 200,
        message: "added",
        data: newSubCategory
      })
    }

  } catch (error) {
    next(res.sendStatus(500))
  }
}




export const updateSubCategories = (req, res, next) => {
  const { id } = req.params
  try {

    let subCategories = read('subCategories.json');
    let { sub_category_name, category_id } = req.body;

    let subCategory = subCategories.find(data => data.sub_category_id == id)
    if (subCategory) {
      subCategory.sub_category_name = sub_category_name;
      subCategory.category_id = category_id
      write('subCategories.json', subCategories);
      return res.send({
        status: 200,
        message: "updated",
        data: subCategory
      })
    } else {
      return res.send({
        status: 400,
        message: "bunday subCategory yoq"
      })
    }

  } catch (error) {
    next(res.sendStatus(500))
  }
}




export const deleteSubCategories = (req, res, next) => {
  let { id } = req.params;

  const allSubCategories = read('subCategories.json');

  const foudnSubCategories = allSubCategories.findIndex(e => e.sub_category_id == id)
  allSubCategories.splice(foudnSubCategories, 1)
  write('subCategories.json', allSubCategories)

  res.end(JSON.stringify({
    message: "subCategory has been delete"
  }))
}