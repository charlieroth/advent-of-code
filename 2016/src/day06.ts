import fs from 'fs'

function part1(input: string) {
  const parsedInput = input.trim().split('\n').map((line) => line.trim().split(''))
  const charCount: Record<number, Record<string, number>> = {}
  for (let i = 0; i < parsedInput.length; i++) {
    const line = parsedInput[i]
    for (let j = 0; j < line.length; j++) {
      if (!charCount[j]) {
        charCount[j] = {}
      }

      const char = line[j]

      if (!charCount[j][char]) {
        charCount[j][char] = 0
      }

      charCount[j][char]++
    }
  }

  const errorCorrectedVersion: string[] = []
  for (const charCountObj of Object.values(charCount)) {
    const sorted = Object.entries(charCountObj).sort((a, b) => b[1] - a[1])
    errorCorrectedVersion.push(sorted[0][0])
  }

  return errorCorrectedVersion.join('')
}

function part2(input: string) {
  const parsedInput = input.trim().split('\n').map((line) => line.trim().split(''))
  const charCount: Record<number, Record<string, number>> = {}
  for (let i = 0; i < parsedInput.length; i++) {
    const line = parsedInput[i]
    for (let j = 0; j < line.length; j++) {
      if (!charCount[j]) {
        charCount[j] = {}
      }

      const char = line[j]

      if (!charCount[j][char]) {
        charCount[j][char] = 0
      }

      charCount[j][char]++
    }
  }

  const errorCorrectedVersion: string[] = []
  for (const charCountObj of Object.values(charCount)) {
    const sorted = Object.entries(charCountObj).sort((a, b) => a[1] - b[1])
    errorCorrectedVersion.push(sorted[0][0])
  }

  return errorCorrectedVersion.join('')

}

function main() {
  const testInput = `
  eedadn
  drvtee
  eandsr
  raavrd
  atevrs
  tsrnev
  sdttsa
  rasrtv
  nssdts
  ntnada
  svetve
  tesnvt
  vntsnd
  vrdear
  dvrsen
  enarar
  `

  const input = fs.readFileSync('./inputs/day06.txt', 'utf8').toString()

  // const part1Answer = part1(input)
  // console.log('Part 1 answer: ', part1Answer)

  const part2Answer = part2(input)
  console.log('Part 2 answer: ', part2Answer)
}

main()