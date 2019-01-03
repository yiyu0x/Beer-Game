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
            outgoingOrder: 0,
            produceNew: 0,
            produceOld: 0
        },
    }
}

const setOutgoingOrder = (role, resource, order) => {
    if (role == 'Manufacturer') {
        resource.manufacturer.outgoingOrder = order
        console.log(resource.manufacturer.outgoingOrder)
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
    let amount = resource.retailer.stock - (resource.retailer.incomingOrder + resource.retailer.backlog)

    if (amount < 0) {
        resource.retailer.stock = 0
        resource.retailer.backlog = Math.abs(amount)
    } else {
        resource.retailer.stock = amount
        resource.retailer.backlog = 0
    }

    resource.retailer.cost += (resource.retailer.stock + (resource.retailer.backlog * 2))
    return resource
}

const processWholesaler = (resource) => {

    resource.wholesaler.incomingOrder = resource.retailer.outgoingOrder


    let amount = resource.wholesaler.stock - (resource.wholesaler.incomingOrder + resource.wholesaler.backlog)

    if (amount < 0) {

        resource.retailer.receive = resource.wholesaler.sendOld
        resource.wholesaler.sendOld = resource.wholesaler.sendNew
        resource.wholesaler.sendNew = resource.wholesaler.stock

        resource.wholesaler.stock = 0
        resource.wholesaler.backlog = Math.abs(amount)
    } else {

        resource.retailer.receive = resource.wholesaler.sendOld
        resource.wholesaler.sendOld = resource.wholesaler.sendNew
        resource.wholesaler.sendNew = resource.wholesaler.incomingOrder + resource.wholesaler.backlog

        resource.wholesaler.stock = amount
        resource.wholesaler.backlog = 0
    }

    resource.wholesaler.cost += (resource.wholesaler.stock + (resource.wholesaler.backlog * 2))
    return resource
}

const processDistributer = (resource) => {

    resource.distributer.incomingOrder = resource.wholesaler.outgoingOrder

    let amount = resource.distributer.stock - (resource.distributer.incomingOrder + resource.distributer.backlog)

    if (amount < 0) {

        resource.wholesaler.receive = resource.distributer.sendOld
        resource.distributer.sendOld = resource.distributer.sendNew
        resource.distributer.sendNew = resource.distributer.stock

        resource.distributer.stock = 0
        resource.distributer.backlog = Math.abs(amount)
    } else {

        resource.wholesaler.receive = resource.distributer.sendOld
        resource.distributer.sendOld = resource.distributer.sendNew
        resource.distributer.sendNew = resource.distributer.incomingOrder + resource.distributer.backlog

        resource.distributer.stock = amount
        resource.distributer.backlog = 0
    }

    resource.distributer.cost += (resource.distributer.stock + (resource.distributer.backlog * 2))
    return resource
}

const processManufacturer = (resource) => {

    // 兩週後訂單到達
    resource.manufacturer.receive = resource.manufacturer.produceOld
    resource.manufacturer.stock += resource.manufacturer.receive //偶數拿貨
    resource.manufacturer.produceOld = resource.manufacturer.produceNew
    resource.manufacturer.produceNew = resource.manufacturer.outgoingOrder
    resource.manufacturer.incomingOrder = resource.distributer.outgoingOrder

    let amount = resource.manufacturer.stock - (resource.manufacturer.incomingOrder + resource.manufacturer.backlog)

    if (amount < 0) {
        resource.distributer.receive = resource.manufacturer.sendOld
        resource.manufacturer.sendOld = resource.manufacturer.sendNew
        resource.manufacturer.sendNew = resource.manufacturer.stock

        resource.manufacturer.stock = 0
        resource.manufacturer.backlog = Math.abs(amount)
    } else {
        //送貨給下游
        resource.distributer.receive = resource.manufacturer.sendOld
        resource.manufacturer.sendOld = resource.manufacturer.sendNew
        resource.manufacturer.sendNew = resource.manufacturer.incomingOrder + resource.manufacturer.backlog

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
        io.to(socketID).emit('updateGame', resData, resource.round)

    }

    // 12 期就結束
    if (resource.round == 12) {

        let gamingResult = []

        for (let i in characters) {
            if (characters[i] == 'Retailer') {
                gamingResult.push({
                    username: room.usernames[i],
                    role: characters[i],
                    cost: resource.retailer.cost
                })
            } else if (characters[i] == 'Wholesaler') {
                gamingResult.push({
                    username: room.usernames[i],
                    role: characters[i],
                    cost: resource.wholesaler.cost
                })
            } else if (characters[i] == 'Distributer') {
                gamingResult.push({
                    username: room.usernames[i],
                    role: characters[i],
                    cost: resource.distributer.cost
                })
            } else if (characters[i] == 'Manufacturer') {
                gamingResult.push({
                    username: room.usernames[i],
                    role: characters[i],
                    cost: resource.manufacturer.cost
                })
            }
        }

        gamingResult.sort((a, b) => {
            return b.cost - a.cost
        })

        
        
        io.to(users[indexOfUser].roomID).emit('gameover', gamingResult)

    }

}

module.exports = {
    createResource,
    setOutgoingOrder,
    processDistributer,
    processManufacturer,
    processRetailer,
    processWholesaler,
    sendGameDataToClient,
}