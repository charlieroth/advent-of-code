package main

import (
  "fmt"
  "os"
  "bufio"
  "log"
  "strings"
  "strconv"
)

type Instruction struct {
  Command string
  Value int
}

func readFile(path string) []Instruction {
  file, err := os.Open(path)
  if err != nil {
    log.Fatal(err)
  }
  defer file.Close()

  var instructions []Instruction
  scanner := bufio.NewScanner(file)
  for scanner.Scan() {
    line := scanner.Text()
    instructionStr := strings.Split(line, " ")

    cmd := instructionStr[0]
    val, err := strconv.Atoi(instructionStr[1])
    if err != nil { log.Fatal(err) }

    instruction := Instruction{cmd, val}
    instructions = append(instructions, instruction)
  }

  return instructions
}

func main() {
  // instructions := readFile("example.txt")
  instructions := readFile("input.txt")

  horz := 0
  depth := 0
  for _, instruction := range instructions {
    switch instruction.Command {
      case "forward":
        horz = horz + instruction.Value
      case "up":
        depth = depth - instruction.Value
      case "down":
        depth = depth + instruction.Value
    }
  }

  fmt.Printf("result: %d\n", horz * depth)
}
