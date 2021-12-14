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
  // nums := readFile("example.txt")
  nums := readFile("input.txt")

  // initial window
  window := [3]int{ nums[0], nums[1], nums[2] }

  inc := 0
  prev := window[0] + window[1] + window[2]
  for i := 3; i < len(nums); i++ {
    // shift window
    window[0] = window[1]
    window[1] = window[2]
    window[2] = nums[i]

    // current window sum
    curr := window[0] + window[1] + window[2]
    if curr > prev { inc++ }
    
    prev = curr
  }

  fmt.Printf("result: %d\n", inc)
}

