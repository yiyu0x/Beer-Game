const { findUser } = require('./user')

const createRoom = (roomName, userSocketID, username) => {
    return {
        roomName,
        userSocketIDs: [userSocketID],
        usernames: [username],
        characters: []
    }
}

const deleteUserInRoom = (socket, rooms, users, id) => {

    let indexOfUser = findUser(users, id)

    // leave the room in socket
    socket.leave(users[indexOfUser].roomName)

    let indexOfRoom = findRoom(rooms, users[indexOfUser].roomName)

    let indexOfUserInRoom = rooms[indexOfRoom].userSocketIDs.indexOf(id)

    rooms[indexOfRoom].userSocketIDs.splice(indexOfUserInRoom, 1)
    rooms[indexOfRoom].usernames.splice(indexOfUserInRoom, 1)
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

const sendOccupiedCharacter = (socket, roomName, character) => {
    socket.to(roomName).emit('getOccupiedCharacter', character)
}

const findRoom = (rooms, roomName) => {
    for (let i in rooms) {
        if (rooms[i].roomName == roomName) {
            return i
        }
    }
}

module.exports = {
    createRoom,
    deleteUserInRoom,
    sendRooms,
    sendOccupiedCharacter,
    findRoom
}
