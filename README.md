# Save Your Food Frontend (Web)

**Project Description**<br />
The web application frontend of Save Your Food, a food sustainability application. With this app, you can keep a virtual copy of your pantry, track expiration dates, and create grocery lists and meal plans to help with reducing food waste.

**Link to Deployed Application**<br />
Live version deployed to Netlify at: https://food-app-frontend.netlify.app/

**List of Technologies Used**<br />
React, HTML5, CSS3, Bootstrap, Javascript

**Application Functionality**<br />
<details>
<summary>- Ability to authenticate and set up user accounts using Google oAuth 2.0.</summary>

![login](https://user-images.githubusercontent.com/97196460/171936206-6c4ec611-0508-4485-9564-7f871fa411af.gif) <br />

</details>
- Ability to authenticate and set up user accounts using Google oAuth 2.0. <br />
![login](https://user-images.githubusercontent.com/97196460/171936206-6c4ec611-0508-4485-9564-7f871fa411af.gif) <br />
- Ability to search for and view results from backend 3rd party Google Books API. <br />
![search](https://user-images.githubusercontent.com/97196460/171936589-40506ec7-8d9c-42d8-b312-2158da5beb6c.gif) <br />
- Ability to categorize books in user list categories (reading, want to read, have read). <br />
![userList](https://user-images.githubusercontent.com/97196460/171936859-51d14c84-4081-43c8-91b0-9ee92834d752.gif) <br />
- Ability to create, read, update, and delete user book reviews, as well as view reviews from other users. <br />  
![userRatings](https://user-images.githubusercontent.com/97196460/171938821-d4ed9458-e174-46d2-a279-ac470ed4d539.gif) <br />
- Responsive design across a variety of devices, including mobile and tablet. <br />
![mobile-view](https://user-images.githubusercontent.com/97196460/171935031-f4714a4a-3ded-4b08-a97c-a662cfbbe7f0.gif)
![tablet-view](https://user-images.githubusercontent.com/97196460/171935770-5b9b2c01-0aac-44d2-bd72-0438b985252f.gif) <br />

**Unsolved Problems**<br />
Still working through the following features: user accounts and authentication, expanding models to include recipes.

**Link to Mobile App Frontend**<br />
Frontend GitHub (Mobile): https://github.com/dmlacerte/food-app-frontend-mobile

**Link to Backend API**<br />
Backend Live API: https://immense-brushlands-47117.herokuapp.com/<br />
Backend GitHub: https://github.com/dmlacerte/food-app-backend

**Installation Instructions**<br />
1. Fork and clone down this repository.
2. Install required packages using `npm i`.
3. Assign the following env variables in an .env file at your root:
    - REACT_APP_BASE_URL_DEV: Your backend dev URL (localhost)
    - REACT_APP_BASE_URL_PROD: Your backend prod URL (if deploying)
4. Run the backend API by following the instructions in the repo linked above. 
5. Test the app functionality by running `npm start` to start the application. 
