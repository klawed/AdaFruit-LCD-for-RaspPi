# AdaFruit LCD for Raspberry Pi
This repo provides scripts to support for [this awesome display](http://www.adafruit.com/products/1115?gclid=CjwKEAjwho2xBRD0mpzUvsya6SgSJAAkRepSsQ1uuy8X1vyNawPeKUuR_HiFyJASwAjAybQyVd0faRoCwxHw_wcB)

It consists of a node.js app and an init script (SysVinit, sorry Upstart fans!) that launches the app as a daemon and sends current IP address of `eth0` or `wlan0`.

## Dependencies
This repo relies on the excellent and clever work of many others.  Specifically, `i2c`, `adafruit-i2c-lcd` and `coffee-script`
i2c was a pain for me and I highly recommend getting your lcd-display working on it's own before adding my script to the mix.
## Using this repo
Unfortunately, I've automated very little - note that an install-script is the 2nd highest priority TODO item.  To use this on your pi, copy `initscript/lcd` to `/etc/init.d/lcd`, then create soft links to /etc/rc2.d/
```
ln -s /etc/init.d/lcd /etc/rc2.d/S06lcd
```
I have not discovered a need for this script to do anything on shutdown, hence the lack of a `K0xxlcd` link in `/etc/rc2.d`
## TODO

### create unit tests
### create an install script
### make the buttons appear as HID input
### Upstart support
