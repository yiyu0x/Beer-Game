// for gcp
// var socket = io('ws://35.194.134.133:6969') 

var socket = io('ws://localhost:6969', { transports: ['websocket'], upgrade: false })

// For testing
// var roomName = ['Patrick Wallor',
//     'Raymond Taccariello',
//     'Glen Cipolloni',
//     'Saundra Lockery',
//     'Eloy Dreisbach']

socket.on('connect', function () {
    console.log('Established the socket connection!')

    // 發送使用者初始化資訊 ('init', 玩家名字)
    socket.emit('init', 'oliver', function (err) {
        console.log(err)
    })

    // 接收在線人人數和玩家資訊
    socket.on('getOnlineClients', function (data) {
        console.log(data)
    })

    socket.emit('fetchOnlineClients')

    // 1. 發送開房間的資訊         房名
    socket.emit('createRoom', 'hollw', function (err) {
        console.log(err)
    })
    socket.emit('createRoom', 'hollw', function (err) {
        console.log(err)
    })

        // 發送要選擇的角色                 角色
        socket.emit('chooseCharacter', 'retailer')
   
    // 2. 發送想要加入房間的意願, server 會送回目前房間名單
    socket.emit('fetchRoomList')
    
        // 接收目前房間資訊
        socket.on('getRoomList', function (data) {
            console.log(data)
        })

    //     // 發送想要進哪一個房間       房間ID    房間名字
    //     socket.emit('chooseRoom', {roomID, roomName}, function(err) {
    //         console.log(err)
    //     })

    //     // 發送要選擇的角色                 角色
    //     socket.emit('chooseCharacter', 'retailer')
    
    // 接收即時隊友已經選擇的選色
    socket.on('getOccupiedCharacter', function (character) {
        console.log(character)
    })

    // socket.on('startGame', function () {})

    // socket.emit('logout')

})
