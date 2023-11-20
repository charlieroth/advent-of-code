/**
 * Given a keypad like this:
 * 
 * 1 2 3
 * 4 5 6
 * 7 8 9
 * 
 * And instructions like this:
 * 
 * ULL
 * RRDDD
 * LURDL
 * UUUUD
 * 
 * Starting at 5, what is the code? Record the final number after each instruction.
 * This represents a digit in the code.
 */


function part1(input: string): string {
  const keypad = new Map<string, number>([
    ['0,0', 1],
    ['1,0', 2],
    ['2,0', 3],
    ['0,1', 4],
    ['1,1', 5],
    ['2,1', 6],
    ['0,2', 7],
    ['1,2', 8],
    ['2,2', 9],
  ])

  const instructions = input
    .trim()
    .split('\n')
    .map(instruction => instruction.split(''))
    .map(instruction => instruction.map(step => {
      switch (step) {
        case 'U':
          return [0, -1]
        case 'D':
          return [0, 1]
        case 'L':
          return [-1, 0]
        case 'R':
          return [1, 0]
        default:
          throw new Error(`Invalid step: ${step}`)
      }
    }))

  const digits: number[] = []
  const currentLocation: [number, number] = [1, 1]
  for (const instruction of instructions) {
    for (const step of instruction) {
      const [x, y]: [number, number] = [currentLocation[0] + step[0], currentLocation[1] + step[1]]
      if (keypad.has(`${x},${y}`)) {
        currentLocation[0] = x
        currentLocation[1] = y
      }
    }
    const [x, y] = currentLocation
    digits.push(keypad.get(`${x},${y}`)!)
  }

  return digits.join('')
}

/**
  | 0 | 1 | 2 | 3 | 4 |
--|-------------------|
0 | _ | _ | 1 | _ | _ |
1 | _ | 2 | 3 | 4 | _ |
2 | 5 | 6 | 7 | 8 | 9 |
3 | _ | A | B | C | _ |
4 | _ | _ | D | _ | _ |
--|-------------------|
 */
function part2(input: string): string {
  const keypad = new Map<string, number | string>([
    [`2,0`, 1],
    [`1,1`, 2],
    [`2,1`, 3],
    [`3,1`, 4],
    [`0,2`, 5],
    [`1,2`, 6],
    [`2,2`, 7],
    [`3,2`, 8],
    [`4,2`, 9],
    [`1,3`, 'A'],
    [`2,3`, 'B'],
    [`3,3`, 'C'],
    [`2,4`, 'D'],
  ])

  const instructions = input
    .trim()
    .split('\n')
    .map(instruction => instruction.split(''))
    .map(instruction => instruction.map(step => {
      switch (step) {
        case 'U':
          return [0, -1]
        case 'D':
          return [0, 1]
        case 'L':
          return [-1, 0]
        case 'R':
          return [1, 0]
        default:
          throw new Error(`Invalid step: ${step}`)
      }
    }))

  const digits: Array<number | string> = []
  const currentLocation: [number, number] = [0, 2]
  for (const instruction of instructions) {
    for (const step of instruction) {
      const [x, y]: [number, number] = [currentLocation[0] + step[0], currentLocation[1] + step[1]]
      if (keypad.has(`${x},${y}`)) {
        currentLocation[0] = x
        currentLocation[1] = y
      }
    }
    const [x, y] = currentLocation
    digits.push(keypad.get(`${x},${y}`)!)
  }

  return digits.join('')
}

const testInput = `
ULL
RRDDD
LURDL
UUUUD
`

