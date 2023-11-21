import crypto from 'crypto'

function part1(input: string) {
  const password: string[] = []
  let i = 0
  while (password.length < 8) {
    const hash = crypto.createHash('md5')
    const hashed = hash.update(`${input}${i}`).digest('hex')

    if (hashed.startsWith('00000')) {
      password.push(hashed[5])
    }

    i++
  }

  return password.join('')
}

function containsNulls(password: Array<string | null>) {
  return password.some((char) => char === null)
}

function part2(input: string) {
  const password: Array<string | null> = [null, null, null, null, null, null, null, null]
  let i = 0
  while (containsNulls(password)) {
    const hash = crypto.createHash('md5')
    const hashed = hash.update(`${input}${i}`).digest('hex')

    if (hashed.startsWith('00000')) {
      const position = parseInt(hashed[5])
      if (position >= 0 && position <= 7 && password[position] === null) {
          console.log({ position, char: hashed[6] })
          password[position] = hashed[6]
      }
    }

    i++
  }

  return password.join('')
}

function main() {
  const input = "ojvtpuvg"
  
  const part1Answer = part1(input)
  console.log('Part 1 answer: ', part1Answer)
  
  const part2Answer = part2(input)
  console.log('Part 2 answer: ', part2Answer)
}

main()