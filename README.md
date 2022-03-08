# Run with me

A web application for runners who wants to run with others and track their own running progress.

# 

### Live Demo

Take a look for yourself and let me know your thoughts!
https://run-with-me7.herokuapp.com

# Technologies Used
- React.js
- Webpack
- Node.js
- Express
- PostgreSQL
- SQL
- Babel
- HTML5
- CSS3
- Heroku
- Google map API
- Google geolocation API

# Preview 

# Features
- User can create a account
- User can create a event 
- User can see location of the even though google map
- User can edit event 
- User can delete event
- User can log runs
- User can delete runs

# Stretch Features
- User can get email updates about events
- User can search event by location 
- User can click attending to events

# System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- Postgres

# Getting Started
1. Clone the repository
    ```shell
    git clone git@github.com:AngelaJiaNan/Run-with-me.git
    cd Run-with-me
    ```
3. Install all dependencies with NPM
    ```shell
    npm install
    ```
5. Make a copy of the .env.example file
   ```shell
   cp .env.example .env
   ```
7. Start postgreSQL
   ```shell
   sudo service postgresql start
   ```
9. Create a new database
   ```shell
   createdb runwithme
   ```
11. Import the database into postgreSQL
    ```shell
    npm run db:import
    ```
13. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    ```shell
    npm run dev
