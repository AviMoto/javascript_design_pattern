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
			get name(){
				return  name;
			},
			set name(myName){
				name = myName;
			},
			set email(myEmail){
				if(myEmail.match(/[a-zA-Z]+[0-9a-zA-Z]+[@]{1}[a-zA-Z]+[.]{1}[a-zA-Z]+$/)){
					email = myEmail;
				}
			},
			get email(){
				return email;
			},
			newMessage: function( topic, message){
				alert("You got new message from " + message.sender);
				
			},
			subscription: function(message,func){
				subscription.push(pubsub.subscribe(message,func));
			}
		};
	}
	return {
		getInstance: function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	};
})();

myMailBox = MailBox.getInstance();
myMailBox.name = "Avi Levy";
var myName = myMailBox.name;
myMailBox.email = "Avi@admintheweb.com"
var myEmail = myMailBox.email;
myMailBox.subscription("newMessage",myMailBox.newMessage);
pubsub.publish("newMessage",{sender: "kobi@admintheweb.com", title: "I'm testing"});