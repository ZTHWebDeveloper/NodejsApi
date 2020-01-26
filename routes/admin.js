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
           //5e2d245201b04710bc6ab17c
           //5e2d24bb01b04710bc6ab180
           //5e2d247801b04710bc6ab17e
           //res.json(array);
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
                .catch();
                
        })
        .catch(err=>{
            res.json({con:false,msg:err});
        });

});

router.get('/geo/:lat/:long',(req,res)=>{
    let lat = req.param("lat");
    let long = req.param("long");
    const startPoint = new GeoPoint(Number(lat),Number(long));
                const endPoint = new GeoPoint(1.2344, 1.345567);
                const distance = startPoint.distanceTo(endPoint,true);
                res.json(distance);
});
module.exports = router;