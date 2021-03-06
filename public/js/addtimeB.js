'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("javascript for recordactivity.js connected!");
	$.get("/getdata", printData);
	console.log("YOOHOO");
	$(".submitAddHours").click(submitClicked);	
	$("#addtime").keydown(keyClicked);
})

function printData(activities){
	for (var index in activities){
  		var activity = activities[index];
  		var activitydiv = $("#"+activity['activity']);
  		$(activitydiv).find("#timespent").text(results['hours'] +" / "+ results['goal'] + " hrs");
  		$(activitydiv).find("#progress_bar").css('width', (activity['hours']/activity['goal']*100)+'%');
  	}
}

function keyClicked(e) {
	console.log("Got into the keyClicked");
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		e.preventDefault();
		console.log('You pressed a "enter" key in textbox');		var activitydiv = $(this).closest(".activity");
	var activity = $(activitydiv).attr('id');
	var timeinput = $(activitydiv).find("#addtime");
	var time = timeinput.val();
	var hoursspent = $(activitydiv).find("#hoursspent").val();

	if(!validInput(time)){
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').html("Please enter the hours spent doing this activity.");
		timeinput.val("");
		return;
	}



	if(!withinRange(time, hoursspent)){
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').html("You can only spend between 0 and 24 hours per day on each activity. Please enter another number.");
		timeinput.val("");
		return;
	}

	console.log(time);
	console.log(activity);

	var parameters = {'activity': activity, 'time': time };
	$.get("/addtime", parameters);
	$.get("/gettime", parameters, success)
	}
 
	
}

function submitClicked(e){
	e.preventDefault();

	var activitydiv = $(this).closest(".activity");
	var activity = $(activitydiv).attr('id');
	var timeinput = $(activitydiv).find("#addtime");
	var time = timeinput.val();
	console.log(time);
	var hoursspent = $(activitydiv).find("#hoursspent").val();

	if(!validInput(time)){
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').show();
		$('#message').html("Please enter the hours spent doing this activity. <button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
		timeinput.val("");
		return;
	}

	if($(this).attr("id") == 'minusBtn'){
		time = -1 * time;
	}

	if(!withinRange(time, hoursspent)){
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').show();
		$('#message').html("You can only spend between 0 and 24 hours per day on each activity. Please enter another number.<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
		timeinput.val("");
		return;
	}
	var parameters = {'activity': activity, 'time': time };
	$.get("/addtime", parameters);
	$.get("/gettime", parameters, success)
}

function success(results){
	console.log("in success function in addtimeB");
	var message = results['message'];
	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').show();
	$('#message').html(message + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});

	var activitydiv = $("#"+results['activity']);
	console.log(activitydiv);
	var timespent = $(activitydiv).find("#timespent");
	console.log(timespent);
	$(activitydiv).find("#timespent").text(results['hours'] +" / "+ results['goal'] + " hrs");
	$(activitydiv).find("#progress_bar").css('width', (results['hours']/results['goal']*100)+'%');
	ga("send", "event", "targets", "timeadded");
}


function validInput(time){
	if(time == "")
		return false;
	var regexp = /^[0-9]*(.)[0-9]*$/;
    return (time.search(regexp) >= 0) ? true : false;
}

function withinRange(time, hoursspent){
	console.log ("hours spent: " + hoursspent);
	var total = parseInt(time) + parseInt(hoursspent);
	
	console.log("total" + total);
	console.log(parseInt(time) > 24);
	console.log(total < 0);
	if(total > 24 || total < 0)
		return false;
	else
		return true;
}
