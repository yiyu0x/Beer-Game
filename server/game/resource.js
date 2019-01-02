
const createResource = () => {
    return {
        round: 1,
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

const setOutgoingOrder = (role, resource, order) => {
    if (role == 'Manufacturer') {
        console.log('hell no')
    } else if (role == 'Distributer') {
        resource.distributer.outgoingOrder.push({
            order,
            counter: 0
        })
    } else if (role == 'Wholesaler') {
        resource.wholesaler.outgoingOrder.push({
            order,
            counter: 0
        })
    } else if (role == 'Retailer') {
        resource.retailer.outgoingOrder.push({
            order,
            counter: 0
        })
    }

    return resource
}

module.exports = {
    createResource,
    setOutgoingOrder
}

