# Amazing Trip

Authors: [Elena Iakovenko](https://github.com/Elena-MyOne), [Tatyana Shipulina](https://github.com/shipu4ka), [Alexandr Kabanau](https://github.com/AlexKabanau)

For correct work of the application you need to use : Node.js v16.18.1.

## Application features

1. Ability to interact with 3D graphics (a planet: start and home pages)
2. Changing light and dark themes
3. Switching the application between 3 languages
4. SPA and routing
5. Realization REST API by using Node and Express
6. Registration: validation and creating a new user on the backend
7. Autorisation: validation and requesting user data from the backend
8. Interaction with the application in incognito mode
9. Personal user profile and saving user data on the backend
10. Quiz about countries and saving results on the backend
11. Audio API
12. Speech recognition
13. API Yandex maps
14. Implementation of comments about countries and saving them on the backend
15. Modal Dialogs
16. Saving the progress in Local Storage and personalization of the application on the client side
17. Adaptive layout

## application technical stack

**Frontend**

- HTML, SCSS, JavaScript, TypeScript,
- Canvas, Three.js
- Audio API
- Webpack, Bootstrap, Nouislider

**Backend**

- Node.js, Express, Axios

Written from scratch and has a history of commits.
[Back end deploy](https://backend-rs-clone-copy.onrender.com)
[Back end source code](https://github.com/Elena-MyOne/backend-rs-clone)

**Idea, design, collecting information**

- The idea is unique, the application is NOT a clone of any other application.
- Design, development of the functionality, interface, and design of the application, search, and collection of information to implement the idea

**3d graphics**

- Using Three.js for 3D Graphics

  - creation of 3D objects with complex internal/external textures by applying "layers":
  - main map layer
    - relief layer
    - layer with water objects (reflection only on them)
    - layer with borders
    - city layer
    - object with clouds
    - starry sky object
    - MainHeading object
    - implementation of a dark / light theme (variants of displaying the main object on the page (Earth))
    - implementation of "clicking" on objects using RayCaster
    - implementation of the ability to “manage” an object - CameraControls
    - animation
    - resizing and resizing when changing screen sizes, including full screen mode

**Other functionality**

- Bootstrap
- Responsive design
- Changing light and dark theme
- Implemented language change (RU/EN/BE)
- SPA and routing
- TypeScript
- Modal Dialogs
- Using Local Storage
- Webpack

**Country page**

- Audio API
  - playing the national anthem
  - reproduction of phrases in the language of the country
- Yandex Maps API
- SpeechRecognition
  - user voice recognition to check the pronunciation of phrases in the country language
- Implementation of comments about countries and saving them on the backend
- Ability to manage the gallery using Hotkeys. (Arrow keys, page up/page down, scroll)
- Realization REST API by using Node and Express

**Registration and authorization**

- Registration: validation and creating a new user on the backend
- When trying to authorize an unregistered user, the backend returns an error
- The ability to use the application without registration, but with limited functionality
- Form validation +10

**User profile**

- Possibility to change the user's avatar with saving on the backend (only for registered users)
- For registered users, the progress of exploring countries is displayed
  - quiz for each country
  - quiz results are displayed in the profile and saved on the backend for each user
- A registered user has access to a quiz on knowledge of information about countries
