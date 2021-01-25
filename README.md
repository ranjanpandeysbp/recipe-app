The application is the frontend part of Recipe management application
You can register and login and manage recipes

Two ways to acess the application:
----------------------------------
1. Access the hosted url: **https://ranjanpandeysbp.github.io/**

2. Run the application locally:
a. Git clone https://github.com/ranjanpandeysbp/recipe-app.git
b. From root run command **npm install**
c. From root run command **ng serve**
d. Open browser access http://localhost:4200/
e. Popup will appear with login details instruction, please use the instruction.

This frontend is connected to heroku hosted api:
https://recipeapi2021.herokuapp.com/v2/api-docs

If you want to run the backend API locally by following below steps:
https://github.com/ranjanpandeysbp/recipes-api

Than in this project(Frontend) please change the base url from heroku to your local backend API in file **recipe.service.ts**
Change the local url in **baseUrlApi** variable.