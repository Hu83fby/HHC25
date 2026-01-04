# Intro into NMAP

## Objective

Difficulty: ❄️  
[Hints](../hints/hint-nmap.md) and [Conversations](../hints/chat-eric_pursley.md)

Meet Eric in the hotel parking lot for Nmap know-how and scanning secrets. Help him connect to the wardriving rig on his motorcycle!

## Detailed Solution

```bash
Welcome to the Intro to Nmap terminal!  We will learn some Nmap basics by running commands to answer the questions asked, which will guide us in finding and connecting to the wardriving rig's service. 
Run the command "hint" to receive a hint.

1) When run without any options, nmap performs a TCP port scan of the top 1000 ports. Run a default nmap scan of 127.0.12.25 and see which port is open.

elf@c75216ebbaa2:~$ nmap 127.0.12.25
Starting Nmap 7.80 ( https://nmap.org ) at 2025-11-16 13:35 UTC
Nmap scan report for 127.0.12.25
Host is up (0.000066s latency).
Not shown: 999 closed ports
PORT     STATE SERVICE
8080/tcp open  http-proxy

Nmap done: 1 IP address (1 host up) scanned in 0.30 seconds
```

```bash
2) Sometimes the top 1000 ports are not enough. Run an nmap scan of all TCP ports on 127.0.12.25 and see which port is open.

elf@c75216ebbaa2:~$ nmap 127.0.12.25 -p-
Starting Nmap 7.80 ( https://nmap.org ) at 2025-11-16 13:38 UTC
Nmap scan report for 127.0.12.25
Host is up (0.000073s latency).
Not shown: 65534 closed ports
PORT      STATE SERVICE
24601/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 1.92 seconds
```

```bash
3) Nmap can also scan a range of IP addresses.  Scan the range 127.0.12.20 - 127.0.12.28 and see which has a port open.

elf@c75216ebbaa2:~$ nmap 127.0.12.20-28
... truncated ....
Nmap scan report for 127.0.12.27
Host is up (0.00018s latency).
All 1000 scanned ports on 127.0.12.27 are closed

Nmap scan report for 127.0.12.28
Host is up (0.00018s latency).
All 1000 scanned ports on 127.0.12.28 are closed

Nmap done: 9 IP addresses (9 hosts up) scanned in 0.51 seconds
```

```bash
4) Nmap has a version detection engine, to help determine what services are running on a given port. What service is running on 127.0.12.25 TCP port 8080?

elf@c6bc9ec07411:~$ nmap -sV 127.0.12.25 -p 8080
Starting Nmap 7.80 ( https://nmap.org ) at 2025-11-16 13:44 UTC
Nmap scan report for 127.0.12.25
Host is up (0.000072s latency).

PORT     STATE SERVICE VERSION
8080/tcp open  http    SimpleHTTPServer 0.6 (Python 3.10.12)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.65 seconds
```

```bash
5) Sometimes you just want to interact with a port, which is a perfect job for Ncat!  Use the ncat tool to connect to TCP port 24601 on 127.0.12.25 and view the banner returned.

elf@c6bc9ec07411:~$ ncat 127.0.12.25  24601
Welcome to the WarDriver 9000!
Terminated
```

```bash
Congratulations, you finished the Intro to Nmap and found the wardriving rig's service!
Type "exit" to close...

elf@c6bc9ec07411:~$ exit
```

## Game Location

![alt text](./nmap.png)
