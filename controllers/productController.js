const Product = require('../models/productSchema');//product Model
exports.addProduct =(req,res,next) =>{
    console.log(req.body);
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    });
    product.save()
    .then(result =>{
        res.json({message:"Product add successfully"});
    })
    .catch(err=>{
       res.status(404).json({err:"Product Cannot Add"});
    })
    
};

exports.index = (req,res,next) =>{
    Product.find()
    .then(result =>{
        res.status(200).json({prods:result,message:'Get all products'});
    })
    .catch(err =>{
        res.status(404).json({message:"Cannot get products"});
    })
}