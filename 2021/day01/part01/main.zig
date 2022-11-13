const std = @import("std");
const input = @embedFile("input.txt");
// const input = @embedFile("example.txt");

pub fn main() !void {
    var it = std.mem.tokenize(u8, input, "\n");

    var last: usize = std.math.maxInt(usize);
    var increments: usize = 0;
    while (it.next()) |line| {
        const n = try std.fmt.parseInt(usize, line, 10);
        if (n > last) increments += 1;
        last = n;
    }

    std.debug.print("result: {}\n", .{increments});
}
