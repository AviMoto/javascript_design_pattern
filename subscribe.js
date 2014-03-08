//Mail counter
var mailCounter =0;


var subscrber1 = suscribe("inbox/newMessage", function(topic, data){
	console.log("A new message was recived: ", topic);
	document.getElementById("messageSender").innerHTML = data.sender;
	document.getElementById("messagePreview").innerHTML = data.body;
});

var subsciber2 = subscribe("inbox/newMessage", function(topic, data){
	document.getElementById("newMessageCounter").innerHTML = ++mailCounter;
});

publish("inbox/newMessage", [{
	sender: "hello@google.com",
	body: "hello this is test message"
}]);
