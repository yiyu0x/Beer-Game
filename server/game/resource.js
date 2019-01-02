
const createResource = () => {
    return {
        round: 0,
        cache: 0,
        cost: 0,
        retailer: {
            stock: 15,
            backlog: 0,
            incomingOrder: 0,
            outgoingOrder: [],
        },
        wholesaler: {
            stock: 15,
            backlog: 0,
            incomingOrder: 0,
            outgoingOrder: [],
        },
        distributer: {
            stock: 15,
            backlog: 0,
            incomingOrder: 0,
            outgoingOrder: [],
        },
        manufacturer: {
            stock: 15,
            backlog: 0,
            incomingOrder: 0,
        },
    }
}

module.exports = {
    createResource
}

