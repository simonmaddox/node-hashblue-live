function Message(message, stanza, client){
	this.body = message.body;
	this.from = message.from;
	this.timestamp = message.timestamp;
	
	this.stanza = stanza;
	this.client = client;
}

Message.prototype.deliverOnGSM = function(deliverOnGSM){
	console.log("Deliver On GSM: " + deliverOnGSM);
	if (!deliverOnGSM){
		this.client.xmppClient.send(new this.client.xmpp.Element('message', { to: this.stanza.attrs.from, from : this.stanza.attrs.to}).c('x', { xmlns: 'jabber:x:event' }).c('delivered').c('id').t(this.stanza.attrs.id));
	}
}

exports.Message = Message;