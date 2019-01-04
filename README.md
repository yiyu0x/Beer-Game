# 軟體工程期末專題 - 啤酒遊戲🍺

## Project setup
`npm install`

### Run backend server
`npm run db`

`npm run gmae`
### Compiles and hot-reloads for development

`npm run serve`


## Project Structure
```
├── LICENSE
├── README.md
├── babel.config.js
├── demoSocket
│   ├── index.html
│   └── js
│       └── index.js
├── dist
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
```

## The API Of Socket IO 

- `Socket IO server` 所要監聽來自 `client` 的事件
  - socket.on('init'
socket.on('createRoom'
socket.on('fetchOnlineClients'
socket.on('fetchRoomList'
socket.on('chooseRoom'
socket.on('chooseCharacter'
socket.on('getRole'
socket.on('sendData'
socket.on('exitRoom'
socket.on('getOccupied'
socket.on('logout'
socket.on('disconnect'

