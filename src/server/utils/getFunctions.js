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

// get old data
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

// get new data
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


// check to see if there are new or old content
async function checkPage(req,res,model,data){
    try {
        var paginate = {};
        const num = 1;
        //console.log('checkPage new function'); 
        let [newpage,oldpage] = await Promise.all([
                            findNew(model, data[0], num),
                            findOld(model, data[data.length-1], num)
                            ])
        //console.log('@@@@@@@@@@@ testing @@@@@@@@@@@2');
        let paginate = createPageObject(newpage, oldpage);

        const fetchedData = {
            data:data,
            page:paginate
        } 
    //    console.log(fetchedData);
        console.log('~~ data will be sent');
        res.json(fetchedData);
    }
    catch(e) {
        console.log(e);
        res.json({err:'error'});
    }
}


function findNew(model, dataID, num) {
 //   console.log('from new', paginate);
    return model.find({_id:{$gt:dataID}})
    .limit(num)
    .exec();
}
function findOld(model, dataID, num) {
   // console.log('from old', paginate);
    return model.find({_id:{$lt:dataID}})
    .sort('-createdAt')
    .limit(num)
    .exec();
}

// when deleting data

export async function renewContent(req, res, model, num) {
  console.log('renew content function');
  try {
    const num = 3;
    let [newpage,oldpage] = await Promise.all([
                        findNew(model, req.body, num),
                        findOld(model, req.body, num)
                        ])
//    let paginate = createPageObject(newpage, oldpage);
    let newData = createDataObject(newpage, oldpage, num);
    checkPage(req,res,model,newData);

  }
  catch(e) {
    console.log(e);
    res.json({err:'error'});
  }
}
// to check if pagination is valid
function createPageObject(newpage, oldpage) {
  let paginate = {};
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
  return paginate;
}
// create data object once object is deleted
function createDataObject(newpage, oldpage, num) {
  let newData = null;
  // console.log('do', newpage[0]);
  //  console.log('do', oldpage[0]);
  
  if (newpage[0] && oldpage[0]) {
    newData = [newpage[0], ...oldpage].slice(0,num);    
  }
  if (!newpage[0] && oldpage[0]) {
    newData = oldpage;
  }
  if (newpage[0] && !oldpage[0]) {
    newData = newpage.reverse();    
  }
  if (!newpage[0] && !oldpage[0]) {
    newData = [];
  }
  
  return newData;
}



