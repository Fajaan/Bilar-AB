var mongoose = require('mongoose');
var model = require('./models/loader');


var log = console.log;
var theResult = {}
var someValues = [];

module.exports = {
	find: function (req,res) {

		modelName = req.params.model;
		if(model[modelName] == undefined){
			return res.json("Kontrollera modellen/schemat :  "  + modelName);
		}
		model[modelName]['find'](function (err, item) {
			theResult = item || {};
			if(err){
				res.send("Hittade inget i DB");
			}else{
				if(item.length < 1) return res.json(theResult);
				else return res.json(item);
			}
		});

	},

	findById: function (req,res) {

		modelName = req.params.model;
	    modellID = req.params.id;
	    if(model[modelName] == undefined){
			return res.json("Kontrollera modellen/schemat :  "  + modelName);
		}
		model[modelName]['findById']([modellID],function (err, item) {
			if(err){
				res.json('Check ID');
			}else{
				if(item == null) return res.json({});
				return res.json(item);
			}
		});

	},

	findByIndex: function (req,res) {

		modelName = req.params.model;
	    index = req.params.index;
	    
	    if(model[modelName] == undefined){
			return res.json("Kontrollera modellen/schemat :  "  + modelName);
		}
		model[modelName]['find'](function (err, result) {
			found = [];
			result.map(function (id,key) {
				if(index == key) found.push(id);
			})
			return res.send(found)
		});
		
	},

	findSelected: function (req,res) {
		modelName = req.params.model;
	    item = req.params.item;
	    
	    if(model[modelName] == undefined){
			return res.json("Kontrollera modellen/schemat :  "  + modelName);
		}
		model[modelName]['find'](function (err, result) {
			found = [];
			result.map(function (id,key) {
				if(key < item){
					found.push(id);
				}
			})
			return res.send(found);
		});
	},
	showInfo: function (req,res) {
		modelName = req.params.model;
	    if(model[modelName] == undefined){
			return res.json("Kontrollera modellen/schemat :  "  + modelName);
		}
		model[modelName]['find'](function (err, info) {
			if(!info) return res.json(theResult);
			else{
				theResult.ModelName = modelName;
				theResult.ModelKeys = Object.keys(model[modelName].schema.paths);
				theResult.FoundItems = info.length + " items found";
				theResult.DB = info;
				return res.json(theResult)
			}
		});	
	},
	save: function (req,res) {

		modelName = req.params.model,
		nyttSchema = mongoose.model(modelName);

		//console.log("MR saveNew ",modelName,req.body);
		//KUNDER


		if(modelName == "Kunder"){

		    var Kund = new nyttSchema({ 
		    	namn: req.body.namn, 
		    	tfn : req.body.tfn, 
		    	email : req.body.email
		    });

		    //Spara Kunden
			Kund.save(function (err, enKund) {
				if (err) return console.log(err);
				else{ 
					//log("Kund Sparad", enKund)
					log("(MЯ_"+req.method+"/Model:"+modelName+")");
					return res.json(enKund);
				}
			});

		}
		// JOBB
		if(modelName == "Skador"){

		    var Jobb = new nyttSchema({ 
		    	status: req.body.status, 
		    	beskr : req.body.beskr, 
		    	damages : req.body.damages
		    });

		    //Spara Jobbet
			Jobb.save(function (err, jobbet) {
				if (err) return console.log(err);
				else{ 
					log("(MЯ_save/Model:"+modelName+")");
					return res.json(jobbet);
				}
			});

		}

		

		
		
	},
	update: function(req,res){

		//this.findById(req,res);
		modellID = req.params.id;
		modelName = req.params.model,
		nyttSchema = mongoose.model(modelName);

		//console.log("MR update ",modelName,req.body);


		//Uppdatera Jobbet
		if(modelName == "Skador"){
		    /*{status:req.body.status, beskr:req.body.beskr, antalTim: req.body.antalTim, damages:req.body.damages}*/
			nyttSchema.findOneAndUpdate({_id:modellID } , { $set: req.body }, { new: false },function (err, jobbet) {
				if (err) return console.log(err);
				else{ 
					return res.json("(MЯ_update)\nOK: "+modellID);
				}
			});
		}

		//Uppdatera Kunden
		if(modelName == "Kunder"){
		    /*{namn:req.body.namn, tfn:req.body.tfn, email: req.body.email}*/
			nyttSchema.findOneAndUpdate({_id:modellID } , { $set: req.body }, { new: false },function (err, kunden) {
				if (err) return console.log(err);
				else{
					return res.json("(MЯ_update)\nOK: "+modellID);
				}
			});
		}
		console.log("update ok..");
	},
	delete: function(req,res){

		//this.findById(req,res);
		modellID = req.params.id;
		modelName = req.params.model,
		theModel = mongoose.model(modelName);

		console.log("MR delete ",modelName,req.body);

	    //tabort Jobbet
		theModel.remove({_id:modellID },function (err, jobbet) {
			if (err) return console.log(err);
			else{ 
				//log("Jobb delete", jobbet)
				return res.send("[MR_DELETE:::OK]\n"+jobbet);
			}
		});
		console.log("delete ok..");

	}


}
