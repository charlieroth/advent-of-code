const std = @import("std");

pub fn part_one() !void {
    const input = @embedFile("part_one.txt");
    var it = std.mem.tokenize(u8, input, "\n");
    var last: usize = std.math.maxInt(usize);
    var increments: usize = 0;

    while (it.next()) |line| {
        const n = try std.fmt.parseInt(usize, line, 10);
        if (n > last) increments += 1;
        last = n;
    }

    std.debug.print("part one result: {}\n", .{increments});
}

pub fn part_two() !void {
    const input = @embedFile("part_one.txt");
    var it = std.mem.tokenize(u8, input, "\n");

    // initial window
    var window: [3]usize = .{
        try std.fmt.parseInt(usize, it.next().?, 10),
        try std.fmt.parseInt(usize, it.next().?, 10),
        try std.fmt.parseInt(usize, it.next().?, 10),
    };
    
    // initial sum
    var prev = window[0] + window[1] + window[2];
    var increments: usize = 0;
    while (it.next()) |line| {
        // "shift" window
        window[0] = window[1];
        window[1] = window[2];
        window[2] = try std.fmt.parseInt(usize, line, 10);

        // current window sum
        var curr = window[0] + window[1] + window[2];
        if (curr > prev) increments += 1;

        prev = curr;
    }
    std.debug.print("part two result: {}\n", .{increments});
}

pub fn main() !void {
    try part_one();
    try part_two();
}
