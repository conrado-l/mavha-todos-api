To-Do REST API

## Requirements
* NodeJS 10.15.2
* Microsoft SQL Server 2017

## Setup
##### Disclaimer: current directory must be `/src`
#### Dependencies
```
npm install
```
#### Database settings
```
src/config/config.json (development environment)
```
#### Database creation
```
npm run db:create
```
#### Database migration
```
npm run db:migrate
```

## Running

#### Development
```
npm run dev
```
#### Tests
```
npm run tests
```
## Documentation
Generate API routes documentation
```
npm run apidoc
```
The documentation will be available at:
``` 
http://localhost:8080/apidoc

User: MAvha
Password: MAvha
```
