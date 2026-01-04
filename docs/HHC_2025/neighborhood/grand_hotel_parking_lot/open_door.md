# Open Door

## Challenge

Difficulty: ❄️  

Help Goose Lucas in the hotel parking lot find the dangerously misconfigured Network Security Group rule that's allowing unrestricted internet access to sensitive ports like RDP or SSH.

## Solution

Solve in terminal

## Detailed Solution

```bash
Welcome back! Let's start by exploring output formats.
First, let's see resource groups in JSON format (the default):
$ az group list
JSON format shows detailed structured data.

neighbor@fa2431c8828e:~$ az group list
[
  {
    "id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/theneighborhood-rg1",
    "location": "eastus",
    "managedBy": null,
    "name": "theneighborhood-rg1",
    "properties": {
      "provisioningState": "Succeeded"
    },
    "tags": {}
  },
  {
    "id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/theneighborhood-rg2",
    "location": "westus",
    "managedBy": null,
    "name": "theneighborhood-rg2",
    "properties": {
      "provisioningState": "Succeeded"
    },
    "tags": {}
  }
]
```

```bash
Great! Now let's see the same data in table format for better readability 👀
$ az group list -o table
Notice how -o table changes the output format completely!
Both commands show the same data, just formatted differently.

neighbor@fa2431c8828e:~$ az group list -o table
Name                 Location    ProvisioningState
-------------------  ----------  -------------------
theneighborhood-rg1  eastus      Succeeded
theneighborhood-rg2  westus      Succeeded
neighbor@fa2431c8828e:~$ 
```

```bash
Lets take a look at Network Security Groups (NSGs).
To do this try: az network nsg list -o table
This lists all NSGs across resource groups.
For more information:
https://learn.microsoft.com/en-us/cli/azure/network/nsg?view=azure-cli-latest

neighbor@fa2431c8828e:~$ az network nsg list -o table
Location    Name                   ResourceGroup
----------  ---------------------  -------------------
eastus      nsg-web-eastus         theneighborhood-rg1
eastus      nsg-db-eastus          theneighborhood-rg1
eastus      nsg-dev-eastus         theneighborhood-rg2
eastus      nsg-mgmt-eastus        theneighborhood-rg2
eastus      nsg-production-eastus  theneighborhood-rg1
```

```bash
Inspect the Network Security Group (web)  🕵️
Here is the NSG and its resource group:--name nsg-web-eastus --resource-group theneighborhood-rg1 

Hint: We want to show the NSG details. Use | less to page through the output.
Documentation: https://learn.microsoft.com/en-us/cli/azure/network/nsg?view=azure-cli-latest#az-network-nsg-show

neighbor@fa2431c8828e:~$ az network nsg show --name nsg-web-eastus --resource-group theneighborhood-rg1 | less

{
  "id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/theneighborhood-rg1/providers/Microsoft.Network/networkSecurityGroups/nsg-web-eastus",
  "location": "eastus",
  "name": "nsg-web-eastus",
  "properties": {
    "securityRules": [
      {
        "name": "Allow-HTTP-Inbound",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "80",
          "direction": "Inbound",
          "priority": 100,
          "protocol": "Tcp",
          "sourceAddressPrefix": "0.0.0.0/0"
        }
      },
      {
        "name": "Allow-HTTPS-Inbound",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "443",
          "direction": "Inbound",
          "priority": 110,
          "protocol": "Tcp",
          "sourceAddressPrefix": "0.0.0.0/0"
        }
      },
      {
        "name": "Allow-AppGateway-HealthProbes",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "80,443",
          "direction": "Inbound",
          "priority": 130,
                   "protocol": "Tcp",
          "sourceAddressPrefix": "AzureLoadBalancer"
        }
      },
      {
        "name": "Allow-Web-To-App",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "8080,8443",
          "direction": "Inbound",
          "priority": 200,
          "protocol": "Tcp",
          "sourceAddressPrefix": "VirtualNetwork"
        }
      },
      {
        "name": "Deny-All-Inbound",
        "properties": {
          "access": "Deny",
          "destinationPortRange": "*",
          "direction": "Inbound",
          "priority": 4096,
          "protocol": "*",
          "sourceAddressPrefix": "*"
        }
      }
    ]
  },
  "resourceGroup": "theneighborhood-rg1",
  "tags": {
    "env": "web"
  }
}
```

