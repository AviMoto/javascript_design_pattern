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

var MailBox = (function(){
	var instance;
	
	function init(){
		var name;
		var email;
		var subscription = [];
		var inbox = document.getElementById("inboxTable");
		
		return {
			setName: function(myName){
				name = myName;
			},
			getName: function(){
				return name;
			},
			setEmail: function(myEmail){
				email = myEmail;
			},
			newMessage: function(message){
				alert("You got new message from" + meeage.sender);
				
			}
		};
	}
})();

function newMessage()