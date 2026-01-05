# Its All About Defang

## Objective

Difficulty: ❄️  
[Hints](../hints/hint-defang.md)

Find Ed Skoudis upstairs in City Hall and help him troubleshoot a clever phishing tool in his cozy office.

## Dosis Neighborhood SOC

## Email Viewer

### Step 1 Extract IOCs

From: "Icicle Innovations" <sales@icicleinnovations.mail>
To: "Neighborhood Watch" <residents@dosisneighborhood.corp>
Subject: 🎄 URGENT: Holiday Kitchen Makeover - Smart Home Integration! 🎄
Date: Wed, 25 Dec 2025 09:15:33 -0500
Message-ID: <holiday2025-kitchen@dosisneighborhood.corp>
MIME-Version: 1.0
Content-Type: text/plain; charset="UTF-8"
X-Mailer: KitchenAlert v2.025
Received: from mail.icicleinnovations.mail (172.16.254.1) by dosisneighborhood.corp (10.0.0.5) with SMTP;
         Wed, 25 Dec 2025 09:15:28 -0500
Received: from core.icicleinnovations.mail (192.168.1.1) by mail.icicleinnovations.mail (172.16.254.1);
         Wed, 25 Dec 2025 09:15:22 -0500

Dear Valued Dosis Neighborhood Residents,

🚨 IMMEDIATE ACTION REQUIRED 🚨

Our elite team of Sunny's kitchen renovation specialists have detected some SERIOUSLY outdated kitchen setups in your neighborhood! It appears that certain homes are still using legacy appliances without proper smart home integration - like non-IoT fridges that can't automatically order milk, or microwaves that don't sync with your meal planning apps! 

While this sounds like a delightfully festive renovation opportunity (and totally not a security assessment), we need you to:

1) Download our FREE Kitchen Renovation Planner™ with built-in security features (totally legit, we promise!):
   https://icicleinnovations.mail/renovation-planner.exe
   
2) Upload high-resolution photos of your current kitchen to our secure design portal (we need to see ALL angles for proper renovation planning):
   https://icicleinnovations.mail/upload_photos

For instant help with any kitchen renovation questions, contact our 24/7 design hotline at 523.555.0100 or our renovation specialists at 523.555.0101.

Remember: If your old appliances start acting up during the assessment, it's probably just excitement about their upcoming upgrades! But please document any issues with photos.

Stay merry (and consider smart upgrades),
Icicle Innovations 
Chief Kitchen Design Specialist
📞 523.555.RENO
info@icicleinnovations.mail

P.S. - Has anyone else noticed their kitchen cabinets mysteriously rearranging themselves overnight? We can fix that with proper smart storage solutions!

### Threat Intelligence Analysis

#### 🚨 Step Objective: Extract IOCs 🚨

This phishing email may be connected to the mysterious Gnome activities reported throughout our neighborhood! Extracting IOCs (Indicators of Compromise) is essential to protect the Counter Hack Crew and identify the threat actors behind this campaign. Your mission:

Extract all suspicious domains, IPs, URLs, and email addresses
Use the tabs below to extract each IOC type from the email. Be sure not to include legitimate assets!

⏰ Time is critical – the attackers might be planning something bigger!

#### Regex

##### Domains

```bash
(\w+\.)?(\w+)\.mail
```

##### IPs

```bash
(192|172)\.(\d){1,3}\.(\d){1,3}\.(\d){1,3}
```

##### URLs

```bash
(https:\/\/)(\w+\.\w+\/)(\w+)(.\w+)?(\.\w+)?
```

#### Step 2 - Defang and Report

```bash
s/\./[.]/g ; s/@/[@]/g ; s/http/hxxp/g ; s/:\//[://]/g
```

![alt text](./docs/HHC_2025/neighborhood/City_Hall/Eds_Office2/final_report.png)

## Game Location

![eds_office](./docs/HHC_2025/neighborhood/City_Hall/Eds_Office2/eds_office.png)
