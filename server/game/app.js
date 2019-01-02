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

// const { createResource } = require('./resource')

var onlineUsers = []
var rooms = []
// var resources = []

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
        console.log(rooms)
        // 發送目前所有在線房間的資訊
        sendRooms(io, rooms)

        console.log('Send Room list to client!\n', rooms)
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
            resources[roomID] = createResource()
        }

        console.log('Send Room list to client!\n', rooms, '\n')
    })

    socket.on('getRole', () => {
        let indexOfUser = findUser(onlineUsers, socket.id)

        socket.emit('receivedRole', onlineUsers[indexOfUser].character)
    })

    // socket.on('sendData', (order) => {
    //     let indexOfUser = findUser(onlineUsers, socket.id)

    //     let role = onlineUsers[indexOfUser].character
    //     let roomID = onlineUsers[indexOfUser].roomID

    //     let resource = resources[roomID]

    //     if (role == 'Manufacturer') {
    //         console.log('hell no')
    //     } else if (role == 'Distributer') {
    //         resource.distributer.outgoingOrder.push({
    //             order,
    //             counter: 0
    //         })
    //     } else if (role == 'Wholesaler') {
    //         resource.wholesaler.outgoingOrder.push({
    //             order,
    //             counter: 0
    //         })
    //     } else if (role == 'Retailer') {
    //         resource.retailer.outgoingOrder.push({
    //             order,
    //             counter: 0
    //         })
    //     }

    //     if (resource.retailer.outgoingOrder != []) {

    //         // 每一回和所有的需求訂單都要加一
    //         resource.retailer.outgoingOrder.forEach(element => {
    //             element.counter++
    //         })

    //         if (resource.retailer.outgoingOrder[0] == 3) {
    //             resource.wholesaler.incomingOrder = resource.retailer.outgoingOrder.splice(0, 1)

    //             getIncomingOrder(resource.wholesaler.incomingOrder)

    //             let amount = resource.wholesaler.stock - (resource.wholesaler.incomingOrder + resource.wholesaler.backlog)

    //             if (amount < 0) {
    //                 resource.wholesaler.backlog = Math.abs(amount)
    //                 sendToStock(resource.wholesaler.stock)
    //                 resource.wholesaler.stock = 0
    //             } else {
    //                 sendToStock(resource.wholesaler.stock)
    //                 resource.wholesaler.backlog = 0
    //                 resource.wholesaler.stock = amount
    //             }
    //         }
    //     }

    //     let indexOfRoom = findRoom(rooms, roomID)

    //     let room = rooms[indexOfRoom]

    // })

    socket.on('exitRoom', (callback) => {
        let indexOfUser = findUser(onlineUsers, socket.id)
        if (onlineUsers[indexOfUser]) {
            // console.log('in room2')
            if (onlineUsers[indexOfUser].roomName) { // 使用者已進入房間
                // console.log('in room3')

                rooms = deleteUserInRoom(socket, rooms, onlineUsers, socket.id)

                onlineUsers[indexOfUser].roomID = undefined
                onlineUsers[indexOfUser].roomName = undefined
                onlineUsers[indexOfUser].character = undefined

            } else {
                callback('使用者尚未選擇房間')
            }
        }
    })

    socket.on('getOccupied', () => {

        let indexOfUser = findUser(onlineUsers, socket.id)

        let roomID = onlineUsers[indexOfUser].roomID
        let indexOfRoom = findRoom(rooms, roomID)

        sendOccupiedCharacter(io, roomID, rooms[indexOfRoom].characters)
    })

    socket.on('logout', () => {
        socket.emit('disconnect') // for logout
        console.log('User logout : ', socket.id, '\n')
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')

        console.log(`User socket ID : ${socket.id}`)

        let indexOfUser = findUser(onlineUsers, socket.id)

        // 是否為有效連線
        if (onlineUsers[indexOfUser]) {
            if (onlineUsers[indexOfUser].roomName) { // 使用者已進入房間
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

