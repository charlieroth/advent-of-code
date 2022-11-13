package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
)

var numLength = 12

func readFile(path string) []string {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, line)
	}

	return lines
}

func getPositionCounts(lines []string) []int {
	counts := make([]int, numLength)

	for _, line := range lines {
		for i, c := range line {
			switch c {
			case '1':
				counts[i] += 1
			case '0':
				counts[i] -= 1
			}
		}
	}

	return counts
}

func createBinaries(counts []int) ([]int, []int) {
	gammaBits := make([]int, numLength)
	epsilonBits := make([]int, numLength)

	for i, count := range counts {
		if count > 0 {
			gammaBits[i] = 1
		} else {
			epsilonBits[i] = 1
		}
	}

	return gammaBits, epsilonBits
}

func binaryArrToDecimal(binary []int) float64 {
	pow := float64(numLength - 1)
	decimal := 0.0
	for _, bit := range binary {
		var fBit = float64(bit)
		decimal += fBit * math.Pow(2, pow)
		if pow >= 1.0 {
			pow -= 1.0
		}
	}

	return decimal
}

func main() {
	// lines := readFile("example.txt")
	lines := readFile("input.txt")

	counts := getPositionCounts(lines)

	gammaBits, epsilonBits := createBinaries(counts)

	gamma := binaryArrToDecimal(gammaBits)
	epsilon := binaryArrToDecimal(epsilonBits)

	fmt.Printf("result: %d\n", int(gamma*epsilon))
}
