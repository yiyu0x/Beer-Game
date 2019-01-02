const { findUser } = require('./user')

const createRoom = (roomID, roomName, userSocketID, username) => {
    return {
        roomID,
        roomName,
        userSocketIDs: [userSocketID],
        usernames: [username],
        characters: []
    }
}

const deleteUserInRoom = (socket, rooms, users, id) => {

    let indexOfUser = findUser(users, id)

    // leave the room in socket
    socket.leave(users[indexOfUser].roomID)

    let indexOfRoom = findRoom(rooms, users[indexOfUser].roomID)

    let indexOfUserInRoom = rooms[indexOfRoom].userSocketIDs.indexOf(id)

    rooms[indexOfRoom].userSocketIDs.splice(indexOfUserInRoom, 1)
    rooms[indexOfRoom].usernames.splice(indexOfUserInRoom, 1)
    rooms[indexOfRoom].characters.splice(indexOfUserInRoom, 1)
    rooms[indexOfRoom].characters.splice(indexOfUserInRoom, 1)

    // 判斷是否該房間已經沒有人
    if (rooms[indexOfRoom].userSocketIDs.length == 0) {
        rooms.splice(indexOfRoom, 1)
        return rooms
    }

    return rooms
}

const sendRooms = (io, rooms) => {
    io.emit('getRoomList', rooms)
}

const sendOccupiedCharacter = (io, roomID, characters) => {

    let roleStatus = {
        'Manufacturer': false,
        'Distributer': false,
        'Wholesaler': false,
        'Retailer': false
    }

    for (let i in characters) {
        roleStatus[characters[i]] = true
    }

    io.to(roomID).emit('getOccupiedCharacter', roleStatus)
}

const startGame = (io, roomID) => {
    io.in(roomID).emit('startGame')
}

// const gameInit = (room) => {
//     for (let i room.userSocketIDs)
// }

const findRoom = (rooms, roomID) => {
    for (let i in rooms) {
        if (rooms[i].roomID == roomID) {
            return i
        }
    }
}

module.exports = {
    createRoom,
    deleteUserInRoom,
    sendRooms,
    sendOccupiedCharacter,
    startGame,
    gameInit,
    findRoom
}
