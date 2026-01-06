# Going in Reverse

## Objective

Difficulty: ❄️❄️  
[Hints](./docs/HHC_2025/neighborhood/hints/hint-reverse.md) and [Conversations](./docs/HHC_2025/neighborhood/hints/chat-kevin_mcfarland.md) and [Item](./docs/HHC_2025/neighborhood/Items/item-basic.md)

Kevin in the Retro Store needs help rewinding tech and going in reverse. Extract the flag and enter it here.

## Solution / Flag

> CTF{frost-plan:compressors,coolant,oil}

## Detailed Solution

Install FreeBasic on Linux VM

```bash
# install dependencies.  See the References doc
root@kali:~/Downloads/HHC# sudo apt-get -y install gcc libncurses-dev libtinfo-dev libffi-dev libgl1-mesa-dev libx11-dev libxext-dev libxrender-dev libxrandr-dev libxpm-dev

# set variable
root@kali:~/Downloads/HHC# url='https://sourceforge.net/projects/fbc/files/FreeBASIC-1.10.1/Binaries-Linux/FreeBASIC-1.10.1-ubuntu-22.04-x86_64.tar.gz/download'

# install package
root@kali:~/Downloads/HHC# curl -s -L "${url}" | tar -xz

# ls to conirm that git was cloned properly
root@kali:~/Downloads/HHC# ls
floppy  FreeBASIC-1.10.1-ubuntu-22.04-x86_64  login.bas  tmp  tmp.py

# CD to directory or run path with absolute path to finish install
root@kali:~/Downloads/HHC# cd FreeBASIC-1.10.1-ubuntu-22.04-x86_64/

# Run install script
root@kali:~/Downloads/HHC# ./install.sh -i

# Compiled correctly, notice the install app
root@kali:~/Downloads/HHC# ls
floppy  FreeBASIC-1.10.1-ubuntu-22.04-x86_64  login  login.bas  tmp  tmp.py

# CD back to directory with file
root@kali:~/Downloads/HHC# cd ..
```


Find the correct language based on the errors

```bash
root@kali:~/Downloads/HHC# fbc login.bas 
login.bas(1) error 146: Only valid in -lang deprecated or fblite or qb in '10 REM *** COMMODORE 64 SECURITY SYSTEM ***'
login.bas(2) error 146: Only valid in -lang deprecated or fblite or qb in '20 ENC_PASS$ = "D13URKBT"'
login.bas(3) error 146: Only valid in -lang deprecated or fblite or qb in '30 ENC_FLAG$ = "DSA|auhts*wkfi=dhjwubtthut+dhhkfis+hnkz" ' old "DSA|qnisf`bX_huXariz"'
login.bas(4) error 146: Only valid in -lang deprecated or fblite or qb in '40 INPUT "ENTER PASSWORD: "; PASS$'
login.bas(5) error 146: Only valid in -lang deprecated or fblite or qb in '50 IF LEN(PASS$) <> LEN(ENC_PASS$) THEN GOTO 90'
login.bas(6) error 146: Only valid in -lang deprecated or fblite or qb in '60 FOR I = 1 TO LEN(PASS$)'
login.bas(7) error 146: Only valid in -lang deprecated or fblite or qb in '70 IF CHR$(ASC(MID$(PASS$,I,1)) XOR 7) <> MID$(ENC_PASS$,I,1) THEN GOTO 90'
login.bas(8) error 146: Only valid in -lang deprecated or fblite or qb in '80 NEXT I'
login.bas(9) error 146: Only valid in -lang deprecated or fblite or qb in '85 FLAG$ = "" : FOR I = 1 TO LEN(ENC_FLAG$) : FLAG$ = FLAG$ + CHR$(ASC(MID$(ENC_FLAG$,I,1)) XOR 7) : NEXT I : PRINT FLAG$'
login.bas(9) error 42: Variable not declared, I in '85 FLAG$ = "" : FOR I = 1 TO LEN(ENC_FLAG$) : FLAG$ = FLAG$ + CHR$(ASC(MID$(ENC_FLAG$,I,1)) XOR 7) : NEXT I : PRINT FLAG$'
login.bas(9) error 133: Too many errors, exiting
```

Turns out qb is correct

```bash
root@kali:~/Downloads/HHC# fbc -lang qb login.bas

root@kali:~/Downloads/HHC# chmod +x login


Try the password as is in the script
```bash 
root@kali:~/Downloads/HHC# ./login 
ENTER PASSWORD: ? D13URKBT
ACCESS DENIED
```

based on line 146, use CyberChef to brute force XOR.
![alt text](./docs/HHC_2025/neighborhood/Retro_Emporium/xor.png)

One password jumps out.  We still get Access Denied, but we also get the flag.  

```bash
root@kali:~/Downloads/HHC# ./login 
ENTER PASSWORD: ? C64RULES
CTF{frost-plan:compressors,coolant,oil}
ACCESS DENIED
```

## References 

* https://www.baeldung.com/linux/basic-run-code-cli 

## Game Location

![freeSki](./docs/HHC_2025/neighborhood/Retro_Emporium/free_ski.png)
