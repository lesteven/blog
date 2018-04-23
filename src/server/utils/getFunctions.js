var mongoose = require('mongoose');


exports.getAll =(req, res, model, num) =>{
	model.find({})
        .sort('-createdAt')
        .limit(num)
        .exec(function(err,content){
          if(err){
            //throw err;
            //console.log(err)
            res.json({err:'error'});
          }
      //        console.log(content); 
            checkPage(req,res,model,content);
        })
}


// Pagination functions
exports.getOld = (req, res, model, num) =>{
    if(mongoose.Types.ObjectId.isValid(req.query.old)){
        model.find({_id:{$lt:req.query.old}})
        .sort('-createdAt')
        .limit(num)
        .exec(function(err,content){
            if(err){
                //console.log(err)
                res.json({err:'error'});
            }
            checkPage(req,res,model,content);
        })
    }
    else{
        res.json({});
    }
}

exports.getNew = (req, res, model, num) =>{
    if(mongoose.Types.ObjectId.isValid(req.query.new)){
        model.find({_id:{$gt:req.query.new}})
        .limit(num)
        .exec(function(err,content){
            if(err){
                //console.log(err)
                res.json({err:'error'});
            }
            checkPage(req,res,model,content.reverse());
        })
    }
    else{
        res.json({})
    }
}

async function checkPage(req,res,model,data){
    try {
        var paginate = {};
        //console.log('checkPage new function'); 
        let [newpage,oldpage] = await Promise.all([
                            findNew(paginate, model, data),
                            findOld(paginate, model, data)
                            ])
        //console.log('@@@@@@@@@@@ testing @@@@@@@@@@@2');

        if (newpage[0]) {
            paginate.new = true;
        }
        else {
            paginate.new = false;
        }

        if (oldpage[0]) {
            paginate.old = true;
        }
        else {
            paginate.old = false;
        }

        const fetchedData = {
            data:data,
            page:paginate
        } 
    //    console.log(fetchedData);
        console.log('~~ data will be sent');
        res.json(fetchedData);
    }
    catch(e) {
        res.json({err:'error'});
    }
}

function findNew(paginate, model, data) {
 //   console.log('from new', paginate);
    return model.find({_id:{$gt:data[0]}})
    .limit(1)
    .exec();
}
function findOld(paginate, model, data) {
   // console.log('from old', paginate);
    return model.find({_id:{$lt:data[data.length-1]}})
    .sort('-createdAt')
    .limit(1)
    .exec();
}


