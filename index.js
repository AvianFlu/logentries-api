var request = require('request');

var sources = {
	token: 'token',
	udp: 'syslog'
};

var apiUri = 'https://api.logentries.com';

function api(data, cb) {
	var options = {
		uri: apiUri,
		method: 'POST',
		form: data
	};
	request(options, function(err, res, body) {
		if (err) return cb(err);
		var result = JSON.parse(body);
		if (result.response === 'error') return cb(new Error(result.reason));
		return cb(null, result);
	});
}

module.exports = function(options) {
	return {
		getHosts: function(cb) {
			api({
				request: 'get_user',
				load_hosts: 1,
				user_key: options.accountKey
			}, cb);
		},

		registerHost: function(host, cb) {
			api({
				request: 'register',
				user_key: options.accountKey,
				name: host,
				hostname: 'nolocation'
			}, cb);
		},

		createLog: function(name, type, hostKey, cb) {
			if (!sources[type]) return cb(new Error('Invalid log type.'));

			api({
				request: 'new_log',
				user_key: options.accountKey,
				host_key: hostKey,
				source: sources.udp,
				name: name,
				retention: '-1'
			}, cb);
		}
	};
};



