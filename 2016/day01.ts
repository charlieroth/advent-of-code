function part1(input: string): number {
    const turnRight = { N: 'E', E: 'S', S: 'W', W: 'N' }
    const turnLeft = { N: 'W', W: 'S', S: 'E', E: 'N' }

    const instructions: [string, number][] = input.split(', ').map((instruction) =>
        [instruction[0], parseInt(instruction.slice(1))]
    )
    let currentDirection: string = 'N'
    let currentPosition: [number, number] = [0, 0]

    for (const [direction, distance] of instructions) {
        if (currentDirection == 'N' && direction == 'R') {
            currentPosition = [currentPosition[0] + distance, currentPosition[1]]
            currentDirection = turnRight[currentDirection]
        } else if (currentDirection == 'N' && direction == 'L') {
            currentPosition = [currentPosition[0] - distance, currentPosition[1]]
            currentDirection = turnLeft[currentDirection]
        } else if (currentDirection == 'E' && direction == 'R') {
            currentPosition = [currentPosition[0], currentPosition[1] - distance]
            currentDirection = turnRight[currentDirection]
        } else if (currentDirection == 'E' && direction == 'L') {
            currentPosition = [currentPosition[0], currentPosition[1] + distance]
            currentDirection = turnLeft[currentDirection]
        } else if (currentDirection == 'S' && direction == 'R') {
            currentPosition = [currentPosition[0] - distance, currentPosition[1]]
            currentDirection = turnRight[currentDirection]
        } else if (currentDirection == 'S' && direction == 'L') {
            currentPosition = [currentPosition[0] + distance, currentPosition[1]]
            currentDirection = turnLeft[currentDirection]
        } else if (currentDirection == 'W' && direction == 'R') {
            currentPosition = [currentPosition[0], currentPosition[1] + distance]
            currentDirection = turnRight[currentDirection]
        } else if (currentDirection == 'W' && direction == 'L') {
            currentPosition = [currentPosition[0], currentPosition[1] - distance]
            currentDirection = turnLeft[currentDirection]
        }
    }

    return Math.abs(currentPosition[0]) + Math.abs(currentPosition[1])
}

function part2(input: string): number {
    const turnRight = {N: 'E', E: 'S', S: 'W', W: 'N'}
    const turnLeft = {N: 'W', W: 'S', S: 'E', E: 'N'}
  
    const instructions: [string, number][] = input.split(', ').map((instruction) =>
        [instruction[0], parseInt(instruction.slice(1))]
    )
    let currentDirection: string = 'N'
    let currentPosition: [number, number] = [0, 0]
    const visited: [number, number][] = []

    for (const [direction, distance] of instructions) {
        if (currentDirection == 'N' && direction == 'R') {
            for (let x = currentPosition[0]; x < currentPosition[0] + distance; x++) {
                visited.push([x, currentPosition[1]])
            }

            currentPosition = [currentPosition[0] + distance, currentPosition[1]]
            currentDirection = turnRight[currentDirection]
        } else if (currentDirection == 'N' && direction == 'L') {
            for (let x = currentPosition[0]; x > currentPosition[0] - distance; x--) {
                visited.push([x, currentPosition[1]])
            }

            currentPosition = [currentPosition[0] - distance, currentPosition[1]]
            currentDirection = turnLeft[currentDirection]
        } else if (currentDirection == 'E' && direction == 'R') {
            for (let y = currentPosition[1]; y > currentPosition[1] - distance; y--) {
                visited.push([currentPosition[0], y])
            }

            currentPosition = [currentPosition[0], currentPosition[1] - distance]
            currentDirection = turnRight[currentDirection]
        } else if (currentDirection == 'E' && direction == 'L') {
            for (let y = currentPosition[1]; y < currentPosition[1] + distance; y++) {
                visited.push([currentPosition[0], y])
            }

            currentPosition = [currentPosition[0], currentPosition[1] + distance]
            currentDirection = turnLeft[currentDirection]
        } else if (currentDirection == 'S' && direction == 'R') {
            for (let x = currentPosition[0]; x > currentPosition[0] - distance; x--) {
                visited.push([x, currentPosition[1]])
            }

            currentPosition = [currentPosition[0] - distance, currentPosition[1]]
            currentDirection = turnRight[currentDirection]
        } else if (currentDirection == 'S' && direction == 'L') {
            for (let x = currentPosition[0]; x < currentPosition[0] + distance; x++) {
                visited.push([x, currentPosition[1]])
            }

            currentPosition = [currentPosition[0] + distance, currentPosition[1]]
            currentDirection = turnLeft[currentDirection]
        } else if (currentDirection == 'W' && direction == 'R') {
            for (let y = currentPosition[1]; y < currentPosition[1] + distance; y++) {
                visited.push([currentPosition[0], y])
            }

            currentPosition = [currentPosition[0], currentPosition[1] + distance]
            currentDirection = turnRight[currentDirection]
        } else if (currentDirection == 'W' && direction == 'L') {
            for (let y = currentPosition[1]; y > currentPosition[1] - distance; y--) {
                visited.push([currentPosition[0], y])
            }

            currentPosition = [currentPosition[0], currentPosition[1] - distance]
            currentDirection = turnLeft[currentDirection]
        }
    }

    for (let i = 0; i < visited.length; i++) {
        const [x1, y1] = visited[i]
        for (let j = 0; j < visited.length; j++) {
            if (i === j) continue

            const [x2, y2] = visited[j]
            if (x1 === x2 && y1 === y2) {
                return Math.abs(x1) + Math.abs(y1)
            }
        }
    }

    throw new Error('Failed to find match')
}

const input = `R1, L4, L5, L5, R2, R2, L1, L1, R2, L3, R4, R3, R2, L4, L2, R5, L1, R5, L5, L2, L3, L1, R1, R4, R5, L3, R2, L4, L5, R1, R2, L3, R3, L3, L1, L2, R5, R4, R5, L5, R1, L190, L3, L3, R3, R4, R47, L3, R5, R79, R5, R3, R1, L4, L3, L2, R194, L2, R1, L2, L2, R4, L5, L5, R1, R1, L1, L3, L2, R5, L3, L3, R4, R1, R5, L4, R3, R1, L1, L2, R4, R1, L2, R4, R4, L5, R3, L5, L3, R1, R1, L3, L1, L1, L3, L4, L1, L2, R1, L5, L3, R2, L5, L3, R5, R3, L4, L2, R2, R4, R4, L4, R5, L1, L3, R3, R4, R4, L5, R4, R2, L3, R4, R2, R1, R2, L4, L2, R2, L5, L5, L3, R5, L5, L1, R4, L1, R1, L1, R4, L5, L3, R4, R1, L3, R4, R1, L3, L1, R1, R2, L4, L2, R1, L5, L4, L5`

const part1Answer = part1(input)
const part2Answer = part2(input)

console.log(`Part 1 Answer: ${part1Answer}`)
console.log(`Part 2 Answer: ${part2Answer}`)