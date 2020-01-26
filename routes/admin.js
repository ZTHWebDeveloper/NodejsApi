const express = require('express');
const Map = require('../controllers/adminController');
const GeoPoint = require('geopoint');
const TimSort = require('timsort');
const router = express.Router();

router.post('/',Map.save);


router.get('/location/:lat/:long',(req,res,next)=>{
    let lat = req.param("lat");
    let long = req.param("long");
    
    Map.findBylocation()
        .then(result=>{
            let array=[];
            let i = 0;
            
            result.forEach((data) => {
                let latitute = data.lati;
                let longitute = data.longi;
                let startPoint = new GeoPoint(Number(lat),Number(long));
                let endPoint = new GeoPoint(latitute, longitute);
                let distance = startPoint.distanceTo(endPoint,true);
                
                array[i++]={
                    "distance":distance,
                    "id":data['_id']
                };
            });
           
           TimSort.sort(array,(a,b)=>{
              return a.distance-b.distance;
           });
           
            Map.minimumDistace(array[0].id,array[1].id,array[2].id)
                .then(result=>{
                    let arr=[];
                    let j=0;
                    result.forEach((da)=>{
                        arr[j++]={
                            '_id':da._id,
                            'title':da.title,
                            'point_id':da['point_id']['_id'],
                            'lati':da['point_id']['lati'],
                            'longi':da['point_id']['longi']
                        }
                    });
                  res.json(arr);
                })
                .catch(err=>{
                    res.json(err);
                });
                
        })
        .catch(err=>{
            res.json({con:false,msg:err});
        });

});
module.exports = router;