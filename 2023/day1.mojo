from collections import List


fn main():
    try:
        var input = open("2023/inputs/day1/input.txt", "r").read()
        var part_one_answer = part_one(input)
        var part_two_answer = part_two(input)
        print("Part one: ", part_one_answer)
        print("Part two: ", part_two_answer)
    except e:
        print(e)


fn part_one(input: String) raises -> Int:
    try:
        var lines = input.split("\n")
        var sum: Int = 0
        for i in range(len(lines)):
            var line = lines[i]
            var digits = part_one_extract_digits(line)
            if len(digits) == 0:
                continue
            elif len(digits) == 1:
                var digit = digits[0]
                sum += 10 * digit + digit
            else:
                var first = digits[0]
                var last = digits.pop_back()
                sum += 10 * first + last
        return sum
    except e:
        raise e


fn part_two(input: String) raises -> Int:
    try:
        var lines = input.split("\n")
        var sum: Int = 0
        for i in range(len(lines)):
            var line = lines[i]
            var digits = part_two_extract_digits(line)
            if len(digits) == 0:
                continue
            elif len(digits) == 1:
                var digit = digits[0]
                sum += 10 * digit + digit
            else:
                var first = digits[0]
                var last = digits.pop_back()
                sum += 10 * first + last
        return sum
    except e:
        raise e


fn part_one_extract_digits(line: String) -> List[Int]:
    var digits = List[Int]()
    for i in range(len(line)):
        var char = ord(line[i])
        if isdigit(char):
            var digit = char - ord("0")
            digits.append(digit)

    return digits


fn part_two_extract_digits(line: String) -> List[Int]:
    var digits = List[Int]()
    for i in range(len(line)):
        var char = ord(line[i])
        if isdigit(char):
            var digit = char - ord("0")
            digits.append(digit)
            continue

        for n in range(3, 6):
            var digit = get_spelled_out_digit(line[i : i + n])
            if digit != -1:
                digits.append(digit)

    return digits


fn get_spelled_out_digit(chars: String) -> Int:
    if chars == "one":
        return 1
    elif chars == "two":
        return 2
    elif chars == "three":
        return 3
    elif chars == "four":
        return 4
    elif chars == "five":
        return 5
    elif chars == "six":
        return 6
    elif chars == "seven":
        return 7
    elif chars == "eight":
        return 8
    elif chars == "nine":
        return 9
    elif chars == "zero":
        return 0
    else:
        return -1
