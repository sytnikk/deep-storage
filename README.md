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
string | email | *"email"*
string | password | *"password"*
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
