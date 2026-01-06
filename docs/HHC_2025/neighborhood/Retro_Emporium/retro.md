# Retro Recovery

## Objective

Difficulty: ❄️❄️  
[Hints](../hints/hint-retro.md) and [Conversations](../hints/chat-mark-devito.md) and [Item](../Items/item-floppy.md)

Join Mark in the retro shop. Analyze his disk image for a blast from the retro past and recover some classic treasures.

## Solution / Flag

> merry christmas to all and to all a good night

## Detailed Solution

Start with a strings review of the image file. 

```bash
# Strings to file
root@kali:~/Downloads/HHC# strings floppy.img > strings.txt
```

Grepping for anything related to Star Trek with review of 10 lines before and after.  Line 211 as possible Base64.  

```bash
root@kali:~/Downloads/HHC# grep -i "trek" -A 10 -B 10 strings_floppy.txt 
LL_I-~1BAS 
rZrZ
QB45       
rZrZ
LL_I-~1SWP 
rZrZ
b0nano 7.2
mark
arcade
all_i-want_for_christmas.bas
1 REM original file superstartrek.bas dated 2/13/2009 from bcg.tar.gz
2 REM QBasic conversion by WTN...
3 REM 2/16/2021 - uncrunched, changed B9=2 to B9=0, added RANDOMIZE and SLEEP
4 REM incorporated instructions from superstartrekins.bas
5 REM 2/19/2021 - changed the code after DO YOU NEED INSTRUCTIONS?
10 REM SUPER STARTREK - MAY 16,1978 - REQUIRES 24K MEMORY
30 REM
40 REM ****        **** STAR TREK ****        ****
50 REM **** SIMULATION OF A MISSION OF THE STARSHIP ENTERPRISE,
60 REM **** AS SEEN ON THE STAR TREK TV SHOW.
70 REM **** ORIGIONAL PROGRAM BY MIKE MAYFIELD, MODIFIED VERSION
80 REM **** PUBLISHED IN DEC'S "101 BASIC GAMES", BY DAVE AHL.
90 REM **** MODIFICATIONS TO THE LATTER (PLUS DEBUGGING) BY BOB
100 REM *** LEEDOM - APRIL & DECEMBER 1974,
110 REM *** WITH A LITTLE HELP FROM HIS FRIENDS . . .
120 REM *** COMMENTS, EPITHETS, AND SUGGESTIONS SOLICITED --
130 REM *** SEND TO:  R. C. LEEDOM
140 REM ***           WESTINGHOUSE DEFENSE & ELECTRONICS SYSTEMS CNTR.
150 REM ***           BOX 746, M.S. 338
160 REM ***           BALTIMORE, MD  21203
170 REM ***
180 REM *** CONVERTED TO MICROSOFT 8 K BASIC 3/16/78 BY JOHN GORDERS
190 REM *** LINE NUMBERS FROM VERSION STREK7 OF 1/12/75 PRESERVED AS
200 REM *** MUCH AS POSSIBLE WHILE USING MULTIPLE STATEMENTS PER LINE
205 REM *** SOME LINES ARE LONGER THAN 72 CHARACTERS; THIS WAS DONE
210 REM *** BY USING "?" INSTEAD OF "PRINT" WHEN ENTERING LINES
211 REM bWVycnkgY2hyaXN0bWFzIHRvIGFsbCBhbmQgdG8gYWxsIGEgZ29vZCBuaWdodAo=
215 REM ***
219 GOSUB 20000:REM instructions
220 PRINT:PRINT:PRINT:PRINT:PRINT:PRINT:PRINT:PRINT:PRINT:PRINT:PRINT
221 PRINT"                                    ,------*------,"
222 PRINT"                    ,-------------   '---  ------'"
223 PRINT"                     '-------- --'      / /"
--
9170 G2$="ALDEBARAN":GOTO 9210
9180 G2$="REGULUS":GOTO 9210
9190 G2$="ARCTURUS":GOTO 9210
9200 G2$="SPICA"
9210 IF G5<>1 THEN ON Z5 GOTO 9230,9240,9250,9260,9230,9240,9250,9260
9220 RETURN
9230 G2$=G2$+" I":RETURN
9240 G2$=G2$+" II":RETURN
9250 G2$=G2$+" III":RETURN
9260 G2$=G2$+" IV":RETURN
20000 REM from superstartrekins.bas turned into subroutine
20010 REM INSTRUCTIONS FOR "SUPER STARTREK"  MAR 5, 1978
20020 FOR I=1 TO 12:PRINT:NEXT I
20021 PRINT TAB(10);"*************************************"
20022 PRINT TAB(10);"*                                   *"
20023 PRINT TAB(10);"*                                   *"
20030 PRINT TAB(10);"*      * * SUPER STAR TREK * *      *"
20031 PRINT TAB(10);"*                                   *"
20032 PRINT TAB(10);"*                                   *"
20035 PRINT TAB(10);"*************************************"
20036 FOR I=1 TO 8:PRINT:NEXT I
20040 INPUT " DO YOU NEED INSTRUCTIONS (Y/N)";K$:IF K$<>"Y" THEN 21210
20044 PRINT
20045 REM PRINT "TURN THE TTY ON-LINE AND HIT ANY KEY EXCEPT RETURN"
20046 REM IF INP(1)=13 THEN 46
20050 REM POKE 1229,2:POKE 1237,3:NULL 1
20090 PRINT"      INSTRUCTIONS FOR 'SUPER STAR TREK'"
20100 PRINT
20110 PRINT" 1. WHEN YOU SEE \COMMAND ?\ PRINTED, ENTER ONE OF THE LEGAL"
20120 PRINT"     COMMANDS (NAV,SRS,LRS,PHA,TOR,SHE,DAM,COM, OR XXX)."
20130 PRINT" 2. IF YOU SHOULD TYPE IN AN ILLEGAL COMMAND, YOU'LL GET A SHORT"
20140 PRINT"     LIST OF THE LEGAL COMMANDS PRINTED OUT."
20150 PRINT" 3. SOME COMMANDS REQUIRE YOU TO ENTER DATA (FOR EXAMPLE, THE"
20160 PRINT"     'NAV' COMMAND COMES BACK WITH 'COURSE (1-9) ?'.)  IF YOU"
20170 PRINT"     TYPE IN ILLEGAL DATA (LIKE NEGATIVE NUMBERS), THAN COMMAND"
20180 PRINT"     WILL BE ABORTED"
20190 PRINT
```

