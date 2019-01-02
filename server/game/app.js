const express = require('express')
const app = express()
const socketIO = require('socket.io')
const http = require('http')
const randomHash = require('random-hash')

const server = http.createServer(app)
const io = socketIO(server)

const {
    createUser,
    deleteUser,
    findUser,
    sendOnlineUsers
} = require('./user')

const {
    createRoom,
    deleteUserInRoom,
    findRoom,
    sendOccupiedCharacter,
    sendRooms,
    startGame
} = require('./room')

const { createResource } = require('./resource')

var onlineUsers = []
var rooms = []

io.on('connection', (socket) => {

    console.log('A new socket connection')
    console.log('%s sockets connected', io.engine.clientsCount, '\n')
    console.log(`User socket ID : ${socket.id}`)

    // 接收使用者在登入時初始化的資料
    socket.on('init', (username, callback) => {

        let isSameName = onlineUsers
            .map((user) => user.username)
            .find((name) => username == name)

        // 找到相同名, 就返回錯誤給使用者
        if (isSameName) {
            console.log('REJECT : User login with the same username : ', username)
            callback('您已從其他裝置登入過此帳號')
            return
        }

        // console.log('\nReceived init event : ', username)
        console.log('The user', username, 'is online!')
        socket.nickname = username
        onlineUsers.push(createUser(username, socket.id))

        let usernameList = onlineUsers.map((user) => user.username)

        // 對每個連線發送在線人數和使用者
        sendOnlineUsers(io, usernameList)
        console.log('Send online_users to client!\n', usernameList)

        sendRooms(io, rooms)
        console.log('Send Room_list to client!\n', rooms, '\n')

    })

    // 接收使用者開發間的資訊
    socket.on('createRoom', (roomName, callback) => {

        console.log('Received createRoom event : ', roomName)

        let indexOfUser = findUser(onlineUsers, socket.id)

        console.log('\nonlineUsers', onlineUsers)
        console.log('onlineUsers[indexOfUser]', onlineUsers[indexOfUser])
        console.log('onlineUsers[indexOfUser].roomName', onlineUsers[indexOfUser].roomName, '\n')

        if (onlineUsers[indexOfUser].roomName) {
            console.log('REJECT : User cannot open multiple rooms : ', onlineUsers[indexOfUser].username)
            callback('一個人只能開一個房間')
            return
        }

        onlineUsers[indexOfUser].roomName = roomName
        onlineUsers[indexOfUser].roomID = randomHash.generateHash({ length: 16 })

        socket.join(onlineUsers[indexOfUser].roomID)

        rooms.push(createRoom(
            onlineUsers[indexOfUser].roomID, roomName, socket.id, socket.nickname))

        // 即時向其他使用者發送房間的資訊
        sendRooms(io, rooms)

        console.log('Send Room list to client!\n', rooms, '\n')
    })

    socket.on('fetchOnlineClients', () => {
        sendOnlineUsers(io, onlineUsers.map((user) => user.username))
        console.log('Send online_users to client!\n', onlineUsers.map((user) => user.username))
    })

    // 接收客戶端想要所有房間的資訊
    socket.on('fetchRoomList', () => {

        console.log('Received addInToRoom event')

        // 發送目前所有在線房間的資訊
        sendRooms(io, rooms)

        console.log('Send Room list to client!\n', onlineUsers.map((user) => user.username))
    })

    // 接收客戶端所選擇房間的資訊
    socket.on('chooseRoom', (data, callback) => {

        console.log('Received chooseRoom event : ', data.roomID)

        let indexOfUser = findUser(onlineUsers, socket.id)

        console.log('\nonlineUsers', onlineUsers)
        console.log('onlineUsers[indexOfUser]', onlineUsers[indexOfUser])
        console.log('onlineUsers[indexOfUser].roomName', onlineUsers[indexOfUser].roomName, '\n')

        if (onlineUsers[indexOfUser].roomName) {
            console.log('REJECT : User cannot choose multiple rooms : ', data.username)
            callback('只能選擇進入一個房間喔')
            return
        }

        socket.join(data.roomID)

        onlineUsers[indexOfUser].roomName = data.roomName
        onlineUsers[indexOfUser].roomID = data.roomID

        let indexOfRoom = findRoom(rooms, data.roomID)
        rooms[indexOfRoom].userSocketIDs.push(socket.id)
        rooms[indexOfRoom].usernames.push(socket.nickname)

        // 及時向其他使用者發送房間的訊息
        sendRooms(io, rooms)

        // 通知同房的其他隊友哪些角色已經被選擇了
        sendOccupiedCharacter(io, data.roomID, rooms[indexOfRoom].characters)

        console.log('Send Room list to client!\n', rooms, '\n')
    })

    // 選擇角色
    socket.on('chooseCharacter', (character, callback) => {

        console.log('Received chooseCharacter event : ', character)

        let indexOfUser = findUser(onlineUsers, socket.id)

        if (onlineUsers[indexOfUser].character) {
            console.log('REJECT => User can only choose one character in one game')
            console.log(`Current user : ${onlineUsers[indexOfUser].character}`)
            callback('只能選擇一個角色')
            return
        }

        onlineUsers[indexOfUser].character = character
        let roomID = onlineUsers[indexOfUser].roomID


        let indexOfRoom = findRoom(rooms, roomID)
        let indexOfCharacter = rooms[indexOfRoom].userSocketIDs.indexOf(socket.id)
        rooms[indexOfRoom].characters[indexOfCharacter] = character

        // 通知同房的其他隊友哪些角色已經被選擇了
        sendOccupiedCharacter(io, roomID, rooms[indexOfRoom].characters)

        // 及時向其他使用者發送房間的訊息
        sendRooms(io, rooms)

        // 當角色選滿時遊戲就開始
        if (rooms[indexOfRoom].characters.length == 4) {
            startGame(io, roomID)
        }

        console.log('Send Room list to client!\n', rooms, '\n')
    })

    // socket.on('sendOutgoingOrder', (order) => {
    //     let indexOfUser = findUser(onlineUsers, socket.id)
    //     let roomID = 
    // })

    socket.on('logout', () => {
        socket.emit('disconnect') // for logout
        console.log('User logout : ', socket.id, '\n')
    })

    // socket.on('sendOrder', (order) => {

    //     let indexOfUser = findUser(onlineUsers, socket.id)
    // })

    socket.on('disconnect', () => {
        console.log('User was disconnected')

        console.log(`User socket ID : ${socket.id}`)

        let indexOfUser = findUser(onlineUsers, socket.id)

        // 是否為有效連線
        if (onlineUsers[indexOfUser]) {
            if (onlineUsers[indexOfUser].roomName) {// 使用者已進入房間
                console.log('in room')
                // 將離線的使用者踢出房間
                rooms = deleteUserInRoom(socket, rooms, onlineUsers, socket.id)
            } else {
                console.log('not in room')
            }
        } else {
            console.log('Send online users to client!\n', onlineUsers.map((user) => user.username))
            console.log('Send Room list to client!\n', rooms, '\n')
            return
        }

        // 將離線的使用者踢出在線名單
        onlineUsers = deleteUser(onlineUsers, indexOfUser)
        sendOnlineUsers(io, onlineUsers.map((user) => user.username))
        console.log('Send online users to client!\n', onlineUsers.map((user) => user.username))

        // 及時向其他使用者發送房間的訊息
        sendRooms(io, rooms)
        console.log('Send Room list to client!\n', rooms, '\n')
    })

})

server.listen(6969, () => {
    console.log('Server is up on port 6969 !\n')
})

