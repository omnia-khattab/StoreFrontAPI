# Storefront Backend Project

## Getting Started

This repo contains a Node and Express app to build Store front API. To get started, clone this repo and run `yarn` or `npm init` in your terminal at the project root.

## Scripts needed
  - ### Migrate database
    -  npm run migrateup
  - ### Test
    - npm run test
  - ### migrate down test database
    - npm run testdown 
  - ### start
    - npm run watch  
  - ### applying prettier and Eslint 
    - npm run lint/prettier

## Database

  - ### Port Number
      - 5432
  - ### Create database
      - CREATE DATABASE store;
  - ### Create test database
      - CREATE DATABASE store_test;
  - ### Create user for database
      - CREATE USER store_user WITH PASSWORD 'store_db@3475';
  - ### Grant Permission to user
      - GRANT ALL PRIVILEGES ON DATABASE store TO store_user;
      - GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;

## Server
  - ### Port
    - 3000
  - ### Host
    - http://localhost:3000/