module.exports = function (http) {
  const io = require('socket.io')(http)
  const rooms = []
  const inRooms = {}
  const queue = []
  let roomNumber = 1
  let isQueuying = false
  io.on('connection', function (socket) {
    socket.on('requestJoin', (type, name) => {
      queue.push({
        socket, type, name
      })
      if(!isQueuying) {
        isQueuying = true
        joinFromQueue()
      }
    })

    socket.on('disconnect', () => {
      let idx = rooms.map(el => el.name).indexOf(inRooms[socket.id])
      if(idx != -1) {
        rooms[idx].users.splice(rooms[idx].users.map(el => el.socket.id).indexOf(socket.id), 1)
        clearTimeout(rooms[idx].timer)
        clearInterval(rooms[idx].coutdownInterval)
        if(rooms[idx].users.length > 0) {
          io.to(rooms[idx].name).emit('oppDisconnected')
        } else {
          rooms.splice(idx, 1)
        }
      }
    })

    socket.on('gh-hap', () => {
      let idx = rooms.map(el => el.name).indexOf(inRooms[socket.id])
      if(idx != -1) {
        io.to(rooms[idx].name).emit('gh-hap')
        clearTimeout(rooms[idx].timer)
        rooms[idx].timer = setTimeout(() => { nextTurn(idx) }, 5000)
      }
    })

    socket.on('gh-hap-el', h => {
      let idx = rooms.map(el => el.name).indexOf(inRooms[socket.id])
      if(idx != -1) {
        io.to(rooms[idx].name).emit('gh-hap-el', h)
      }
    })

    socket.on('gh-hap-verify', arr => {
      let idx = rooms.map(el => el.name).indexOf(inRooms[socket.id])
      if(idx != -1) {
        clearTimeout(rooms[idx].timer)
        let checked = arr.map(el => rooms[idx].board[el]).sort()
        if(checked.length == 3) {
          if(checked.map(el => el[0]).reduce((a,b) => a + b, 0) % 3 == 0
          && checked.map(el => el[2]).reduce((a,b) => a + b, 0) % 3 == 0
          && checked.map(el => el[1]).reduce((a,b) => a + b, 0) % 3 == 0
          && rooms[idx].currentHapList.map(el => el.join('')).indexOf(checked.join('')) == -1) {
            rooms[idx].currentHapList.unshift(checked)
            io.to(rooms[idx].name).emit('gh-update-hap-list', checked)
            let i = rooms[idx].users.map(el => el.socket.id).indexOf(socket.id)
            if(i != -1) rooms[idx].score[i] ++
          } else {
            let i = rooms[idx].users.map(el => el.socket.id).indexOf(socket.id)
            if(i != -1) rooms[idx].score[i] --
            if(rooms[idx].score[i] < 0) rooms[idx].score[i] = 0
          }
        }
        io.to(rooms[idx].name).emit('update-score', {users: rooms[idx].users.map(el => el.socket.id), score: rooms[idx].score})
        rooms[idx].timer = setTimeout(() => { nextTurn(idx) }, 2000)
      }
    })

    socket.on('gh-gyul', () => {
      let idx = rooms.map(el => el.name).indexOf(inRooms[socket.id])
      if(idx != -1) {
        io.to(rooms[idx].name).emit('gh-gyul')

        if(rooms[idx].currentHapList.length == rooms[idx].totalHapList.length) {
          clearTimeout(rooms[idx].timer)
          let i = rooms[idx].users.map(el => el.socket.id).indexOf(socket.id)
          if(i != -1) rooms[idx].score[i] += 3
          io.to(rooms[idx].name).emit('update-score', {users: rooms[idx].users.map(el => el.socket.id), score: rooms[idx].score})
          if(rooms[idx].round < 5) {
            rooms[idx].round ++
            io.to(rooms[idx].name).emit('update-round', rooms[idx].round)
            let count = 3
            io.to(rooms[idx].name).emit('countdownStart', {countdown: count --})
            rooms[idx].coutdownInterval = setInterval(() => {
              if(count == 0) {
                doGame(idx)
                clearInterval(rooms[idx].coutdownInterval)
              } else {
                io.to(rooms[idx].name).emit('countdownStart', {countdown: count --})
              }
            }, 1000)
          } else {
            io.to(rooms[idx].name).emit('update-score', {users: rooms[idx].users.map(el => el.socket.id), score: rooms[idx].score})
            io.to(rooms[idx].name).emit('gameover')
          }
        } else {
          let i = rooms[idx].users.map(el => el.socket.id).indexOf(socket.id)
          if(i != -1) rooms[idx].score[i] --
          if(rooms[idx].score[i] < 0) rooms[idx].score[i] = 0
          io.to(rooms[idx].name).emit('update-score', {users: rooms[idx].users.map(el => el.socket.id), score: rooms[idx].score})
          clearTimeout(rooms[idx].timer)
          rooms[idx].timer = setTimeout(() => { nextTurn(idx) }, 2000)
        }
      }
    })
  })

  function joinFromQueue() {
    let el = queue.shift()

    if(el) {
      let waitingRoom = rooms.filter(el => el && el.users.length == 1)
      if(waitingRoom.length > 0) {
        el.socket.join(waitingRoom[0].name, () => {
          let curRoom = rooms.map(el => el.name).indexOf(waitingRoom[0].name)
          rooms[curRoom].users.push(el)
          inRooms[el.socket.id] = rooms[curRoom].name
          io.to(rooms[curRoom].name).emit('responseJoin', {room: rooms[curRoom].name, users: rooms[curRoom].users.map(el => { return {name: el.name, socketId: el.socket.id}})})
          let i = 3
          io.to(rooms[curRoom].name).emit('countdownStart', {countdown: i--})
          rooms[curRoom].coutdownInterval = setInterval(() => {
            if(i == 0) {
              doGame(curRoom)
              clearInterval(rooms[curRoom].coutdownInterval)
            } else {
              io.to(rooms[curRoom].name).emit('countdownStart', {countdown: i--})
            }
          }, 1000)
          joinFromQueue()
        })
      } else {
        rooms.push({
          name: (el.type + '_' + roomNumber++),
          users: [el],
          score: [0, 0],
          round: 1,
        })
        let roomData = rooms[rooms.length - 1]
        el.socket.join(roomData.name, () => {
          inRooms[el.socket.id] = roomData.name
          io.to(roomData.name).emit('responseJoin', {room: roomData.name, users: roomData.users.map(el => { return {name: el.name, socketId: el.socket.id}})})
          joinFromQueue()
        })
      }
    } else {
      isQueuying = false
    }
  }

  function doGame(number) {
    let {board, totalHapList} = generateBoard()
    rooms[number].board = board
    rooms[number].totalHapList = totalHapList
    rooms[number].currentHapList = []
    rooms[number].turn = 1 - (rooms[number].round % 2)
    io.to(rooms[number].name).emit('start', {turn: rooms[number].users[rooms[number].turn].socket.id, board, totalHapList})
    rooms[number].timer = setTimeout(() => { nextTurn(number) }, 10000)
  }

  function nextTurn(number) {
    if(rooms[number].users[1 - rooms[number].turn]) {
      rooms[number].turn = 1 - rooms[number].turn
      io.to(rooms[number].name).emit('turn', {turn: rooms[number].users[rooms[number].turn].socket.id})
      rooms[number].timer = setTimeout(() => { nextTurn(number) }, 10000)
    }
  }

  function generateBoard() {
    let board = []
    let tmp = []
    let totalHapList = []
    for(let i=0;i<3;i++) {
      for(let j=0;j<3;j++) {
        for(let k=0;k<3;k++) {
          tmp.push('' + i + j + k)
        }
      }
    }
    for(let i=0;i<9;i++) {
      board[i] = tmp.splice(Math.floor(Math.random() * tmp.length),1)[0]
    }
    for(let i=0;i<9;i++) {
      for(let j=0;j<9;j++) {
        for(let k=0;k<9;k++) {
          if(i != j && j != k && i != k) {
            let arr = [board[i], board[j], board[k]]
            if(arr.map(el => el[0]).reduce((a,b) => a + b, 0) % 3 == 0
            && arr.map(el => el[2]).reduce((a,b) => a + b, 0) % 3 == 0
            && arr.map(el => el[1]).reduce((a,b) => a + b, 0) % 3 == 0
            && totalHapList.map(el => el.join('/')).indexOf(arr.sort().join('/')) == -1) {
              totalHapList.unshift(arr.sort())
            }
          }
        }
      }
    }
    return {board, totalHapList}
  }
}
