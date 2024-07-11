input = """1721
979
366
299
675
1456"""


def get_input(test: bool = False) -> list[str]:
    if test:
        return input.split("\n")
    with open("input.txt", "r") as file:
        return file.read().split("\n")


def part_one(lines: list[str]) -> int:
    digits = [int(line) for line in lines]
    for digit in digits:
        for other_digit in digits:
            if digit + other_digit == 2020:
                return digit * other_digit

    return 0


def part_two(lines: list[str]) -> int:
    digits = [int(line) for line in lines]
    for digit in digits:
        for digit2 in digits:
            for digit3 in digits:
                if digit + digit2 + digit3 == 2020:
                    return digit * digit2 * digit3

    return 0


def main(lines: list[str]):
    part_one_solution = part_one(lines)
    print(f"Part 1 solution: {part_one_solution}")
    part_two_solution = part_two(lines)
    print(f"Part 2 solution: {part_two_solution}")


if __name__ == "__main__":
    lines = get_input(test=False)
    main(lines)
