const std = @import("std");
// const input = @embedFile("example.txt");
const input = @embedFile("input.txt");

const Command = enum {
    forward,
    up,
    down,
};

pub fn main() !void {
    // split by newline and space to get command and numeric value
    var it = std.mem.tokenize(u8, input, "\n ");

    var horz: usize = 0;
    var depth: usize = 0;

    while (it.next()) |direction| {
        // parse next token to get numeric value
        const val = try std.fmt.parseInt(usize, it.next().?, 10);

        switch(std.meta.stringToEnum(Command, direction).?) {
            .forward => { horz += value; },
            .up => { depth -= value; },
            .down => { depth += value; },
        }
    }

    std.debug.print("result: {}\n", .{horz * depth});
}
