const ModelProducts = require("../models/products");
const {response} = require("../helper/common");
const { v4: uuidv4, stringify } = require("uuid");
const cloudinary = require("../config/cloudinary");

const ProductsController = {
    getProducts:(req,res,next) => {
        // const page = req.query.page || 1;
        // const limit = req.query.limit || 10;
        ModelProducts.selectProducts()
        .then((result)=> response(res, 200, true, result.rows, "get data success"))
        .catch((err)=> response(res, 404, false, err, "get data fail"))
    },

    getProductDetail:(req,res,next) => {
        console.log(req.params.id)
        ModelProducts.selectProduct(req.params.id)
        .then((result)=>{
           response(res, 200, true, result.rows, "get data success")
        })
        .catch((err)=> response(res, 404, false, err, "get data fail"))
    },

    delete:(req,res,next) => {
        ModelProducts.deleteProduct(req.params.id)
        .then((result)=> response(res, 200, true, result.rows, "delete data success"))
        .catch((err)=> response(res, 404, false, err, "delete data fail"))
    }, 

    insert : async (req,res,next) => {
        const id =  uuidv4();
        req.body.price = parseInt(req.body.price);
        const data = {
            id,
            name: req.body.name,
            price : req.body.price,
            description: req.body.description 
        }
        // console.log(req.file, "req file after data");
        // console.log(data)
        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path, {
              folder: 'task_hiring',
            });
            data.photo = image.url;
            } else {
            data.photo = products.photo;
        }
        // console.log(data, "kedua")
        ModelProducts.insertProduct(data)
        .then(result => response(res,200,true,result.rows,'Insert data succes'))
        .catch(err => response(res,404,false,err,'insert data fail'))
    },

    update : async (req,res,next) => {
        try{
            req.body.price = parseInt(req.body.price);
            if (req.file) {
                const image = await cloudinary.uploader.upload(req.file.path, {
                  folder: 'task_hiring',
                });
                req.body.photo = image.url;
                } else {
                req.body.photo = products.photo;
            }
            console.log(req.body, "1")
            console.log(req.params.id)
            const result = await ModelProducts.updateProduct(req.params.id,req.body)
            console.log(req.body, "2")
            response(res,200,true,result.rows,'update product success')
        } catch (err) {
          response(res,404,err.message,'update product fail ')
        }
    },
      
}


exports.ProductsController = ProductsController;