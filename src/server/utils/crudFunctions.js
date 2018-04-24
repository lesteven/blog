var mongoose = require('mongoose');


/*
* Delete function, pass in callback, 
* model, and parameters to delete from db.
* Callback will send response back to client 
*/

exports.delete = (req,res,model,num,cb) =>{
	model.findOneAndRemove(req.body).exec(function(err,removed){
    let copy = {...req}
		if(err){
			//console.log(err);
			res.json({err:'error'})
		}
		cb(copy,res,model,num);
	})
}

/*
* Post function, pass in callback, 
* model, and parameters to post to db.
* Callback will send response back to client 
*/

exports.post = (req,res,model) =>{
	var content = new model(req.body);
	content.save(function(err){
		if(err){
			//console.log(err);
			res.json({err:'error'})
		}
		res.json({msg:'success!'})
	})
}

/*
* Put function, pass in callback, 
* model, and parameters to update  db.
* Callback will send response back to client 
* id will map to correct item on client 
*/

exports.put = (res,model,id,change) =>{
    
    model.findOneAndUpdate(id,change).exec(function(err,update){
        if(err){
            //console.log(err);
			res.json({
                err:'error',
                id: id._id
            })
		}
		res.json({
            msg:'success!',
            id: id._id
        })
    })
}


