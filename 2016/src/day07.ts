const insideBrackets = (characters: string) => {
  return characters[0] == '[' && characters[characters.length - 1] == ']'
}

function part1(input: string) {
  const parsedInput = input.trim().split('\n').map((line) => line.trim())
  console.log(parsedInput)

  const supportsTLS: string[] = []

  for (const line of parsedInput) {
    for (let i = 0; i < line.length - 3; i++) {
      const window = line.slice(i, i + 4)
      if (window[i - 1] === '[' || window[i + 4] === ']') {
        if ((window[0] === window[3] && window[1] === window[2])) {
          supportsTLS.push(line)
        }
      }
    }
  }

  return supportsTLS
}

function part2(input: string) {

}

function main() {
  const testInput = `
  abba[mnop]qrst
  abcd[bddb]xyyx
  aaaa[qwer]tyui
  ioxxoj[asdfgh]zxcvbn
  `
  const part1Answer = part1(testInput)
  console.log('Part 1 answer: ', part1Answer)
  
  const part2Answer = part2(testInput)
  console.log('Part 2 answer: ', part2Answer)
}

main()