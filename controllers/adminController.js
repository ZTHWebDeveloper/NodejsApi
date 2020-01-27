const Map = require('../models/map');
const Title = require('../models/title');
const save = (req,res)=>{
    let map = new Map({
        lati:req.body.lati,
        longi:req.body.longi
    });
   
    map.save()
        .then(result =>{
            let city = req.body.city;
            let point_id = result._id;
            let arryTitle = req.body.titlelist;
            //res.json(arryTitle);
            arryTitle.forEach(titleField=> {
                let title = new Title({
                 title:titleField,
                 city:city,
                 point_id:point_id

                });
                title.save()
                .then(result=>{
                    res.json(result);
                })
                .catch(err=>{
                    res.json(err);
                });
            });
            
        })
        .catch(err =>{
            res.json({msg:err});
        });
}

const findBylocation = (city)=>{
   return new Promise((resolve,reject)=>{
        Title.find({'city':city})
            .populate('point_id')
            .exec((err , data)=>{
                if(err) reject(err);
                resolve(data);
            })
   });
}

const minimumDistace = (point1,point2,point3)=>{
   return new Promise((resolve,reject)=>{
    Title.find({'point_id':[point1,point2,point3]})
        .populate('point_id')
        .exec((err , data)=>{
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