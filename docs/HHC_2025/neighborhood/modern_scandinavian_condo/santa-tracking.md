# Santa's Gift-Tracking Service Port Mystery

<!-- ![alt text](../modern_scandinavian_condo/santa-tracking2.png) -->

## Objective

Difficulty: ❄️  
[Hints](../hints/hint-santa_gift_tracking.md) and [Conversations](../hints/chat-yori_kvitchko.md)

Chat with Yori near the apartment building about Santa's mysterious gift tracker and unravel the holiday mystery.

## Solution

Solve in terminal

## Detailed Solution

```bash

======= Neighborhood Santa-Tracking Service =======

Oh no! Mischievous gnomes have tampered with the neighborhood's Santa-tracking service,
built by the local tinkerer to help everyone know when Santa arrives on Christmas Eve!

The tracking application was originally configured to run on port 8080, but after the
gnomes' meddling, it's nowhere to be found. Without this tracker, nobody in the neighborhood
will know when to expect Santa's arrival!

The tinkerer needs your help to find out which port the santa_tracker process is 
currently using so the neighborhood tracking display can be updated before Christmas Eve!

Your task:
1. Use the 'ss' tool to identify which port the santa_tracker process is 
   listening on
2. Connect to that port to verify the service is running

Hint: The ss command can show you all listening TCP ports and the processes 
using them. Try: ss -tlnp

Good luck, and thank you for helping save the neighborhood's Christmas spirit!

- The Neighborhood Tinkerer 🔧🎄
🎄 tinkerer @ Santa Tracker ~ 🎅 $ 

🎄 tinkerer @ Santa Tracker ~ 🎅 $ ss -tlnp
State                    Recv-Q                   Send-Q                                     Local Address:Port                                       Peer Address:Port                   Process                   
LISTEN                   0                        5                                                0.0.0.0:12321                                           0.0.0.0:*                                                
🎄 tinkerer @ Santa Tracker ~ 🎅 $ 

🎄 tinkerer @ Santa Tracker ~ 🎅 $ telnet 0.0.0.0:12321
telnet: could not resolve 0.0.0.0:12321/telnet: Name or service not known
🎄 tinkerer @ Santa Tracker ~ 🎅 $ curl 0.0.0.0:12321
{
  "status": "success",
  "message": "\ud83c\udf84 Ho Ho Ho! Santa Tracker Successfully Connected! \ud83c\udf84",
  "santa_tracking_data": {
    "timestamp": "2025-11-15 14:57:46",
    "location": {
      "name": "Evergreen Estates",
      "latitude": 51.131263,
      "longitude": -114.452359
    },
    "movement": {
      "speed": "619 mph",
      "altitude": "19985 feet",
      "heading": "9\u00b0 S"
    },
    "delivery_stats": {
      "gifts_delivered": 8723714,
      "cookies_eaten": 44097,
      "milk_consumed": "2777 gallons",
      "last_stop": "Evergreen Estates",
      "next_stop": "Nutcracker Boulevard",
      "time_to_next_stop": "1 minutes"
    },
    "reindeer_status": {
      "rudolph_nose_brightness": "81%",
      "favorite_reindeer_joke": "What's Rudolph's favorite currency? Sleigh bells!",
      "reindeer_snack_preference": "magical carrots"
    },
    "weather_conditions": {
      "temperature": "-4\u00b0F",
      "condition": "Clear skies"
    },
    "special_note": "Thanks to your help finding the correct port, the neighborhood can now track Santa's arrival! The mischievous gnomes will be caught and will be put to work wrapping presents."
  }
}🎄 tinkerer @ Santa Tracker ~ 🎅 $ 
```
