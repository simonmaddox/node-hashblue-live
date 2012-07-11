# node-hashblue-live

Hashblue Live is a project inside O2 Labs to build a streaming API 
on top of your SMS. Right now we have inbound SMS working, and we're 
working on getting your outbound SMS.

Hashblue Live also has the ability to stop delivery of a message to 
the handset/SIM, so use with care.

## How to Install

```bash
npm install node-hashblue-live
```

## How to Use

First, require `node-hashblue-live`:

```js
var hashblue = require('node-hashblue-live');
```

Next, create a client and listen on the callbacks:

```js
var client = new hashblue.Client();

client.connect(msisdn,password, function(){
	console.log("Connected");
});

client.on("message", function(message, shouldDeliverOnGSM){
	console.log("Message: " + message.data.body);
});

client.on("error", function(error){
	console.log("Error: " + error);
});
```

If you wish to stop delivery over GSM:
```js
client.on("message", function(message, shouldDeliverOnGSM){
	console.log("Message: " + message.data.body);
	shouldDeliverOnGSM(false);
});
```

For clarity you can also pass `true` to the shouldDeliverOnGSM 
callback, and that will try to deliver the message in the usual way.

If you don't call `shouldDeliverOnGSM`, the message will be 
automatically delivered.