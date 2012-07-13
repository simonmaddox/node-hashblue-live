var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Models = require('./models');

function Client() {
}

util.inherits(Client, EventEmitter);

Client.prototype.connect = function(msisdn, password, callback){
	this.msisdn = msisdn;
	this.jid = msisdn + "@xmpp.connect.o2labs.co.uk";
	this.xmpp = require('node-xmpp');;
	this.xmppClient = new this.xmpp.Client({ jid: this.jid, password: password });
	var self = this;

	this.xmppClient.on('online', function() {
		self.xmppClient.send(new self.xmpp.Element('presence', { }).c('show').t('chat').up().c('status').t(''));
		if (callback){
			callback();
		}
	});

	this.xmppClient.on('stanza', function(stanza) {
		if (stanza.is('message') && stanza.attrs.type !== 'error') {
			var body = stanza.getChild('body').getText();
			var message = JSON.parse(body);

			if (message.type == 'message'){
				var messageObject = new Models.Message(message.data, stanza, self);
				self.emit("message", messageObject);
			}

		} else if (stanza.getChild('ping') != null){
			self.xmppClient.send(new self.xmpp.Element('iq', { to: stanza.attrs.from, from : stanza.attrs.to, id : stanza.attrs.id, type : 'result'}));
		}
	});

	this.xmppClient.on("error", function (err) {
		self.emit("error", err);
	});
}

exports.Client = Client;

