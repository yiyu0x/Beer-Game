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

## Contributors
- [yiyu0x](https://github.com/yiyu0x) : frontend, deployment
- [OliWave](https://github.com/OliverWangWei) : backend
- Hangyan : bug report, UI design, gaming logic design
