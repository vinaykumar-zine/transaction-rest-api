# TRANSACTIONS-REST-API
REST API for management of transactions between accounts of accountHolders (Customers/Users)

### API_ENDPOINT_PREFIX: https://transaction-rest-api.herokuapp.com

<br />

## USERS/CUSTOMERS APIs:
### GET: /api/users
Sample Input: NA  
Sample Output:  
[
    {  
        "_id": "60264264b180bfa700726943",  
        "username": "akm",  
        "email": "ank@gmail.com",  
        "mobile": "8787877878",  
        "createdAt": "2021-02-12T08:55:00.921Z",  
        "updatedAt": "2021-02-12T08:55:00.921Z",  
        "__v": 0
    },  
    {
        "_id": "60264636b180bfa700726944",  
        "username": "mis",  
        "email": "mis@gmail.com",  
        "mobile": "9212121212",  
        "createdAt": "2021-02-12T09:11:19.292Z",  
        "updatedAt": "2021-02-12T09:11:19.292Z",  
        "__v": 0  
    }
]  

### POST: /api/users
Sample Input: (x-www-form-urlencoded)  
username:kum  
password:123  
email:kum@gmail.com  
mobile:9212121212  

Sample Output:  
{  
    "customerId": "6026485ab180bfa700726945",  
    "username": "kum",  
    "email": "kum@gmail.com",  
    "mobile": "9212121212",  
    "joinedOn": "2021-02-12T09:20:26.712Z"  
} 


### POST: /api/users/login
Sample Input: (x-www-form-urlencoded)  
username:kum  
password:123  

Sample Output:  
{  
    "customerId": "6026485ab180bfa700726945",  
    "username": "kum",  
    "email": "kum@gmail.com",  
    "mobile": "9212121212",  
    "joinedOn": "2021-02-12T09:20:26.712Z"  
} 

<br />
<br />

## ACCOUNT APIs:
### POST: /api/accounts 
Sample Input:(x-www-form-urlencoded)  
accountType:BASICSAVINGS  
balance:5000  
accountHolder:6026485ab180bfa700726945
Sample Output:  
{  
    "balance": 5000,  
    "transactions": [],  
    "_id": "6025c0df8d24c592d0aea33f",  
    "accountType": "BASICSAVINGS",  
    "accountHolder": "6026485ab180bfa700726945",  
    "createdAt": "2021-02-11T23:42:23.798Z",  
    "updatedAt": "2021-02-11T23:42:23.798Z",  
    "__v": 0  
}

### GET: /api/accounts 
Sample Input:NA   
Sample Output:  
[
    {  
        "balance": 5000,  
        "transactions": [],  
        "_id": "60264a89b180bfa700726946",  
        "accountType": "BASICSAVINGS",  
        "accountHolder": "6026485ab180bfa700726945",  
        "createdAt": "2021-02-12T09:29:45.238Z",  
        "updatedAt": "2021-02-12T09:29:45.238Z",  
        "__v": 0  
    },  
    {  
        "balance": 5000,  
        "transactions": [],  
        "_id": "60264a95b180bfa700726947",  
        "accountType": "BASICSAVINGS",  
        "accountHolder": "60264264b180bfa700726943",  
        "createdAt": "2021-02-12T09:29:57.899Z",  
        "updatedAt": "2021-02-12T09:29:57.899Z",  
        "__v": 0  
    }
]

<br />
<br />

## TRANSACTION APIs:
### POST: /api/transactions 
Sample Input:  
fromAccountId:60264a89b180bfa700726946  
toAccountId:60264a95b180bfa700726947  
amount:500  
description:Bill Payment  
Sample Output:  
{
    "newSrcBalance": 3500,
    "totalDestBalance": 137000,
    "transferredAt": "2021-02-12T10:09:07.098Z"
} 

### GET: /api/transactions 
Sample Input: NA  
Sample Output:  
[
    {  
        "description": "Bill Payment",  
        "status": true,  
        "failureReason": "NA",  
        "_id": "60264b8bb180bfa700726949",  
        "fromAccountId": "60264b62b180bfa700726948",  
        "toAccountId": "60264a95b180bfa700726947",  
        "amount": 500,  
        "createdAt": "2021-02-12T09:34:04.457Z",  
        "updatedAt": "2021-02-12T09:34:04.457Z",  
        "__v": 0  
    },  
    {  
        "description": "Bill Payment",  
        "status": true,  
        "failureReason": "NA",  
        "_id": "602653509fa1cda0949a29a4",  
        "fromAccountId": "60264a89b180bfa700726946",  
        "toAccountId": "60264a95b180bfa700726947",  
        "amount": 500,  
        "createdAt": "2021-02-12T10:07:14.022Z",  
        "updatedAt": "2021-02-12T10:07:14.022Z",  
        "__v": 0  
    }
]