const input = `
DULUDRDDDRLUDURUUULRRRURDRDULRUDDUDRULUDDUDRLDULRRLRDRUDUUULUUDLRURDUDDDDRDLLLLULRDLDRDLRLULRUURDDUULUDLRURRDDRDDRDDLDRDLLUURDRUULRRURURRDLRLLLUDULULULULUDRLLRUDUURLDRLRLRDRRDRLLLDURRDULDURDDRLURRDURLRRRLDLLLDRUUURLRDLDLLLLRDURRLDLULRLDDLDLURLRRDDRUDDUULRURRUDLRDLDUURDDDDRLRURUDULUDLRRLLLLLRDRURLLDLDULUUDLUDDDRLLDRRUDLLURRUUDDRRLLRRLDDDURLDRDRLURRRRDRRRDDUDULULDURRUUURRRDULUUUDDRULDRLLRDLDURLURRLLRUUUULRDURLLDDRLLDLRLRULUUDRURUDLLURUDDRDURLRDRRRDURLDDRDRLRLLURULUUULUDDDULDLRDDDRDLLRRLDRDULLUUUDLDDLDDDLLLLLLLDUDURURDURDRUURRRDDRDUDLULDURDUDURDDDRULDURURURRLURLURLUURLULDLLRUULURDDRLRDDLRDLRRR
LUURLRUDRRUDLLDLUDDURULURLUUDUUDDRLUULRDUDDUULDUUDRURDDRRDRLULLRDRDLRLLUURRUULRLDRULUDLDUUDDDRDDLRDLULDRLDUULDLRDLLLDLDLRDUULUDURRULLRLDUDRLLLULUUUULUUDUUURRRDULLUURUDRRLDURRUULDRDULDUDRDUUULUUDDRLUDRLDLDRUUURDLDUDRUDUURLLRRLRLLRRLDULDDULUDUUURULDDUDUDRURRDLULRUDDURDLDLLRRRLDRLULLLRUULDUDLUUDURRLLLRLUDURRDDLDRDDDLURDLDRRUDUDLUDULULRUUUDLUURLLRLDDLURULDURDLRRDDDDURLDDLLDDULLLRLDLDULDUUDDRLDUURDDLDLUUDULRRLRLUURURUURLRLURUURLDRUURLLRDDUUUDULUDDDRDRLDRDRRLRLDULLRRUDLURULULRDRURURLULDUDLRURLRDDRULDDLRD
LUDRULUULRRDDDDRRDUURUDDRLDDLDRDURRURULRDLDLDUUDRRDUUDUDLLLRRLDUDDRLDDLRRLRDRLUDLULUDDUUDULDUUULUDLDDURLDURUDLDRUUDRLRRLDLDDULDUUDDLDDLLURDRLRUURDDRUDDUDLDRRLRUDRUULRRRLRULULURDLRRURDRLRULDDDRDUULLURUUUURUDDLRRRRRDURLULDLUULUDRRUDUDRRDDRURDURLRLUDDLDLRRULUDLDDRLDDLDDDLLLLRDLLUULDDLULDLDRDDUDLURUDLDLDDRRUUDDDLRLLLDRRDDDUURDUDURUURRDRLLDUDLDUULLDLDLLUULLRRULDLDRURLDULDRUURDURRURDLRDLLLDRRUDRUUDRURLUDDRURLDURRDLUUDLUUDULLLDDDDRRDLLLDLURULDDRDLUUURRDRRUUDDUL
DUUULDUDDDURLLULDDLLUDURLLLURULULURUURDRURLRULLLLDRDDULRRDRRLLLRDDDUULLRRURRULLDDURRRLRDDLULDULLDUDLURRDLDDLURDLRLLDRURLLRLLRRRDRRRURURUUDDLLDDLDDDLRLURUUUULRDLUDDDURLLDDRLDRRLLUDUUULRLLDRRRLRUUDLDUULRLUDRULLLLDUDLLUUDDRUURLURUDRDDDLRURUDRLULLULUUDLDURDULRRDRLDURUULRDRRRDRDRRLRLRDDUULLRDLDURDDDULURRLULDDURDURDDUDURDLLUUULUDULRDDLDRDRUDLLUURDLRDURURULURULLDRLLRRULDLULULDLULRURLRRLUDLLLRLUDLURLULDULDRLLLDLDDDDRDRLRRLRDULUUDULDDLDURDLLLDDDDLLUURRDURLDLUDDLULRUUUDDRRLDLLLRDLLDRRRDDLULLURDDRRRRLDLRLLLRL
LULLRRDURRLDUUDRRURLURURRRLRDRUULUULURLLURRDRULRDURDDDDUULLLLDUULDLULURDRLDLULULDRLLDLLRLRULURUDRUUDULRULLLUDRULUDRLLUDLDRRDRUUURURLRDURDRLRDDDURLURRDLRUUUDUURULULDLUULRDLRRRDRDRLLLDLRRDRLLDDULDRUDRRLULLRDLDUDDULRDDLULRURULRLLLULDLLLLRDLDRURUDUURURLDRLUULLDUDULUDDDULUDLRUDDUDLULLUULUUURULURRULRDDURDDLURLRRDRDLDULRLRDRRRULRDDDRLLDDDDRRRRDRDLULUURDURULDLRDULDUDLDURUDLUDLUDDDUDURDURDDURLLRUDUURRRUDRRRRULLLLDDDLUULLUULRRRULDLURDLULRULDRLR
`

const part1Answer = part1(input)
console.log(`Part 1 Answer: ${part1Answer}`)

const part2Answer = part2(input)
console.log(`Part 2 Answer: ${part2Answer}`)