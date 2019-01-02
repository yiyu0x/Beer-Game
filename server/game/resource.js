const { findUser } = require('./user')
const { findRoom } = require('./room')

const createResource = () => {
    return {
        round: 1,
        cache: 0,
        retailer: {
            stock: 15,
            cost: 0,
            backlog: 0,
            sendNew: 0,
            sendOld: 0,
            receive: 0,
            incomingOrder: 0,
            outgoingOrder: 0
        },
        wholesaler: {
            stock: 15,
            cost: 0,
            backlog: 0,
            sendNew: 0,
            sendOld: 0,
            receive: 0,
            incomingOrder: 0,
            outgoingOrder: 0
        },
        distributer: {
            stock: 15,
            cost: 0,
            backlog: 0,
            sendNew: 0,
            sendOld: 0,
            receive: 0,
            incomingOrder: 0,
            outgoingOrder: 0
        },
        manufacturer: {
            stock: 15,
            cost: 0,
            backlog: 0,
            sendNew: 0,
            sendOld: 0,
            receive: 0,
            incomingOrder: 0,
            outgoingOrder: 0
        },
    }
}

const setOutgoingOrder = (role, resource, order) => {
    if (role == 'Manufacturer') {
        console.log('hell no')
    } else if (role == 'Distributer') {
        resource.distributer.outgoingOrder = order
    } else if (role == 'Wholesaler') {
        resource.wholesaler.outgoingOrder = order
    } else if (role == 'Retailer') {
        resource.retailer.outgoingOrder = order
    }

    return resource
}

const processRetailer = (resource) => {

    resource.retailer.incomingOrder = Math.floor(Math.random() * 100)

    if (resource.round & 1 == false) resource.retailer.stock += resource.retailer.receive//偶數拿貨

    let amount = resource.retailer.stock - (resource.retailer.incomingOrder + resource.retailer.backlog)

    if (amount < 0) {
        if (resource.round & 1) {//奇數
            resource.retailer.sendNew = resource.retailer.stock
        } else {//偶數
            //send old dont need to handle
            resource.retailer.sendOld = resource.retailer.sendNew
        }
        resource.retailer.stock = 0
        resource.retailer.backlog = Math.abs(amount)
    } else {
        if (resource.round & 1) {//奇數
            resource.retailer.sendNew = resource.retailer.incomingOrder + resource.retailer.backlog
        } else {//偶數
            //send old dont need to handle
            resource.retailer.sendOld = resource.retailer.sendNew
        }
        resource.retailer.stock = amount
        resource.retailer.backlog = 0
    }

    resource.retailer.cost += (resource.retailer.stock + (resource.retailer.backlog * 2))
    return resource
}

const processWholesaler = (resource) => {

    resource.wholesaler.incomingOrder = resource.retailer.outgoingOrder

    if (resource.round & 1 == false) resource.wholesaler.stock += resource.wholesaler.receive//偶數拿貨

    let amount = resource.wholesaler.stock - (resource.wholesaler.incomingOrder + resource.wholesaler.backlog)

    if (amount < 0) {
        if (resource.round & 1) {//奇數
            resource.wholesaler.sendNew = resource.wholesaler.stock
        } else {//偶數
            //send old dont need to handle
            //送貨給下游
            resource.retailer.receive = resource.wholesaler.sendOld
            resource.wholesaler.sendOld = resource.wholesaler.sendNew
        }
        resource.wholesaler.stock = 0
        resource.wholesaler.backlog = Math.abs(amount)
    } else {
        if (resource.round & 1) {//奇數
            resource.wholesaler.sendNew = resource.wholesaler.incomingOrder + resource.wholesaler.backlog
        } else {//偶數
            //send old dont need to handle
            //送貨給下游
            resource.retailer.receive = resource.wholesaler.sendOld
            resource.wholesaler.sendOld = resource.wholesaler.sendNew
        }
        resource.wholesaler.stock = amount
        resource.wholesaler.backlog = 0
    }

    resource.wholesaler.cost += (resource.wholesaler.stock + (resource.wholesaler.backlog * 2))
    return resource
}

