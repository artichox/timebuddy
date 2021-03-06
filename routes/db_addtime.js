var models = require('../models');

exports.addtime = function(req, res) {
	//ga("send", "event", "targetpage", "viewed");

	// get a random palette from the top ones 
	console.log("Javascript for db_addtime.js linked in addtime!");
	var username = req.session.username;
	var activity = req.query.activity;
	console.log(activity + "/" + username);
	
	models.Activity
		.where({'activity': activity})
		.where({'user': username})
		.update({'activity': activity, 'user': username}, {$inc:{'hours': req.query.time}})
		.exec(afterUpdating);
	
	function afterUpdating(err, activity){
		console.log(activity);
		//var result = { "message": "" , "activity": req.query.activity , "hours": parseFloat(activity[0]['hours']) + parseFloat(req.query.time), "goal": activity[0]['goal']} ;
		//res.send(result)
		res.send()
	}	
 }

exports.gettime = function(req, res) {
	// get a random palette from the top ones 
	console.log("Javascript for db_addtime.js linked in gettime!");
	var activity = req.query.activity;
	var username = req.session.username;
	models.Activity
		.where({'activity': activity})
		.where({'user': username})
		.exec(afterFinding);
	function afterFinding(err, activity){
		var result = { "message": "Time Added!" , "activity": req.query.activity , "hours": activity[0]['hours'], "goal": activity[0]['goal']} ;
		res.send(result)
	}	
 }
