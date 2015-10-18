require('coffee-script');
require('coffee-script/register');
require('i2c');
var LCDPLATE=require('adafruit-i2c-lcd').plate;
var lcd= new LCDPLATE( '/dev/i2c-1', 0x20);
function start() {
    var os = require('os');
    var ipaddress = 'unable to determine ip';
    if (os.networkInterfaces().eth0) {
	ipaddress = os.networkInterfaces().eth0[0].address;
    } else if (os.networkInterfaces().wlan0) {
	ipaddress = os.networkInterfaces().wlan0[0].address;
    }
    lcd.backlight(lcd.colors.ON);
    lcd.message(ipaddress + "\n" + new Date());
    lcd.on('button_up', function(button) {
	lcd.clear();
	lcd.message('b:' + button);
    });
//    process.exit(0);
}

function stop(){
    lcd.backlight(lcd.colors.OFF);
    process.exit(0);
}

function processArg(theArg) {
    switch (theArg) {
    case 'start':
	start();
	break;
    case 'stop':
	stop();
	break;
    }
}

processArg(process.argv[2]);