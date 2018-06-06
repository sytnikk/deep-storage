# Deep storage - NodeJS, MongoDB
It is a flexible API to help fast start your project.

## API Methods



## *Registration*



Create a new user

#### Request
Method | URL
------------ | -------------
GET/POST|http://localhost:3000/api/registration

#### Required data
Type | Parameter | Value
------------ | ------------- | -------------
string | email | *"example@mail.ko"*
string | password | *"Qwerty123"*

You can add any parameters to the object

#### Example (POST body)
```javascript
{
  email: "example@mail.ko",
  password: "Qwerty123",
  restData: "restData"
}
```

#### Example (GET url)
http://localhost:3000/api/registration/?email=example@mail.ko&password=Qwerty123&restData=restData

#### Response
200
```javascript
{
  "result": true,
  "data": {
    "_id": "5b1723a855cc2403d0c9cb40",
    "email": "example@mail.ko",
    "restData": "restData",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

3xx, 4xx
```javascript
{
  "result": false,
  "message": "Error message"
}
```

## *Login*

#### Request
Method | URL
------------ | -------------
GET/POST|http://localhost:3000/api/login

#### Required data
Type | Parameter | Value
------------ | ------------- | -------------
string | email | *"example@mail.ko"*
string | password | *"Qwerty123"*

#### Example (POST body)
```javascript
{
  email: "example@mail.ko",
  password: "Qwerty123"
}
```

#### Example (GET url)
http://localhost:3000/api/login/?email=example@mail.ko&password=Qwerty123

#### Response
200
```javascript
{
  "result": true,
  "data": {
    "_id": "5b1723a855cc2403d0c9cb40",
    "email": "example@mail.ko",
    "restData": "restData",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

3xx, 4xx
```javascript
{
  "result": false,
  "message": "Error message"
}
```

## *Save data*

#### Request
Method | URL
------------ | -------------
GET/POST|http://localhost:3000/api/storage/?method=save_data

#### Required data
Type | Parameter | Value
------------ | ------------- | -------------
string | method | *save_data*
string | collection | *"collectionName"*
string | token | *"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"*

You can add any parameters to the object

#### Example (POST body)
```javascript
{
  method: "save_data",
  collection: "importantcollection",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  importantData: "veryImportantData"
 }
```

#### Example (GET url)
http://localhost:3000/api/storage/?method=save_data&collection=importantcollection&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&importantData=veryImportantData

#### Response
200
```javascript
{
  "result": true,
  "data": {
    "_id": "5b17275555cc2403d0c9cb41",
    "importantData": "veryImportantData",
    "__v": 0
  }
}
```

3xx, 4xx
```javascript
{
  "result": false,
  "message": "Error message"
}
```

## *Get data*

#### Request
Method | URL
------------ | -------------
GET/POST|http://localhost:3000/api/storage/?method=get_data

#### Required data
Type | Parameter | Value
------------ | ------------- | -------------
string | method | *get_data*
string | collection | *"collectionName"*
string | token | *"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"*

You can add any wanted parameters to the object

#### Example (POST body)
```javascript
{
  method: "get_data",
  collection: "importantcollection",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  importantData: "veryImportantData"
 }
```

#### Example (GET url)
http://localhost:3000/api/storage/?method=get_data&collection=importantcollection&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&importantData=veryImportantData

#### Response
200
```javascript
{
"result": true,
"data": [
    {
      "_id": "5b167e5fd7e2592a9038faca"
      "importantData": "veryImportantData",
      "newImportantData": "newImportantData",
      "__v": 0
    },
    {
      "_id": "5b168186ea726b53a8d59890"
      "importantData": "veryImportantData",
      "newImportantData": "newImportantData",
      "__v": 0
    },
    {
      "_id": "5b17275555cc2403d0c9cb41",
      "importantData": "veryImportantData",
      "__v": 0
    }
  ],
}
```
Or empty array
```javascript
{
"result": true,
"data": [],
}
```

3xx, 4xx
```javascript
{
  "result": false,
  "message": "Error message"
}
```

## *Update data*

#### Request
Method | URL
------------ | -------------
GET/POST|http://localhost:3000/api/storage/?method=update_data

#### Required data
Type | Parameter | Value
------------ | ------------- | -------------
string | method | *update_data*
string | collection | *"collectionName"*
string | token | *"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"*
string | id | *"5b17275555cc2403d0c9cb41"*

#### Example (POST body)
```javascript
{
  "method": "update_data",
  "collection": "importantcollection",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.",
  "id": "5b168186ea726b53a8d59890",
  "newImportantData": "newVeryImportantData"
 }
```

#### Example (GET url)
http://localhost:3000/api/storage/?method=update_data&collection=importantcollection&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&id=5b168186ea726b53a8d59890&newImportantData=newVeryImportantData

#### Response
200
```javascript
{
  "result": true
}
```

3xx, 4xx
```javascript
{
  "result": false,
  "message": "Error message"
}
```


## *Delete data*

#### Request
Method | URL
------------ | -------------
GET/POST|http://localhost:3000/api/storage/?method=delete_data

#### Required data
Type | Parameter | Value
------------ | ------------- | -------------
string | method | *delete_data*
string | collection | *"collectionName"*
string | token | *"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"*
string | id | *"5b17275555cc2403d0c9cb41"*

#### Example (POST body)
```javascript
{
  "method": "delete_data",
  "collection": "importantcollection",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.",
  "id": "5b168186ea726b53a8d59890"
 }
```

#### Example (GET url)
http://localhost:3000/api/storage/?method=delete_data&collection=importantcollection&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&id=5b168186ea726b53a8d59890

#### Response
200
```javascript
{
  "result": true
}
```

3xx, 4xx
```javascript
{
  "result": false,
  "message": "Error message"
}
```
## Install

Clone project
```git clone https://github.com/sytnikk/deep-storage.git```

Run NodeJS driver 
```npm run db```
It will create db directory in your project

And start server
```npm run start```
