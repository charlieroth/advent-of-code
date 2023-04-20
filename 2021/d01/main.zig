const std = @import("std");

const input = @embedFile("input.txt");

pub fn main() !void {
    var it = std.mem.tokenize(u8, input, "\n");
    var part_one_solution = try part_one(&it);
    std.debug.print("part one: {}\n", .{part_one_solution});

    it = std.mem.tokenize(u8, input, "\n");
    var part_two_solution = try part_two(&it);
    std.debug.print("part two: {}\n", .{part_two_solution});
}

fn part_one(it: *std.mem.TokenIterator(u8)) !usize {
    var prev: usize = std.math.maxInt(usize);
    var increments: usize = 0;
    while (it.next()) |line| {
        const curr = try std.fmt.parseInt(usize, line, 10);
        if (curr > prev) {
            increments += 1;
        }
        prev = curr;
    }

    return increments;
}

fn part_two(it: *std.mem.TokenIterator(u8)) !usize {
    var increments: usize = 0;

    var window: [3]usize = .{
        try std.fmt.parseInt(usize, it.next().?, 10),
        try std.fmt.parseInt(usize, it.next().?, 10),
        try std.fmt.parseInt(usize, it.next().?, 10),
    };
    var prev_sum = window[0] + window[1] + window[2];

    while (it.next()) |line| {
        window[0] = window[1];
        window[1] = window[2];
        window[2] = try std.fmt.parseInt(usize, line, 10);
        var curr_sum = window[0] + window[1] + window[2];

        if (curr_sum > prev_sum) {
            increments += 1;
        }

        prev_sum = curr_sum;
    }

    return increments;
}
