
const createResource = () => {
    return {
        retailer: {
            stock: 15,
            backlog: 0,
            inOrder: 0,
            outOrder: 0,
            counter: 2,
        },
        wholesaler: {
            stock: 15,
            backlog: 0,
            inOrder: 0,
            outOrder: 0,
            counter: 2,
        },
        distributer: {
            stock: 15,
            backlog: 0,
            inOrder: 0,
            outOrder: 0,
            counter: 2,
        },
        manufacturer: {
            stock: 15,
            backlog: 0,
            inOrder: 0,
            counter: 2,
        },
    }
}

module.exports = {
    createResource
}

