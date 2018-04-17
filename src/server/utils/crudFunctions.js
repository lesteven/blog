var mongoose = require('mongoose');


exports.delete = (req,res,model,cb) =>{
	model.findOneAndRemove(req.body).exec(function(err,removed){
		if(err){
			//console.log(err);
		}
		cb(req,res,model);
	})
}

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

exports.put = (res,model,id,change) =>{
    //console.log('put function');
    //console.log(id,change);
    
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
