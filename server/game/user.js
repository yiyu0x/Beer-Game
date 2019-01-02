const createUser = (username, socketID) => {
    return {
        socketID,
        username,
        roomID: undefined,
        roomName: undefined,
        character: undefined,
    }
}

const deleteUser = (users, indexOfUser) => {
    // Fucking point : splice return the deleted element not the new array
    users.splice(indexOfUser, 1)

    return users
}

const sendOnlineUsers = (io, onlineUsers) => {
    io.emit('getOnlineClients', onlineUsers)
}

const findUser = (users, id) => {
    // console.log('user->', users)
    // console.log('id->', id)
    for (let i in users) {
        // console.log('in for:', i)    
        if (users[i].socketID == id) {
            // console.log('return')
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