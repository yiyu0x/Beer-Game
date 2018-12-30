const express = require('express')
const app = express()
const socketIO = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketIO(server)

const { createUser, deleteUser, findUser, sendOnlineUsers } = require('./user')
const { createRoom, deleteUserInRoom, findRoom, sendOccupiedCharacter, sendRooms } = require('./room')

var onlineUsers = []
var rooms = []

io.on('connection', (socket) => {

    console.log('A new socket connection')
    console.log('%s sockets connected', io.engine.clientsCount, '\n')

    // 接收使用者在登入時初始化的資料
    socket.on('init', (username, callback) => {

        let isSameName = onlineUsers
            .map((user) => user.username)
            .find((name) => username == name)

        // 找到相同名, 就返回錯誤給使用者
        if (isSameName) {
            console.log('REJECT : User login with the same username : ', username)
            callback('User login with the same username !')
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
    socket.on('createRoom', (roomName) => {

        console.log('Received createRoom event : ', roomName)

        let indexOfUser = findUser(onlineUsers, socket.id)
        onlineUsers[indexOfUser].roomName = roomName

        rooms.push(createRoom(roomName, socket.id, socket.nickname))

        // 即時向其他使用者發送房間的資訊
        sendRooms(io, rooms)

        console.log('Send Room list to client!\n', rooms, '\n')
    })

    socket.on('fetchOnlineClients', () => {
        sendOnlineUsers(io, onlineUsers.map((user) => user.username))
        console.log('Send online_users to client!\n', onlineUsers.map((user) => user.username))
    })

    // 接收客戶端想要所有房間的資訊
    socket.on('addInToRoom', () => {

        console.log('Received addInToRoom event')

        // 發送目前所有在線房間的資訊
        sendRooms(io, rooms)

        console.log('Send Room list to client!\n', onlineUsers.map((user) => user.username))
    })

    // 接收客戶端所選擇房間的資訊
    socket.on('chooseRoom', (roomName) => {

        console.log('Received chooseRoom event : ', roomName)

        socket.join(roomName)

        let indexOfUser = findUser(onlineUsers, socket.id)
        onlineUsers[indexOfUser].roomName = roomName

        console.log(rooms)
        let indexOfRoom = findRoom(rooms, roomName)
        rooms[indexOfRoom].userSocketIDs.push(socket.id)
        rooms[indexOfRoom].usernames.push(socket.nickname)

        // 及時向其他使用者發送房間的訊息
        sendRooms(io, rooms)

        console.log('Send Room list to client!\n', rooms, '\n')
    })

    // 選擇角色
    socket.on('chooseCharacter', (character) => {

        console.log('Received chooseCharacter event : ', character)

        let indexOfUser = findUser(onlineUsers, socket.id)
        onlineUsers[indexOfUser].character = character
        let roomName = onlineUsers[indexOfUser].roomName

        // 通知同房的其他隊友該角色已經被選擇了
        sendOccupiedCharacter(socket, roomName, character)

        let indexOfRoom = findRoom(rooms, roomName)
        let indexOfCharacter = rooms[indexOfRoom].userSocketIDs.indexOf(socket.id)
        rooms[indexOfRoom].characters[indexOfCharacter] = character

        // 及時向其他使用者發送房間的訊息
        sendRooms(io, rooms)

        console.log('Send Room list to client!\n', rooms, '\n')
    })

    socket.on('logout', () => {
        socket.emit('disconnect') // for logout
        console.log('User logout : ', socket.id, '\n')
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')

        let indexOfUser = findUser(onlineUsers, socket.id)

        // 使用者已進入房間
        if (onlineUsers[indexOfUser] && onlineUsers[indexOfUser].roomName) {
            // 將離線的使用者踢出房間
            rooms = deleteUserInRoom(socket, rooms, onlineUsers, socket.id)
            console.log('in room')
        } else {
            console.log('not in room')
        }

        // 將離線的使用者踢出在線名單
        onlineUsers = deleteUser(onlineUsers, socket.id)
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

