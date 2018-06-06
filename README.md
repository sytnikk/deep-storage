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
