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
	console.log("Message: " + message.body);
});

client.on("error", function(error){
	console.log("Error: " + error);
});
```

If you wish to stop delivery over GSM:
```js
client.on("message", function(message, shouldDeliverOnGSM){
	console.log("Message: " + message.body);
	shouldDeliverOnGSM(false);
});
```

For clarity you can also pass `true` to the shouldDeliverOnGSM 
callback, and that will try to deliver the message in the usual way.

If you don't call `shouldDeliverOnGSM`, the message will be 
automatically delivered.

## Getting your credentials

Before you can use Hashblue Live, you'll need some credentials. It's 
easy - just send an SMS with your desired password to `07598 020 176`. Your
number will be provisioned, and you'll get a text back when it's all
done.

Then, use your phone number and chosen password in `client.connect`.

## Turning off Hashblue Live

If you want to disable Hashblue Live on your phone number, text
`STOP` to `07598 020 176`. You'll receive a confirmation by SMS shortly
afterwards.

## Receiving SMS while your phone is offline

Hashblue Live has the ability, in certain cases, to intercept 
incoming messages even if your phone is turned off or out of 
signal.

Right now, that only works for messages sent by O2 customers. But
we're working on making it available for messages from any network.

## A note on O2 Connect

If you're an O2 Connect user, your Connect account will be deleted if
you register with Hashblue Live. Unfortunately, at this time they are
not compatible.

If you do not want your O2 Connect account deleted, please do not use
Hashblue Live.