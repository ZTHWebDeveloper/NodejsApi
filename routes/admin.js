const express = require('express');
const Map = require('../controllers/adminController');
const GeoPoint = require('geopoint');
const TimSort = require('timsort');
const router = express.Router();

router.post('/',Map.save);

router.get('/search',(req,res)=>{
    Map.search()
        .then(result=>{
            let array=[];
            let k = 0;
            result.forEach(searach=>{
                array[k++] ={
                    'title':searach['title'][0],
                    'city':searach.city,
                    'pointId':searach.point_id
                }
            });
           res.json(array);
        })
        .catch(err=>{
            res.json(err);
        });

});

router.get('/search/:id',(req,res)=>{
    let search_id = req.param("id");
    Map.searchId(search_id)
        .then(result=>{
            res.json(result);
        })
        .catch(err=>{
            res.json(err);
        });


})

router.get('/location/:city/:lat/:long',(req,res,next)=>{
    let lat = req.param("lat");
    let long = req.param("long");
    let city = req.param("city");
    
    Map.findBylocation(city)
        .then(result=>{
            let array=[];
            let i = 0;
            
            result.forEach((data) => {
                let latitute = data['point_id']['lati'];
                let longitute = data['point_id']['longi'];
                let startPoint = new GeoPoint(Number(lat),Number(long));
                let endPoint = new GeoPoint(latitute, longitute);
                let distance = startPoint.distanceTo(endPoint,true);
                
                array[i++]={
                    "distance":distance,
                    "id":data['point_id']['_id']
                };
               
            });
           TimSort.sort(array,(a,b)=>{
              return a.distance-b.distance;
           });
           //res.json(array);
            Map.minimumDistace(array[0].id,array[1].id,array[2].id)
                .then(result=>{
                    let arr=[];
                    let j=0;
                    result.forEach((da)=>{
                        //res.json(da[0]);
                        arr[j++]={
                            '_id':da._id,
                            'title':da['title'][0],
                            'point_id':da['point_id']['_id'],
                            'lati':da['point_id']['lati'],
                            'longi':da['point_id']['longi']
                        }
                    });
                    //5e2ec575c5ae823bbc41d6eb
                    //5e2ec3e76c7d850770048a30
                    //5e2ec38c6c7d850770048a2c
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