```bash
Inspect the Network Security Group (mgmt)  🕵️
Here is the NSG and its resource group:--nsg-name nsg-mgmt-eastus --resource-group theneighborhood-rg2 

Hint: We want to list the NSG rules
Documentation: https://learn.microsoft.com/en-us/cli/azure/network/nsg/rule?view=azure-cli-latest#az-network-nsg-rule-list

{
  "id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/theneighborhood-rg2/providers/Microsoft.Network/networkSecurityGroups/nsg-mgmt-eastus",
  "location": "eastus",
  "name": "nsg-mgmt-eastus",
  "properties": {
    "securityRules": [
      {
        "name": "Allow-AzureBastion",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "443",
          "direction": "Inbound",
          "priority": 100,
          "protocol": "Tcp",
          "sourceAddressPrefix": "AzureBastion"
        }
      },
      {
        "name": "Allow-Monitoring-Inbound",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "443",
          "direction": "Inbound",
          "priority": 110,
          "protocol": "Tcp",
          "sourceAddressPrefix": "AzureMonitor"
        }
      },
      {
        "name": "Allow-DNS-From-VNet",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "53",
          "direction": "Inbound",
          "priority": 115,
          "protocol": "Udp",
          "sourceAddressPrefix": "VirtualNetwork"
        }
      },
      {
        "name": "Deny-All-Inbound",
        "properties": {
          "access": "Deny",
          "destinationPortRange": "*",
          "direction": "Inbound",
          "priority": 4096,
          "protocol": "*",
          "sourceAddressPrefix": "*"
        }
      },
      {
        "name": "Allow-Monitoring-Outbound",
        "properties": {
          "access": "Allow",
          "destinationAddressPrefix": "AzureMonitor",
          "destinationPortRange": "443",
          "direction": "Outbound",
          "priority": 200,
          "protocol": "Tcp"
        }
      },
      {
        "name": "Allow-AD-Identity-Outbound",
        "properties": {
          "access": "Allow",
          "destinationAddressPrefix": "AzureActiveDirectory",
              "destinationPortRange": "443",
          "direction": "Outbound",
          "priority": 210,
          "protocol": "Tcp"
        }
      },
      {
        "name": "Allow-Backup-Outbound",
        "properties": {
          "access": "Allow",
          "destinationAddressPrefix": "AzureBackup",
          "destinationPortRange": "443",
          "direction": "Outbound",
          "priority": 220,
          "protocol": "Tcp"
        }
      }
    ]
  },
  "resourceGroup": "theneighborhood-rg2",
  "tags": {
    "env": "mgmt"
  }
}      
```

