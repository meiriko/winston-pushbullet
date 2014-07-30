# winston-pushbullet

A [Winston](https://github.com/flatiron/winston) transport that outputs data using [Pushbullet](https://www.pushbullet.com/).

## Usage

``` js
  var winston = require('winston');
  require('winston-pushbullet').Pushbullet;

  var logger = new (winston.Logger)({
    transports: [
      new winston.transports.Pushbullet(options)
    ],
    exitOnError: true
  });

  module.exports = logger;

```

Options can include the following. APIKEY, a is required.

* __apikey:__ apikey for the Pushbullet account that will recieve the notification.
* __level:__ Level of warning required for a notification to be sent off. Defaults to warn.
* __title__ Title of the notification. Defaults to Winston Notification.
* __devices__ Devices to send the notifications too. As per the `node-pushbullet-api` module both device IDENs and device IDs can be used.  If the `deviceIden` parameter is passed as a number it is treated as a device ID. It defaults to '' which means the notification will be sent to all devices on the account.

## Dependencies

[Winston](https://github.com/flatiron/winston)

[Pushbullet](https://github.com/alexwhitman/node-pushbullet-api/)

[Async](https://github.com/caolan/async)

#### Author: Callum Loh

License: MIT
