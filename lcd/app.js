require('coffee-script');
require('coffee-script/register');
require('i2c');
var sys = require('sys');
var exec = require('child_process').exec;
var LCDPLATE=require('adafruit-i2c-lcd').plate;
var lcd= new LCDPLATE( '/dev/i2c-1', 0x20);
var mylcd = require('lcd');

var SELECT = 1
var WEST = 16
var EAST = 2
var NORTH = 8
var SOUTH = 4

var curMessage = 0
var messages = []
var curIndex = 1
function start() {
    var os = require('os');
    var ipaddress = 'unable to determine ip';
    if (os.networkInterfaces().eth0) {
	ipaddress = os.networkInterfaces().eth0[0].address;
    } else if (os.networkInterfaces().wlan0) {
	ipaddress = os.networkInterfaces().wlan0[0].address;
    }
    lcd.backlight(lcd.colors.ON);
    var reset = {}
    reset.message = "Restart Network";
    reset.action = function() { 
	exec('/etc/init.d/networking restart',
	     function (error, stdout, stderr) {
		 var message = 'stdout: ' + stdout + '\nstderr:' + stderr
		 console.log(message);
		 lcd.clear();
		 lcd.message(message);
		 if (error !== null) {
		     console.log('exec error: ' + error);
		     messages.push({message:'last error' + error, action:function(){}})
		 }
	     });
	console.log('Restart Network'); 
    }
    messages.push(reset)
    var curaddress = {}
    curaddress.message = ipaddress + "\n" + new Date();
    curaddress.action = function() {console.log('curaddress');}
    messages.push(curaddress);
    lcd.message(messages[curMessage].message);
    
    lcd.on('button_up', function(button) {
	switch (button) {
	case NORTH:
	    scrollup();
	    break;
	case SOUTH:
	    scrolldown();
	    break;
	case SELECT:
	    messages[curMessage].action();
	}
    });
//    process.exit(0);
}

function updateLcd() {
        lcd.clear();
    lcd.message(messages[curMessage].message);
}
function scrollup() {
    curMessage = ++curIndex % messages.length;
    updateLcd();
}

function scrolldown() {
    curMessage = --curIndex % messages.length;
    updateLcd();
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