const processDistributer = (resource) => {

    resource.distributer.incomingOrder = resource.wholesaler.outgoingOrder

    if (resource.round & 1 == false) resource.distributer.stock += resource.distributer.receive//偶數拿貨

    let amount = resource.distributer.stock - (resource.distributer.incomingOrder + resource.distributer.backlog)

    if (amount < 0) {
        if (resource.round & 1) {//奇數
            resource.distributer.sendNew = resource.distributer.stock
        } else {//偶數
            //send old dont need to handle
            //送貨給下游
            resource.wholesaler.receive = resource.distributer.sendOld
            resource.distributer.sendOld = resource.distributer.sendNew
        }
        resource.distributer.stock = 0
        resource.distributer.backlog = Math.abs(amount)
    } else {
        if (resource.round & 1) {//奇數
            resource.distributer.sendNew = resource.distributer.incomingOrder + resource.distributer.backlog
        } else {//偶數
            //send old dont need to handle
            //送貨給下游
            resource.wholesaler.receive = resource.distributer.sendOld
            resource.distributer.sendOld = resource.distributer.sendNew
        }
        resource.distributer.stock = amount
        resource.distributer.backlog = 0
    }

    resource.distributer.cost += (resource.distributer.stock + (resource.distributer.backlog * 2))
    return resource
}

const processManufacturer = (resource) => {

    resource.manufacturer.incomingOrder = resource.distributer.outgoingOrder

    if (resource.round & 1 == false) resource.manufacturer.stock += resource.manufacturer.receive//偶數拿貨

    let amount = resource.manufacturer.stock - (resource.manufacturer.incomingOrder + resource.manufacturer.backlog)

    if (amount < 0) {
        if (resource.round & 1) {//奇數
            resource.manufacturer.sendNew = resource.manufacturer.stock
        } else {//偶數
            //send old dont need to handle
            //送貨給下游
            resource.distributer.receive = resource.manufacturer.sendOld
            resource.manufacturer.sendOld = resource.manufacturer.sendNew
        }
        resource.manufacturer.stock = 0
        resource.manufacturer.backlog = Math.abs(amount)
    } else {
        if (resource.round & 1) {//奇數
            resource.manufacturer.sendNew = resource.manufacturer.incomingOrder + resource.manufacturer.backlog
        } else {//偶數
            //send old dont need to handle
            //送貨給下游
            resource.distributer.receive = resource.manufacturer.sendOld
            resource.manufacturer.sendOld = resource.manufacturer.sendNew
        }
        resource.manufacturer.stock = amount
        resource.manufacturer.backlog = 0
    }

    resource.manufacturer.cost += (resource.manufacturer.stock + (resource.manufacturer.backlog * 2))
    return resource
}
const sendGameDataToClient = (io, id, users, rooms, resource) => {

    let indexOfUser = findUser(users, id)

    let indexOfRoom = findRoom(rooms, users[indexOfUser].roomID)

    let room = rooms[indexOfRoom]

    let characters = room.characters

    let socketID = ''
    let resData = {}

    for (let i in characters) {
        if (characters[i] == 'Retailer') {
            socketID = room.userSocketIDs[i]
            resData = resource.retailer
        } else if (characters[i] == 'Wholesaler') {
            socketID = room.userSocketIDs[i]
            resData = resource.wholesaler
        } else if (characters[i] == 'Distributer') {
            socketID = room.userSocketIDs[i]
            resData = resource.distributer
        } else if (characters[i] == 'Manufacturer') {
            socketID = room.userSocketIDs[i]
            resData = resource.manufacturer
        }
    }

    io.sockets.socket(socketID).emit('updateGame', resData, resource.round)

}
module.exports = {
    createResource,
    setOutgoingOrder,
    processDistributer,
    processManufacturer,
    processRetailer,
    processWholesaler,
    sendGameDataToClient
}