use std::fs;

#[derive(Debug, Copy, Clone)]
struct CubeSet {
    reds: u32,
    blues: u32,
    greens: u32,
}

impl CubeSet {
    fn from(cube_set_str: &str) -> Self {
        let mut reds = 0;
        let mut greens = 0;
        let mut blues = 0;

        for cube_str in cube_set_str.split(", ").into_iter() {
            let (amount_str, color_str) = cube_str.split_once(" ").unwrap();
            let amount: u32 = amount_str.parse().unwrap();
            if color_str == "red" {
                reds += amount
            } else if color_str == "blue" {
                blues += amount
            } else if color_str == "green" {
                greens += amount
            }
        }

        CubeSet {
            reds,
            greens,
            blues,
        }
    }
}

#[derive(Debug, Clone)]
struct Game {
    id: u32,
    cube_sets: Vec<CubeSet>,
}

impl Game {
    fn from(line: &str) -> Self {
        let (game_id_str, game_str) = line.split_once(": ").unwrap();
        let (_, id_str) = game_id_str.split_once(" ").unwrap();
        let id: u32 = id_str.parse().unwrap();
        let cube_sets: Vec<CubeSet> = game_str
            .split("; ")
            .map(|cube_set_str| CubeSet::from(cube_set_str))
            .collect();
        return Game { id, cube_sets };
    }

    fn possible(&self) -> bool {
        for cube_set in self.cube_sets.as_slice() {
            if cube_set.reds > 12 || cube_set.greens > 13 || cube_set.blues > 14 {
                return false;
            }
        }
        return true;
    }

    fn fewest_cubes_to_play(&self) -> (u32, u32, u32) {
        let mut fewest_reds: u32 = 0;
        let mut fewest_greens: u32 = 0;
        let mut fewest_blues: u32 = 0;

        for cube_set in self.cube_sets.as_slice() {
            if cube_set.reds > fewest_reds {
                fewest_reds = cube_set.reds;
            }
            if cube_set.greens > fewest_greens {
                fewest_greens = cube_set.greens;
            }
            if cube_set.blues > fewest_blues {
                fewest_blues = cube_set.blues;
            }
        }

        return (fewest_reds, fewest_greens, fewest_blues);
    }
}

fn main() {
    let input_path = "inputs/input.txt";
    let input = fs::read_to_string(input_path).expect("Failed to read input");
    let games: Vec<Game> = input.split("\n").map(|line| Game::from(line)).collect();
    let part_one_answer = part_one(&games);
    let part_two_answer = part_two(&games);
    println!("Part One: {}", part_one_answer);
    println!("Part Two: {}", part_two_answer);
}

fn part_one(games: &Vec<Game>) -> u32 {
    let mut answer: u32 = 0;
    for game in games {
        if game.possible() {
            answer += game.id;
        }
    }
    return answer;
}

fn part_two(games: &Vec<Game>) -> u32 {
    let mut answer: u32 = 0;
    for game in games {
        let (red, green, blue) = game.fewest_cubes_to_play();
        answer += red * green * blue;
    }
    return answer;
}
