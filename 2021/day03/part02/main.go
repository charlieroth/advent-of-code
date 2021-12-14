package main

import (
  "fmt"
  "os"
  "bufio"
  "log"
  "math"
)

func readFile(path string) map[string]bool {
  file, err := os.Open(path)
  if err != nil {
    log.Fatal(err)
  }
  defer file.Close()

  m := make(map[string]bool)
  scanner := bufio.NewScanner(file)
  for scanner.Scan() {
    line := scanner.Text()
    m[line] = true
  }

  return m
}

func mostCommonBitByPosition(position int, numMap map[string]bool) {

}

func main() {
  numMap := readFile("example.txt")

  currPosition := 0
  alive := len(numMap)

  for alive > 1 {
    // TODO: Find most common bit in current position evaluating
    // TODO: Remove numbers without most common bit in current position
    // TODO: Update alive count
  }
}

