# Save Your Food Frontend (Web)

**Project Description**<br />
The web application frontend of Save Your Food, a food sustainability application. With this app, you can keep a virtual copy of your pantry, track expiration dates, and create grocery lists and meal plans to help with reducing food waste.

**Link to Deployed Application**<br />
Live version deployed to Netlify at: https://food-app-frontend.netlify.app/

**List of Technologies Used**<br />
React, HTML5, CSS3, Bootstrap, Javascript

**Application Functionality**<br />
![web](https://user-images.githubusercontent.com/97196460/180505181-1d0f9f21-cd2f-4d1d-bd90-fb208d8ca422.gif)<br />
<details>
<summary>Responsive web design across a variety of devices, including mobile and tablet.</summary>

Tablet:
![web-tablet](https://user-images.githubusercontent.com/97196460/180505709-1c6b25a0-84fa-4dec-8b2b-8c562ec9ca28.gif)<br />
 
Mobile:
![web-mobile](https://user-images.githubusercontent.com/97196460/180505856-8f98ff47-e74e-45d5-b1ec-a1c8a2a4d719.gif)<br />

</details>
<details>
<summary>Also available as a mobile application.</summary>

![saveYourFoodApp](https://user-images.githubusercontent.com/97196460/180500030-c93eeb86-9637-4d91-8568-228ce3c90d2d.gif)<br />

</details>
<details>
<summary>Create a virtual copy of your pantry, and be able to search by item name and category.</summary>

![web-pantry](https://user-images.githubusercontent.com/97196460/180506316-e3fcb99b-bc36-4550-ba45-563035a11764.gif)<br />

</details>
<details>
<summary>Get notified when food is within 7 days of expiring.</summary>

![web-expiring](https://user-images.githubusercontent.com/97196460/180506526-d35b496c-b0d2-41f5-bb8b-c80d4aef6cba.gif) <br />

</details>
<details>
<summary>Keep track of items from your pantry that you want to prioritize using, and easily delete them from your pantry once used.</summary>

![web-food-to-use](https://user-images.githubusercontent.com/97196460/180506683-8638e0ab-8e5f-4081-995c-81de69c88367.gif)<br />

</details>
<details>
<summary>Create your grocery list - and once you're done shopping, add your items to your pantry with the click of a button.</summary>

![web-grocery](https://user-images.githubusercontent.com/97196460/180506905-ba52187b-5840-4578-908f-da49e19d571c.gif)<br />

</details>
<details>
<summary>Create a visual schedule of your weekly meal plan to make sure your pantry items are getting used!</summary>

![web-meal-plan](https://user-images.githubusercontent.com/97196460/180507058-631d3032-8f6b-4852-bea7-def008d0ac6c.gif)<br />

</details>

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