Used CyberChef to convert Base64 for the flag
```bash
# Base64 string
bWVycnkgY2hyaXN0bWFzIHRvIGFsbCBhbmQgdG8gYWxsIGEgZ29vZCBuaWdodAo=

# decoded
merry christmas to all and to all a good night
```

## Raw Notes

```bash
root@kali:~/Downloads/HHC# mkdir tmp
root@kali:~/Downloads/HHC# 
root@kali:~/Downloads/HHC# 
root@kali:~/Downloads/HHC# ls
floppy.img  tmp  tmp.py
root@kali:~/Downloads/HHC# sudo mount -o loop floppy.img tmp
root@kali:~/Downloads/HHC# 
root@kali:~/Downloads/HHC# ls
floppy.img  tmp  tmp.py
root@kali:~/Downloads/HHC# cd tmp/
root@kali:~/Downloads/HHC/tmp# ls
qb45
root@kali:~/Downloads/HHC/tmp# 
root@kali:~/Downloads/HHC/tmp# 
root@kali:~/Downloads/HHC/tmp# ls qb45/
BC.EXE      LIB.EXE   MOUSE.COM        QB.EXE
BRUN45.EXE  LINK.EXE  PACKING.LST.txt  QB.INI
root@kali:~/Downloads/HHC/tmp# 
root@kali:~/Downloads/HHC/tmp# 
root@kali:~/Downloads/HHC/tmp# ls
qb45
root@kali:~/Downloads/HHC/tmp# ls -la
total 12
drwxr-xr-x 3 root root 7168 Dec 31  1969 .
drwxr-xr-x 3 root root 4096 Nov 20 10:50 ..
drwxr-xr-x 2 root root  512 Mar 18  2025 qb45
root@kali:~/Downloads/HHC/tmp# 
root@kali:~/Downloads/HHC/tmp# cd qb45/
root@kali:~/Downloads/HHC/tmp/qb45# ls -la
total 579
drwxr-xr-x 2 root root    512 Mar 18  2025 .
drwxr-xr-x 3 root root   7168 Dec 31  1969 ..
-rwxr-xr-x 1 root root  97481 Mar 18  2025 BC.EXE
-rwxr-xr-x 1 root root  77440 Mar 18  2025 BRUN45.EXE
-rwxr-xr-x 1 root root  35643 Mar 18  2025 LIB.EXE
-rwxr-xr-x 1 root root  69133 Mar 18  2025 LINK.EXE
-rwxr-xr-x 1 root root  14674 Mar 18  2025 MOUSE.COM
-rwxr-xr-x 1 root root   9506 Mar 18  2025 PACKING.LST.txt
-rwxr-xr-x 1 root root 278804 Mar 18  2025 QB.EXE
-rwxr-xr-x 1 root root     69 Mar 18  2025 QB.INI
root@kali:~/Downloads/HHC/tmp/qb45# cat PACKING.LST.txt 
PACKING.LST File for QuickBASIC Version 4.50 
This package comes with a number of demonstration and utility programs written in BASIC. 
=========================================================================================
******** ROOT directory contents ********
BC.EXE					The BASIC command-line compiler	invokedby the Run
								menu's Make EXE File command or by the bc command
								from the DOS command line.
BRUN45.EXE			The QuickBASIC run-time	module;	required for running
								executable files created with BRUN45.LIB.
LIB.EXE					The Microsoft Library Manager; used to create
								stand-alone (.LIB) libraries.
LINK.EXE				The Microsoft Overlay Linker; used to create
								executable files and Quick libraries.
QB.EXE					The QuickBASIC program development environment.
QB.INI					The QuickBASIC configuration file.
MOUSE.COM				The Mouse driver for use with QuickBASIC programs
								that call mouse functions.
								
	******** \HLP directory contents ********
	QB45ENER.HLP		File containing	on-line	help information dealing with
									the QuickBASIC environment and error messages.
	QB45QCK.HLP			File containing on-line help on QuickBASIC.
	QB45ADVR.HLP		File containing on-line help information on QuickBASIC.
	
	******** \INC directory contents ********
	DEMO1.BAS				A BASICA version of a sound-effects demonstration
									program.
	DEMO2.BAS				The QuickBASIC 2.0 version of DEMO1.BAS.
	DEMO3.BAS				The QuickBASIC 4.0 (and	higher)version	of DEMO1.BAS.
	QCARDS.BAS			Supplied code for the QCARDS database program used
									in the Hands On	with QuickBASIC	tutorial. In Part 2
									of the manual Learning to Use QuickBASIC, you add
									the module-level code that completes this program.
	QCARDS.DAT			Supplied data file for the QCARDS database program.
									Keep this file in the current directory	as you add
									code during the	QCARDS.BAS tutorial.
	REMLINE.BAS			A utility program that converts	BASICA programs
									saved in ASCII format to QuickBASIC-style programs
									by removing unreferenced line numbers.
	SORTDEMO.BAS		A program that uses multicolored bars and sound to
									illustrate various sorting algorithms.
	TORUS.BAS				A graphics demonstration program that draws a
									multicolored doughnut-shaped figure on the screen,
									then animates it by shifting colors in the palette.
	QB.BI						An include file	for usewith BASIC programs that
									call any of the	following routines in the QB.QLB
									Quick library or in the	QB.LIB stand-alone library:
									ABSOLUTE, INTERRUPT, INTERRUPTX, INT86OLD, or
									INT86XOLD.  The	QB.BI file defines the types for
									arguments passed to these routines and also gives
									DECLAREstatements for these routines.
	NOEM.OBJ				(NO EMulation).	An object file to link with BASIC
									programs that will always be run on machines with an
									8087 or80287 math coprocessor chip.  Linking with
									NOEM.OBJ turns off software emulation of the math
									chip's function, and reduces the size of the
									executable file.
	SMALLERR.OBJ		An object file to link with BASIC programs thatdo
									not require run-time error messages. Linking with
									SMALLERR.OBJ reduces the size of executable files
									that donot need run-time error	messages.
	QB.PIF					A file that provides information to aid	in running
									QuickBASIC under Microsoft Windows.

		\ADVR_EX		A directory containing BASIC programs cited in the on-line help.
		******** \ADVR_EX directory contents ********
		CALL_EX.BAS					Illustrates using the CALL statement
		CHR_EX.BAS					Illustrates using the the CHR$ function
		CMD_EX.BAS					Illustrates using the the COMMAND$ function
		COM1_EX.BAS					Illustrates using the the COMMON and CHAIN statements
		COM2_EX.BAS					Module used in COM1_EX.BAS above
		CSR_EX.BAS					Illustrates using the the CSRLIN function
		DECL_EX.BAS					Illustrates using the DECLARE statement
		DEFFN_EX.BAS				Illustrates using the DEF FN statement
		DEFSG_EX.BAS				Illustrates using the DEF SEG, PEEK, and POKE statements
		DRAW_EX.BAS					Illustrates using the DRAW statement
		FUNC_EX.BAS					Illustrates using FUNCTION...END FUNCTION
		OUT_EX.BAS					Illustrates using the OUT statement
		SHARE_EX.BAS				Illustrates using the SHARED statement
		SHELL_EX.BAS				Illustrates using the SHELL statement
		STAT_EX.BAS					Illustrates using the STATIC statement
		SUB_EX.BAS					Illustrates using SUB...END SUB
		TYPE_EX.BAS					Illustrates using TYPE..END TYPE
		UBO_EX.BAS					Illustrates using the UBOUND and LBOUND functions
		UCASE_EX.BAS				Illustrates using the UCASE$ function
		WINDO_EX.BAS				Illustrates using the WINDOW statement

		\EXAMPLES		A directory containing BASIC programs printed in the QuickBASIC manuals and other demonstration programs.
		******** \EXAMPLES directory contents ********
		BALLPSET.BAS				A program that bounces a ball off the bottom and
										sides of the screen by using the PSET option with
										the graphics PUT statement.
		BALLXOR.BAS					A program that bounces a ball off the bottom and
										sides of the screen by using the XOR option with
										the graphics PUT statement.
		BAR.BAS							A program that turns input data	into a bar chart.
		CAL.BAS							A program that prints a	calendar for any month in
										any year from 1899 to 2099.
		CHECK.BAS						A checkbook-balancing program that sorts and prints a
										list of	any deposits and withdrawals input by the
										user, then prints the final balance in the checking
										account.
		COLORS.BAS					A program showing all combinations of the 16 background
										colors and 3 foreground	colors (distinct from the
										background) in the 2 color palettes available in screen
										mode 1.
		CRLF.BAS						A program that opens an	ASCII file, expands any	lines
										ending with just a carriage return or a	line feed to
										a carriage-return--line-feed combination, then writes
										the adjusted lines to a	new file.
		CUBE.BAS						A program that illustrates simple animation of a
										cube by	using multiple screen pages in screen mode 7.
		EDPAT.BAS						A program that allows you to edit a pattern tile
										for use	in a PAINT statement.  With pattern tiles,
										you can	fill any enclosed graphics area	on the screen
										with a pattern.
		ENTAB.BAS						A program that compresses an ASCII file	by replacing
										runs of	spaces with tab	characters.
		FILERR.BAS					A program that searches	for a string of	characters in
										an ASCII file.	This program traps and handles common
										file-access errors such	as the user's entering an
										invalid	file name or leaving a drive door open.
		FLPT.BAS						A program that lets you	examine	the internal format
										used by	BASIC to store single-precision	numbers.
		INDEX.BAS						A file I/O program that	builds and searches an index
										of record numbers from a random-access data file.
		MANDEL.BAS					A program that generates a fractal (a colorful graphic
										representation of the properties of certain real
										numbers) on the	screen.
		PALETTE.BAS					A program that demonstrates how	to give	the illusion
										of movement by rotating	the colors displayed by
										the color attributes from 1 to 15.
		PLOTTER.BAS					A simple line-sketching	program	that uses BASIC's
										DRAW statement.
		QLBDUMP.BAS					A program that allows you to get a listing of the
										PUBLIC code and	data symbols in	a QuickBASIC Quick
										library.
		SEARCH.BAS					A program that searches	any disk file for a pattern
										and reports every byte position	in the file where
										the pattern begins.
		SINEWAVE.BAS				A program that plots the graph of the sine-wave
										function for angle values from 0 to PI radians.
		STRTONUM.BAS				A program that convertsto a numeric value any number
										input as a string, after first filtering invalid
										numeric	characters (such as commas) out	of the
										string.
		TERMINAL.BAS				A program that turns your computer into	a "dumb"
										terminal when used with	a modem.
		TOKEN.BAS						A program that breaks an input string into a series
										of tokens (a string of characters delimited by
										blank spaces, tabs, or punctuation marks such as
										commas or semicolons).
		WHEREIS.BAS					A program that recursively searches through all
										directories on a disk for a specified file name.
	
	******** \LIB directory contents ********				
	BRUN45.LIB			The QuickBASIC run-time-module library;used for
									creating executable files from QuickBASIC and DOS.
	BQLB45.LIB			The library of supporting routines thatare used when
									creating Quick libraries.
	BCOM45.LIB			The QuickBASIC alternate run-time-module library;
									used for creating executable files from	QuickBASIC
									and DOS(files created with this library do not
									requireBRUN45.EXE to run).
	QB.LIB					The stand-alone	library	containing support routines
									for DOS system calls.
	QB.QLB					The Quick library containing support routines for
									DOS system calls.
root@kali:~/Downloads/HHC/tmp/qb45# 
```

## Game Location

![alt text](./docs/HHC_2025/neighborhood/Retro_Emporium/floppy.png)
