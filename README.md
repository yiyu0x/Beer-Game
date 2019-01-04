# 軟體工程期末專題 - 啤酒遊戲🍺



## Intro

前端使用 `Vue` 以及 `Vuetify` 製作成的 SPA 網頁，使玩家不論在行動裝置還是在主機上都能有相同的使用體驗。與後端溝通使用 `SocketIO` 來確保遊戲期間資訊同步的一致性。

部署期間使用 `webpack` 打包程式碼，讓厚重的網頁能減輕傳輸負擔，並且使用 CDN 技術讓世界各地的玩家都在在最短時間完成與後台第一次溝通。

## Project Structure
```
├── LICENSE
├── README.md
├── babel.config.js
├── dist
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├── ...
│ 
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
    │   ├── ......
    │   
    ├── main.js
    ├── plugins
    │   └── vuetify.js
    ├── router.js
    └── views
        ├── ......

```

## Tech & Tools
- Vue - https://vuejs.org/
- Vuetify - https://vuetifyjs.com/en/
- SocketIO - https://socket.io/
- expressJS - https://expressjs.com
- pm2 - http://pm2.keymetrics.io/

## Project setup
`npm install`

### Run backend server
`npm run db`

`npm run gmae`
### Compiles and hot-reloads for development

`npm run serve`

## The API Of SocketIO

前後端透過定義共同的 `SocketIO` 介面, 不限定在前端或端只要一個 `發送 emit` 一個 `接收 on` 就可以達成即時的資訊交流和共享. 

### The events that clients can emit to SocketIO server

**`init`**

- 初始化使用者登入時的資訊

**`logout`**

- 使用者登出

**`createRoom`**

- 使用者可以建立一個房間

**`chooseRoom`**

- 使用者可以選擇一個房間進入

**`chooseCharacter`**

- 選擇一個尚未被選擇的角色

**`getRole`**

- 得知某房間已經被選擇的角色

**`sendData`**

- 傳送遊戲間裡頭四個玩家的遊戲資訊 

**`exitRoom`**

- 使用者離開任一房間

**`getOccupied`**

- 及時地向所有使用者通知某房間佔據的角色

**`fetchOnlineClients`**

- 取得最新的在線用戶名單

**`fetchRoomList`**

- 取得最新所有在線的房間

**`disconnect`**

- 當使用者斷線離開網頁


### The events that SocketIO server can emit to clients

**`startGame`**

- 通知該房間內所有的玩家遊戲開始

**`updateGame`**

- 將每回合計算後的數據傳回給玩家

**`gameover`**

- 當遊戲來到局末點通知剛房內的所有玩家