```bash
Take a look at the rest of the NSG rules and examine their properties.
After enumerating the NSG rules, enter the command string to view the suspect rule and inspect its properties.
Hint: Review fields such as direction, access, protocol, source, destination and port settings.

Documentation: https://learn.microsoft.com/en-us/cli/azure/network/nsg/rule?view=azure-cli-latest#az-network-nsg-rule-show

neighbor@fa2431c8828e:~$ az network nsg rule show --resource-group theneighborhood-rg2 --nsg-name nsg-mgmt-eastus --name Allow-AD-Identity-Outbound 

{
  "name": "Allow-AD-Identity-Outbound",
  "properties": {
    "access": "Allow",
    "destinationAddressPrefix": "AzureActiveDirectory",
    "destinationPortRange": "443",
    "direction": "Outbound",
    "priority": 210,
    "protocol": "Tcp"
  }
}

neighbor@fa2431c8828e:~$ az network nsg rule show --resource-group theneighborhood-rg2 --nsg-name nsg-mgmt-eastus --name Allow-Backup-Outbound
{
  "name": "Allow-Backup-Outbound",
  "properties": {
    "access": "Allow",
    "destinationAddressPrefix": "AzureBackup",
    "destinationPortRange": "443",
    "direction": "Outbound",
    "priority": 220,
    "protocol": "Tcp"
  }
}


neighbor@fa2431c8828e:~$ az network nsg show --name nsg-dev-eastus --resource-group theneighborhood-rg2 | less

{
  "id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/theneighborhood-rg2/providers/Microsoft.Network/networkSecurityGroups/nsg-dev-eastus",
  "location": "eastus",
  "name": "nsg-dev-eastus",
  "properties": {
    "securityRules": [
      {
        "name": "Allow-HTTP-Inbound",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "80",
          "direction": "Inbound",
          "priority": 100,
          "protocol": "Tcp",
          "sourceAddressPrefix": "0.0.0.0/0"
        }
      },
      {
        "name": "Allow-HTTPS-Inbound",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "443",
          "direction": "Inbound",
          "priority": 110,
          "protocol": "Tcp",
          "sourceAddressPrefix": "0.0.0.0/0"
        }
      },
      {
        "name": "Allow-DevOps-Agents",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "5986",
          "direction": "Inbound",
          "priority": 115,
         "protocol": "Tcp",
          "sourceAddressPrefix": "AzureDevOps"
        }
      },
      {
        "name": "Allow-Jumpbox-Remote-Access",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "3389,22",
          "direction": "Inbound",
          "priority": 120,
          "protocol": "Tcp",
          "sourceAddressPrefix": "10.2.0.0/24"
        }
      },
      {
        "name": "Deny-All-Inbound",
        "properties": {
          "access": "Deny",
          "destinationPortRange": "*",
          "direction": "Inbound",
          "priority": 4096,
          "protocol": "*",
          "sourceAddressPrefix": "*"
        }
      }
    ]
  },
  "resourceGroup": "theneighborhood-rg2",
  "tags": {
    "env": "dev"
  }
}




neighbor@fa2431c8828e:~$ az network nsg show --name nsg-production-eastus --resource-group theneighborhood-rg1 | less

{
  "id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/theneighborhood-rg1/providers/Microsoft.Network/networkSecurityGroups/nsg-production-eastus",
  "location": "eastus",
  "name": "nsg-production-eastus",
  "properties": {
    "securityRules": [
      {
        "name": "Allow-HTTP-Inbound",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "80",
          "direction": "Inbound",
          "priority": 100,
          "protocol": "Tcp",
          "sourceAddressPrefix": "0.0.0.0/0"
        }
      },
      {
        "name": "Allow-HTTPS-Inbound",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "443",
          "direction": "Inbound",
          "priority": 110,
          "protocol": "Tcp",
          "sourceAddressPrefix": "0.0.0.0/0"
        }
      },
      {
        "name": "Allow-AppGateway-HealthProbes",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "80,443",
          "direction": "Inbound",
          "priority": 115,
          "protocol": "Tcp",
          "sourceAddressPrefix": "AzureLoadBalancer"
        }
      },
      {
        "name": "Allow-RDP-From-Internet",
        "properties": {
          "access": "Allow",
          "destinationPortRange": "3389",
          "direction": "Inbound",
          "priority": 120,
          "protocol": "Tcp",
          "sourceAddressPrefix": "0.0.0.0/0"
        }
      },
      {
        "name": "Deny-All-Inbound",
        "properties": {
          "access": "Deny",
          "destinationPortRange": "*",
          "direction": "Inbound",
          "priority": 4096,
          "protocol": "*",
          "sourceAddressPrefix": "*"
        }
      }
    ]
  },
  "resourceGroup": "theneighborhood-rg1",
  "tags": {
    "env": "prod"
  }
}
```

```bash
neighbor@fa2431c8828e:~$ az network nsg rule show --resource-group theneighborhood-rg1 --nsg-name nsg-production-eastus --name Allow-RDP-From-Internet
{
  "name": "Allow-RDP-From-Internet",
  "properties": {
    "access": "Allow",
    "destinationPortRange": "3389",
    "direction": "Inbound",
    "priority": 120,
    "protocol": "Tcp",
    "sourceAddressPrefix": "0.0.0.0/0"
  }
}
```

```bash
Great, you found the NSG misconfiguration allowing RDP (port 3389) from the public internet!
Port 3389 is used by Remote Desktop Protocol — exposing it broadly allows attackers to brute-force credentials, exploit RDP vulnerabilities, and pivot within the network.

✨ To finish, type: finish

neighbor@fa2431c8828e:~$ finish
Completing challenge...
```

```bash
🎉 Challenge complete! 🎉
``` 

## Game Location

![alt text](/docs/HHC_2025/neighborhood/grand_hotel_parking_lot/open_door.png)
