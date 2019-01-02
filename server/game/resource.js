
const createResource = () => {
    return {
        round: 1,
        cache: 0,
        cost: 0,
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

    let amount = resource.retailer.stock - (resource.retailer.incomingOrder + resource.retailer.backlog)

    if (amount < 0) {
        if (resource.round & 1) resource.retailer.sendNew = resource.retailer.stock
        resource.retailer.stock = 0
    } else {

    }

    resource.retailer.stock += resource.retailer.receive

    // resource.wholesaler.incomingOrder = resource.reatailer.outgoingOrder

    // getIncomingOrder(resource.wholesaler.incomingOrder)

    // let amount = resource.wholesaler.stock - (resource.wholesaler.incomingOrder + resource.wholesaler.backlog)

    // if (amount < 0) {
    //     resource.wholesaler.backlog = Math.abs(amount)
    //     resource.wholesaler.send
    //     resource.wholesaler.stock = 0
    // } else {
    //     resource.wholesaler.backlog = 0
    //     resource.wholesaler.stock = amount
    // }

    // if (resource.round & 1) { // odd

    // } else { // even

    // }

}

module.exports = {
    createResource,
    setOutgoingOrder
}

