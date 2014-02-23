var models = require('../models');

exports.view = function(req, res){
	models.Activity
		.find()
		.sort('hours')
		.exec(renderActivities);

	function renderActivities(err, activities){
		res.render('viewstats.handlebars', {'activities': activities});
		console.log(activities);
	}
};