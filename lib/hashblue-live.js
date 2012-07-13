var xmpp = require('node-xmpp');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Client() {
}

util.inherits(Client, EventEmitter);

Client.prototype.connect = function(msisdn, password, callback){
        this.jid = msisdn + "@xmpp.connect.o2labs.co.uk";
        this.client = new xmpp.Client({ jid: this.jid, password: password });
        var self = this;

        this.client.on('online', function() {
                self.client.send(new xmpp.Element('presence', { }).c('show').t('chat').up().c('status').t(''));
				if (callback){
                	callback();
				}
        });

        this.client.on('stanza', function(stanza) {
                if (stanza.is('message') && stanza.attrs.type !== 'error') {
                        var body = stanza.getChild('body').getText();
                        var message = JSON.parse(body);

                        self.emit("message", message.data, function(shouldDeliverOnGSM){
								if (!shouldDeliverOnGSM){
                                	self.client.send(new xmpp.Element('message', { to: stanza.attrs.from, from : stanza.attrs.to}).c('x', { xmlns: 'jabber:x:event' }).c('delivered').c('id').t(stanza.attrs.id));
								}
                        });

                } else if (stanza.getChild('ping') != null){
                        self.client.send(new xmpp.Element('iq', { to: stanza.attrs.from, from : stanza.attrs.to, id : stanza.attrs.id, type : 'result'}));
                }
        });

        this.client.on("error", function (err) {
                self.emit("error", err);
        });
}
exports.Client = Client;

