var pubsub ={};
(function(publisher){
	var topics ={};
	var subUid = -1;
	
	publisher.publish = function(topic, args){
		if (!topics[topic]){
			return false;
		}
		
		var subscribers = topics[topic],
			len = subscribers ? subscribers.length : 0;
		
		while(len--){
			subscribers[len].func(topic, args);
		}
		
		return this;
	};
	
	publisher.subscribe = function(topic, func){
		if(!topics[topic]){
			topics[topic] = [];
		}
		
		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});
		return token;
	};
	
	publisher.unsbscribe = function(token){
		for (var message in topics){
			if (topics[message]){
				for (var i = 0, j = topics[message].length; i < j; i++){
					if(topics[message][i].token === token){
						topics[message].splice(i,1);
						return token;
					}
				}
			}
		}
		return this;
	};
}(pubsub));

var messageLoger = function (topics,data){
	console.log("Logging: " + topics + ": " + data);
};

var subscription = pubsub.subscribe("inbox/newMessage", messageLoger);

pubsub.publish("inbox/newMessage", "hello World");
pubsub.publish("inbox/newMessage", ["test", "a", "b", "c"]);
pubsub.publish("inbox/newMessage",{
	sender: "avi@admintheweb.com",
	body: "you got new message"
});

pubsub.unsbscribe(subscription);

pubsub.publish("inbox/newMessage", "I'm so lonly");