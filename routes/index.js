var express = require('express');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:27017'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',user:1 });
});

router.get('/logout',function(req,res,next){
  res.render('logout');
});

router.post('/createDB',function(req,res,next){
   res.render('createDB',{dbName:'runoob',collection:'site'});
   MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
     if(err) throw err;
     console.log("数据库已连接!");
     var dbase=db.db(req.body.nameDB);
     dbase.createCollection(req.body.collName,function(err,re){
       if(err) throw err;
       console.log("创建集合!");
       db.close();
       

     })

   })
})

router.post('/insert',function(req,res,next){
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(req.body.dbName);
    var myobj = { name:req.body.name, url: req.body.url };
    dbo.collection(req.body.collName).insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});
})

router.post('/find',function(req,res,next){
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("abc");
    dbo.collection("aaa"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
})

router.post('/ifFind',function(req,res,next){
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("abc");
     var whereStr = {"name":req.body.rule};  // 查询条件
    dbo.collection("aaa").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
})


router



module.exports = router;
