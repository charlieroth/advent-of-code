const std = @import("std");
// const input = @embedFile("input.txt");
const input = @embedFile("example.txt");

pub fn main() !void {
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
    std.debug.print("result: {}\n", .{increments});
}
