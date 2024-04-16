#include <string>
#include <vector>
#include <iostream>
#include <fstream>
#include <map>

std::vector<std::string> GetLines(std::string path) {
    std::vector<std::string> lines = {};
    std::ifstream file(path);
    if (!file.is_open()) {
        std::cout << "Failed to open file" << std::endl;
        return lines;
    }

    std::string line;
    while (std::getline(file, line)) {
        if (!line.empty()) {
            lines.push_back(line);
        }
    }
    return lines;
}

std::vector<int> PartOneGetDigits(std::string line) {
    std::vector<int> digits = {};
    for (auto c : line) {
        if (isdigit(c)) {
            digits.push_back(c - '0');
        }
    }
    return digits;
}

std::vector<int> PartTwoGetDigits(std::string line) {
    std::map<std::string, int> m{
        {"zero", 0},
        {"one", 1},
        {"two", 2},
        {"three", 3},
        {"four", 4},
        {"five", 5},
        {"six", 6},
        {"seven", 7},
        {"eight", 8},
        {"nine", 9},
    };

    std::vector<int> digits = {};
    for (auto i = 0; i < line.length(); ++i) {
        char c = line[i];
        if (isdigit(c)) {
            digits.push_back(c - '0');
            continue;
        }

        for (auto j = 3; j <= 5; ++j) {
            if (i + j > line.length()) {
                break;
            }

            std::string s = line.substr(i, j);
            if (m.find(s) != m.end()) {
                digits.push_back(m[s]);
            }
        }
    }
    return digits;
}

int PartOne(std::vector<std::string> lines) {
    int answer = 0;
    for (auto line : lines) {
        std::vector<int> digits = PartOneGetDigits(line);
        if (digits.empty()) {
            continue;
        }
        if (digits.size() == 1) {
            int first = digits[0];
            int last = digits[0];
            answer += digits[0] * 10 + digits[0];
        } else {
            answer += digits[0] * 10 + digits[digits.size() - 1];
        }
    }
    return answer;
}

int PartTwo(std::vector<std::string> lines) {
    int answer = 0;
    for (auto line : lines) {
        std::vector<int> digits = PartTwoGetDigits(line);
        if (digits.empty()) {
            continue;
        }
        if (digits.size() == 1) {
            int first = digits[0];
            int last = digits[0];
            answer += digits[0] * 10 + digits[0];
        } else {
            answer += digits[0] * 10 + digits[digits.size() - 1];
        }
    }
    return answer;
}

int main() {
    std::string path = "inputs/input.txt";
    std::vector<std::string> lines = GetLines(path);
    int part_one_answer = PartOne(lines);
    std::cout << "Part One answer: " << part_one_answer << std::endl;
    int part_two_answer = PartTwo(lines);
    std::cout << "Part Two answer: " << part_two_answer << std::endl;
    return 0;
}