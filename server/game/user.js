const createUser = (username, socketID) => {
    return {
        socketID,
        username,
        roomName: undefined,
        character: undefined,
    }
}

const deleteUser = (users, id) => {
    let indexOfUser = findUser(users, id)

    // Fucking point : splice return the deleted element not the new array
    users.splice(indexOfUser, 1)

    return users
}

const sendOnlineUsers = (io, onlineUsers) => {
    io.emit('getOnlineClients', onlineUsers)
}

const findUser = (users, id) => {

    for (let i in users) {
        if (users[i].socketID == id) {
            return i
        }
    }

}

module.exports = {
    createUser,
    deleteUser,
    findUser,
    sendOnlineUsers
}