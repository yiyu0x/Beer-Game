# beer🍺

## Project setup
```
npm install
```
### Run api server
```
npm run db
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Run linting and fix error
```
npm run lint
```

## Project Structure
├── LICENSE
├── README.md
├── babel.config.js
├── demoSocket
│   ├── index.html
│   └── js
│       └── index.js
├── dist
│   ├── css
│   │   ├── about.536a3171.css
│   │   └── chunk-vendors.04f85cfa.css
│   ├── favicon.ico
│   ├── index.html
│   └── js
│       ├── about.a5338c21.js
│       ├── about.a5338c21.js.map
│       ├── app.c558e8bd.js
│       ├── app.c558e8bd.js.map
│       ├── chunk-vendors.04be8ce2.js
│       └── chunk-vendors.04be8ce2.js.map
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── server
│   ├── db
│   │   ├── app.js
│   │   └── db_config.js
│   └── game
│       ├── app.js
│       ├── resource.js
│       ├── room.js
│       └── user.js
└── src
    ├── App.vue
    ├── assets
    │   ├── logo.png
    │   └── logo.svg
    ├── components
    │   ├── AlertLogin.vue
    │   ├── ButtonBox.vue
    │   ├── NewRoom.vue
    │   ├── SelectRole.vue
    │   ├── SnackBar.vue
    │   ├── ToolBar.vue
    │   ├── UserProfile.vue
    │   ├── Welcome.vue
    │   ├── roomsStatus.vue
    │   └── usersStatus.vue
    ├── main.js
    ├── plugins
    │   └── vuetify.js
    ├── router.js
    └── views
        ├── About.vue
        ├── Game.vue
        ├── Home.vue
        ├── Lobby.vue
        ├── Profile.vue
        └── Room.vue