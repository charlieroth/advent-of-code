package main

import (
  "fmt"
  "os"
  "bufio"
  "log"
  "strconv"
  "math"
)

func readFile(path string) []string {
  file, err := os.Open(path)
  if err != nil {
    log.Fatal(err)
  }
  defer file.Close()

  var nums []string
  scanner := bufio.NewScanner(file)
  for scanner.Scan() {
    line := scanner.Text()
    nums = append(nums, line)
  }

  return nums
}

func createBinary(num string) []int {
  binaryArr := make([]int, len(num))

  for i, bitC := range num {
    bitStr := string(bitC)
    bit, err := strconv.Atoi(bitStr)
    if err != nil {
      log.Fatal(err)
    }
    binaryArr[i] = bit;
  }

  return binaryArr;
}

func binaryArrToDecimal(binary []int) float64 {
  pow := float64(len(binary) - 1)
  decimal := 0.0
  for _, bit := range binary {
    var fBit = float64(bit)
    decimal += fBit * math.Pow(2, pow)
    if pow >= 1.0 { pow -= 1.0 }
  }

  return decimal
}

func mostCommonBitByIndex(nums []string, index int) byte {
  oneCount := 0
  zeroCount := 0
  for _, num := range nums {
    if num[index] == '1' {
      oneCount += 1
    } else {
      zeroCount += 1
    }
  }

  var bitToReturn byte
  if oneCount > zeroCount { bitToReturn = '1' }
  if zeroCount > oneCount { bitToReturn = '0' }
  if zeroCount == oneCount { bitToReturn = '1' }
  return bitToReturn
}

func leastCommonBitByIndex(nums []string, index int) byte {
  oneCount := 0
  zeroCount := 0
  for _, num := range nums {
    if num[index] == '1' {
      oneCount += 1
    } else {
      zeroCount += 1
    }
  }

  var bitToReturn byte
  if oneCount < zeroCount { bitToReturn = '1' }
  if zeroCount < oneCount { bitToReturn = '0' }
  if zeroCount == oneCount { bitToReturn = '0' }
  return bitToReturn
}

func removeByBit(nums []string, index int, bit byte) []string {
  var newNums []string
  for _, num := range nums {
    // If first character is the same as the bit
    if num[index] == bit {
      newNums = append(newNums, num)
    }
  }

  return newNums
}

func getOxygenGeneratorRating() float64 {
  nums := readFile("input.txt")
  index := 0
  alive := len(nums)

  for alive > 1 {
    bit := mostCommonBitByIndex(nums, index)
    nums = removeByBit(nums, index, bit)
    alive = len(nums)
    index += 1
  }
  
  binaryArr := createBinary(nums[0])
  fmt.Println(binaryArr)
  decimal := binaryArrToDecimal(binaryArr)
  return decimal
}

func getCO2ScrubberRating() float64 {
  nums := readFile("input.txt")
  index := 0
  alive := len(nums)

  for alive > 1 {
    bit := leastCommonBitByIndex(nums, index)
    nums = removeByBit(nums, index, bit)
    alive = len(nums)
    index += 1
  }
  
  binaryArr := createBinary(nums[0])
  fmt.Println(binaryArr)
  decimal := binaryArrToDecimal(binaryArr)
  return decimal
}

func main() {
  oxygenGeneratorRating := getOxygenGeneratorRating()
  co2ScrubberRating := getCO2ScrubberRating()
  fmt.Println("result: ", co2ScrubberRating * oxygenGeneratorRating)
}
