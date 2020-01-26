const Map = require('../models/map');

const save = (req,res)=>{
    
    let map = new Map({
        title:req.body.title,
        lat:req.body.lat,
        long:req.body.long
    });
   
    map.save()
        .then(result =>{
            res.json({msg:result});
        })
        .catch(err =>{
            res.json({msg:err});
        });
}

const findBylocation = ()=>{
   return new Promise((resolve,reject)=>{
        Map.find({},(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
   });
}

const minimumDistace = (point1,point2,point3)=>{
   return new Promise((resolve,reject)=>{
    Map.find({'_id':[point1,point2,point3]},(err , data)=>{
        if(err) reject(err);
        resolve(data);
    })
   });
}

module.exports ={
    save,
    findBylocation,
    minimumDistace,
}