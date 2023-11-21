import fs from 'fs'

function part1(input: string) {
  const rooms = input
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .map((room) => {
      const [roomName, checksum] = room.split('[')
      return {
        roomName,
        checksum: checksum.slice(0, -1),
      }
    })
    .map(({ roomName, checksum }) => {
      const splitRoomName = roomName.split('-')
      const sectorId = splitRoomName.pop()
      return { 
        roomName: splitRoomName, 
        sectorId: +sectorId!, 
        checksum
      }
    })
    .map(({ roomName, sectorId, checksum }) => {
      const charCount: Record<string, number> = {}
      for (const part of roomName) {
        for (const ch of part.split('')) {
          if (charCount[ch]) {
            charCount[ch] += 1
          } else {
            charCount[ch] = 1
          }
        }
      }

      return { roomName, sectorId, checksum, charCount }
    })
    .map(({ roomName, sectorId, checksum, charCount }) => {
      return {
        roomName,
        sectorId,
        checksum,
        decodedChecksum: Object.entries<number>(charCount)
          .sort((a, b) => {
            if (a[1] > b[1]) {
              return -1
            } else if (a[1] < b[1]) {
              return 1
            } else {
              return a[0] < b[0] ? -1 : 1
            }
          })
          .map((entry) => entry[0])
          .slice(0, 5)
          .join('')
      }
    })
    .filter(({checksum, decodedChecksum}) => checksum === decodedChecksum)
    .reduce((acc, { sectorId }) => {
      return acc + sectorId
    }, 0)
  return rooms
}

function part2(input: string) {
  const rooms = input
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .map((room) => {
      const [roomName, checksum] = room.split('[')
      return {
        roomName,
        checksum: checksum.slice(0, -1),
      }
    })
    .map(({ roomName, checksum }) => {
      const splitRoomName = roomName.split('-')
      const sectorId = splitRoomName.pop()
      return { 
        roomName: splitRoomName, 
        sectorId: +sectorId!, 
        checksum
      }
    })
    .map(({ roomName, sectorId, checksum }) => {
      const shiftedRoomName = roomName.map((part) => {
        return part.split('').map((ch) => {
          let newCh = ch
          for (let i = 0; i < sectorId; i++) {
            newCh = shiftCharacterForward(newCh)
          }
          return newCh
        }).join('')
      }).join(' ')

      return { roomName: shiftedRoomName, sectorId, checksum }
    })
    .filter(({roomName}) => roomName.includes('north'))

  return rooms
}

function shiftCharacterForward(ch: string) {
  if (ch === 'z') {
    return 'a'
  } else {
    return String.fromCharCode(ch.charCodeAt(0) + 1)
  }
}


function main() {
  const testInput = `
  aaaaa-bbb-z-y-x-123[abxyz]
  a-b-c-d-e-f-g-h-987[abcde]
  not-a-real-room-404[oarel]
  totally-real-room-200[decoy]
  `
  const input = fs.readFileSync('./inputs/day04.txt').toString()

  const part1Answer = part1(input)
  console.log('Part 1 answer: ', part1Answer)

  const part2Answer = part2(input)
  console.log('Part 2 answer: ', part2Answer)
}

main()
