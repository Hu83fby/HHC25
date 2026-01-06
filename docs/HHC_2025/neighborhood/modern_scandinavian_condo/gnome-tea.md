# Gnome Tea

## Objective

Difficulty: ❄️ ❄️ ❄️  
[Hints](../hints/hint-gnome_tea.md) and 
[Conversations](../hints/chat-thomas_bouve.md)


Enter the apartment building near 24-7 and help Thomas infiltrate the GnomeTea social network and discover the secret agent passphrase.

## Solution

TBD

### Detailed Solution

Attempting to log in with anything to view results in Burp revealed a Firebase error

```html
Firebase: Error (auth/invalid-credential).
```

Note in comments of source code
```html
    <!-- TODO: lock down dms, tea, gnomes collections -->
```

⚠️ please DO NOT brute force this challenge. Its NOT needed! You will know for sure the password when you get a STRONG DM/hint from a gnome and then find the location of the creds. 

ℹ️ the password will be all lowercase. You will KNOW it when you find the proper location . DO not try to brute force. 

working URL, but no new source code  
https://gnometea.firebaseapp.com/login  
does not work - https://gnometea.firebaseio.com

## Reference

* [Securing Firebase: Lessons Re-Learned from the Tea Breach](https://isc.sans.edu/diary/Securing%20Firebase%3A%20Lessons%20Re-Learned%20from%20the%20Tea%20Breach/32158)
  * [Fire Under the Kettle: Tea's Data Breach, Vibe Coding, and Firebase](https://www.youtube.com/watch?v=owKQMToTny4&t=2715s)
* [Tea app leak worsens with second database exposing user chats](https://www.bleepingcomputer.com/news/security/tea-app-leak-worsens-with-second-database-exposing-user-chats/)

## Game Location

![alt text](./docs/HHC_2025/neighborhood/modern_scandinavian_condo/gnome-tea.png)
