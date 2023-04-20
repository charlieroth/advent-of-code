const std = @import("std");
const mem = std.mem;
const fmt = std.fmt;
const debug = std.debug;

const input = @embedFile("input.txt");
const test_input =
    \\forward 5
    \\down 5
    \\forward 8
    \\up 3
    \\down 8
    \\forward 2
;

pub fn main() !void {
    var it = mem.tokenize(u8, input, "\n");
    var part_one_solution = try part_one(&it);
    debug.print("part one: {}\n", .{part_one_solution});

    it = mem.tokenize(u8, input, "\n");
    var part_two_solution = try part_two(&it);
    debug.print("part two: {}\n", .{part_two_solution});
}

fn part_one(it: *mem.TokenIterator(u8)) !usize {
    var horizontal_position: usize = 0;
    var depth_position: usize = 0;

    while (it.next()) |line| {
        var line_tokens = mem.split(u8, line, " ");

        const direction = line_tokens.next();
        const units = try fmt.parseInt(u8, line_tokens.next().?, 10);

        if (mem.eql(u8, direction.?, "forward")) {
            horizontal_position += units;
        } else if (mem.eql(u8, direction.?, "down")) {
            depth_position += units;
        } else if (mem.eql(u8, direction.?, "up")) {
            depth_position -= units;
        }
    }

    return horizontal_position * depth_position;
}

fn part_two(it: *mem.TokenIterator(u8)) !usize {
    var horizontal_position: usize = 0;
    var depth_position: usize = 0;
    var aim: usize = 0;

    while (it.next()) |line| {
        var line_tokens = mem.split(u8, line, " ");

        const direction = line_tokens.next();
        const units = try fmt.parseInt(u8, line_tokens.next().?, 10);

        if (mem.eql(u8, direction.?, "forward")) {
            horizontal_position += units;
            depth_position += aim * units;
        } else if (mem.eql(u8, direction.?, "down")) {
            aim += units;
        } else if (mem.eql(u8, direction.?, "up")) {
            aim -= units;
        }
    }

    return horizontal_position * depth_position;
}
