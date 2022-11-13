package main

import (
  "fmt"
  "os"
  "bufio"
  "log"
  "strconv"
)

func readFile(path string) []int {
  file, err := os.Open(path)
  if err != nil {
    log.Fatal(err)
  }
  defer file.Close()

  var nums []int
  scanner := bufio.NewScanner(file)
  for scanner.Scan() {
    txt := scanner.Text()
    if txt == "" { continue }
    num, err := strconv.Atoi(txt)
    if err != nil {
      log.Fatal(err)
    }
    nums = append(nums, num)
  }

  return nums
}

func main() {
  nums := readFile("input.txt")

  last := nums[0]
  increments := 0
  for _, n := range nums {
    if n > last { increments++ }
    last = n
  }

  fmt.Printf("result: %d\n", increments);
}
