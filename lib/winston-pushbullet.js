var util = require('util');
var winston = require('winston');
var pushbullet = require('pushbullet');
var async = require('async');

var Pushbullet  = exports.Pushbullet = function (options) {

  this.name = 'pushbullet';
  this.level = options.level || 'warn';
  this.title = options.title || 'Winston Notification';
  this.apikey = options.apikey;
  this.devices = options.devices || '';
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(Pushbullet, winston.Transport);
winston.transports.Pushbullet = Pushbullet;

Pushbullet.prototype.log = function (level, msg, meta, callback) {
  var pusher = new pushbullet(this.apikey);
  if(meta){
  	meta.level = level;
	msg = msg + ' : ' + JSON.stringify(meta).replace(/[{,}]/g,'\n');
  }
  if(!this.devices) {
    pusher.note('', this.title, msg, function(error, response) {
      if(error) callback(error,false);
      else callback(null,true);
    });
  } else {
    var localTitle = this.title;
    async.each(this.devices, function(device,callback){
      pusher.note(device, localTitle, msg, function(error, response) {
        if(!error) callback();
        else callback(error);
      });
    }, function(err){
      if(!err) callback(null,true);
      else callback(error,false);
    });
  }
};
