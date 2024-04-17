#include <string>
#include <vector>
#include <iostream>
#include <fstream>
#include <sstream>
#include <memory>

std::string TrimString(const std::string &str) {
    auto view = std::string_view(str);
    // Find first non-space character
    auto it = std::find_if(view.begin(), view.end(), [](char c) { return !std::isspace(c); });
    // Find last non-space character
    auto it2 = std::find_if(view.rbegin(), view.rend(), [](char c) { return !std::isspace(c); });
    // If no non-space characters, return empty string
    if (it == view.end() || it2 == view.rend()) {
        return "";
    }
    return std::string(it, it2.base());
}

std::vector<std::string> Split(std::string str, char delim) {
    std::vector<std::string> strings;
    int start = 0;
    int end = 0;
    for (auto i = 0; i <= str.size(); ++i) {
        if (str[i] == delim || i == str.size()) {
            end = i;
            std::string temp;
            temp.append(str, start, end - start);
            strings.push_back(temp);
            start = end + 1;
        }
    }
    return strings;
}


struct CubeSet {
    int reds;
    int greens;
    int blues;
};

CubeSet CubeSetFrom(const std::string &line) {
    // line = "4 red, 2 green, 3 blue"
    CubeSet cube_set = {0, 0, 0};
    std::vector<std::string> items;
    std::stringstream ss(line);
    // Split by ","
    std::string token;
    while (std::getline(ss, token, ',')) {
        items.push_back(token);
    }
    // Process each item
    for (const std::string &item : items) {
        std::istringstream iss(item);
        int quantity;
        std::string color;
        // Attempt to read an integer from stream, then a string from stream
        // If either fails this is an invalid item format
        if (iss >> quantity >> color) {
            if (color == "red") {
                cube_set.reds = quantity;
            } else if (color == "green") {
                cube_set.greens = quantity;
            } else if (color == "blue") {
                cube_set.blues = quantity;
            }
        } else {
            throw std::runtime_error("Invalid item format");
        }
    }
    return cube_set;
}

class Game {
public:
    int id;
    std::vector<CubeSet> cubes;

    bool IsPossible() {
        int min_reds = 0, min_greens = 0, min_blues = 0;
        for (const auto &cube : cubes) {
            if (cube.reds > min_reds) min_reds = cube.reds;
            if (cube.greens > min_greens) min_greens = cube.greens;
            if (cube.blues > min_blues) min_blues = cube.blues;
        }
        return min_reds <= 12 && min_greens <= 13 && min_blues <= 14;
    }
    
    int PowerOf() {
        int min_reds = 0, min_greens = 0, min_blues = 0;
        for (const auto &cube : cubes) {
            if (cube.reds > min_reds) min_reds = cube.reds;
            if (cube.greens > min_greens) min_greens = cube.greens;
            if (cube.blues > min_blues) min_blues = cube.blues;
        }
        return min_reds * min_greens * min_blues;
    }
};



Game GameFrom(std::string line) {
    Game game;
    std::string game_id_str = TrimString(line.substr(0, line.find(": ")));
    std::string id_str = TrimString(game_id_str.substr(game_id_str.find(" ") + 1, game_id_str.length()));
    int id = std::stoi(id_str);
    game.id = id;

    std::string game_str = TrimString(line.substr(line.find(": ") + 2, line.length()));
    std::vector<std::string> cube_set_strs = Split(game_str, ';');
    for (auto cube_set_str : cube_set_strs) {
        std::string cube_set_str_trimmed = TrimString(cube_set_str);
        CubeSet cube_set = CubeSetFrom(cube_set_str);
        game.cubes.push_back(cube_set);
    }
    return game;
}


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

int PartOne(std::vector<std::string> lines) {
    int answer = 0;
    for (auto line : lines) {
        Game game = GameFrom(line);
        if (game.IsPossible()) {
            answer += game.id;
        }
    }
    return answer;
}

int PartTwo(std::vector<std::string> lines) {
    int answer = 0;
    for (auto line : lines) {
        Game game = GameFrom(line);
        answer += game.PowerOf();
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
