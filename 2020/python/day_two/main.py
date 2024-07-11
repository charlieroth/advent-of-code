input = """1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc"""


class PasswordPartOne:
    min: int
    max: int
    letter: str
    password: str

    def __init__(self, min: int, max: int, letter: str, password: str):
        self.min = min
        self.max = max
        self.letter = letter
        self.password = password

    def occurences_of_letter(self) -> int:
        return self.password.count(self.letter)


class PasswordPartTwo:
    p1: int
    p2: int
    letter: str
    password: str

    def __init__(self, p1: int, p2: int, letter: str, password: str):
        self.p1 = p1
        self.p2 = p2
        self.letter = letter
        self.password = password

    def __repr__(self) -> str:
        return f"PasswordPartTwo(p1={self.p1}, p2={self.p2}, letter={self.letter}, password={self.password})"

    def valid(self) -> bool:
        if (
            self.password[self.p1] == self.letter
            and self.password[self.p2] != self.letter
        ):
            return True
        elif (
            self.password[self.p1] != self.letter
            and self.password[self.p2] == self.letter
        ):
            return True
        else:
            return False


def get_input(test: bool = False) -> list[str]:
    if test:
        return input.split("\n")
    with open("input.txt", "r") as file:
        return file.read().split("\n")


def part_one_parse_lines(lines: list[str]) -> list[PasswordPartOne]:
    passwords: list[PasswordPartOne] = []
    for line in lines:
        min_max_letter, password = [part.strip() for part in line.split(":")]
        min_max, letter = min_max_letter.split(" ")
        min, max = [int(part) for part in min_max.split("-")]
        passwords.append(PasswordPartOne(min, max, letter, password))

    return passwords


def part_two_parse_lines(lines: list[str]) -> list[PasswordPartTwo]:
    passwords: list[PasswordPartTwo] = []
    for line in lines:
        p1_p2_letter, password = [part.strip() for part in line.split(":")]
        p1_p2, letter = p1_p2_letter.split(" ")
        p1, p2 = [int(part) - 1 for part in p1_p2.split("-")]
        passwords.append(PasswordPartTwo(p1, p2, letter, password))

    return passwords


def part_one(lines: list[str]) -> int:
    num_valid_passwords = 0
    passwords = part_one_parse_lines(lines)
    for password in passwords:
        if password.occurences_of_letter() in range(password.min, password.max + 1):
            num_valid_passwords += 1

    return num_valid_passwords


def part_two(lines: list[str]) -> int:
    num_valid_passwords = 0
    passwords = part_two_parse_lines(lines)
    for p in passwords:
        if p.valid():
            num_valid_passwords += 1
    return num_valid_passwords


def main(lines: list[str]):
    part_one_solution = part_one(lines)
    print(f"Part 1 solution: {part_one_solution}")
    part_two_solution = part_two(lines)
    print(f"Part 2 solution: {part_two_solution}")


if __name__ == "__main__":
    lines = get_input(test=False)
    main(lines)
