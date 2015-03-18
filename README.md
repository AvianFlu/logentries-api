# Logentries API

# This is forked from [here](https://bitbucket.org/contentpool/logentries-api)

## Unofficial HTTP API Wrapper

Can be used as a Node.js module and as a command line utility to
- register hosts
- create logs
- fetch infos abouts hosts and logs from logentries.com

This module can not be used to write logs to logentries.com. If you look for a node module to write logs, I recommend [`node-logentries`](https://www.npmjs.org/package/node-logentries).

#### Disclaimer
This module is in no way related to logentries.com Inc. and is not supported by them.

## Command line usage

All command line actions return a JSON formatted string. I highly recommend the great [`jsontool`](http://npmjs.org/package/jsontool) npm module for processing (filter, format,...) these results.

### Get all registered hosts

```bash
$ le-api hosts
```

Returns a JSON string representing an array of all registered hosts:

```json
[
    {
        "name": "host1",
        "key": "11111111-2222-3333-4444-555555555555"
    },
    {
        "name": "host2",
        "key": "66666666-7777-8888-9999-000000000000"
    }
]
```

### Get host key by host name

```bash
$ le-api host <hostname>
```

Return value:
```json
{ "key": "11111111-2222-3333-4444-555555555555" }
```

### Register host

```bash
$ le-api register <hostname>
```

Returns the name and key of the newly registered host:
```json
{
    "name": "host1",
    "key": "11111111-2222-3333-4444-555555555555"
}
```

### Create log

```bash
$ le-api createlog <logname> <logtype> <host key>
```

The `logtype`parameter takes the following values:
- token ... token based log
- udp ... plain UDP log (for syslog forwarding)

Return the name, key and port (if the created log is of type 'udp'):
```json
{
    "name": "host1",
    "key": "11111111-2222-3333-4444-555555555555"
    "port": "10111"
}
```

## Library usage

### Example

```javascript
var leApi = require('logentries-api')({ accessKey: 'my_access_key' });

leApi.getHosts(function(err, result) {
  ...
});

leApi.getHost(hostname, function(err, result) {
  ...
});

leApi.registerHost(hostname, function(err, result) {
  ...
});

leApi.createLog(logName, logType, hostKey, function(err, result) {

});

```
