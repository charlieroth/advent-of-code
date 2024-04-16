use std::{collections::HashMap, fs};

fn main() {
    let input_path = "inputs/input.txt";
    let input = fs::read_to_string(input_path).expect("Failed to ready input file");
    let part_one_answer = part_one(&input);
    println!("Part One: {}", part_one_answer);
    let part_two_answer = part_two(&input);
    println!("Part Two: {}", part_two_answer);
}

fn part_one(input: &String) -> u32 {
    let mut sum = 0;
    let lines = input.split("\n");
    for line in lines.into_iter() {
        if line.is_empty() {
            continue;
        }

        let digits: Vec<u32> = line
            .chars()
            .filter_map(|c| -> Option<u32> {
                if c.is_ascii_digit() {
                    return c.to_digit(10);
                }

                return None;
            })
            .collect();

        let first = digits.first().unwrap();
        let last = digits.last().unwrap_or(first);
        sum += *first * 10 + *last;
    }
    return sum;
}

fn part_two(input: &String) -> u32 {
    let mapping = [
        ("zero", 0),
        ("one", 1),
        ("two", 2),
        ("three", 3),
        ("four", 4),
        ("five", 5),
        ("six", 6),
        ("seven", 7),
        ("eight", 8),
        ("nine", 9),
    ];
    let map: HashMap<String, u32> = mapping
        .into_iter()
        .map(|(s, i)| (String::from(s), i))
        .collect();

    let mut sum = 0;
    let lines = input.split("\n");
    for line in lines.into_iter() {
        if line.is_empty() {
            continue;
        }

        let digits: Vec<u32> = line
            .chars()
            .enumerate()
            .filter_map(|(idx, c)| -> Option<u32> {
                if c.is_ascii_digit() {
                    return c.to_digit(10);
                }

                for n in 3..=5 {
                    let substr: String = line.chars().skip(idx).take(n).collect();
                    if map.contains_key(&substr) {
                        return Some(*map.get(&substr).unwrap());
                    }
                }

                None
            })
            .collect();

        let first = digits.first().unwrap();
        let last = digits.last().unwrap_or(first);
        sum += *first * 10 + *last;
    }
    return sum;
}
