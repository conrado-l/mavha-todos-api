# MAvha's To-Do REST API

## Requirements
* NodeJS 10.15.2
* Microsoft SQL Server

## Setup
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

#### Tests
```
npm run tests
```
#### Development
```
npm run dev
```
#### Production
```
npm run prod
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
