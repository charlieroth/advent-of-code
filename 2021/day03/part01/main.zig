const std = @import("std");
// const input = @embedFile("example.txt");
const input = @embedFile("input.txt");

pub fn main() !void {
    var lines = std.mem.tokenize(u8, input, "\n");

    // create array of counts
    var counts = [1]isize{0} ** 12;
    // var counts = [1]isize{0} ** 5;
    while (lines.next()) |bits| {
        for (bits) |bit, index| {
            counts[index] += switch(bit) {
                '1' => @as(isize, 1),
                '0' => @as(isize, -1),
                else => unreachable,
            };
        }
    }

    // create arrays that represent gamma and epsilon binary numbers
    var epsilon_bits = [1]usize{0} ** 12;
    var gamma_bits = [1]usize{0} ** 12;
    // var epsilon_bits = [1]usize{0} ** 5;
    // var gamma_bits = [1]usize{0} ** 5;
    for (counts) |count, index| {
        if (count > 0) { gamma_bits[index] = 1; }
        else { epsilon_bits[index] = 1; }
    }

    // convert to decimal numbers
    var pow: usize = 11;
    // var pow: usize = 4;
    var gamma: usize = 0;
    for (gamma_bits) |b| {
        gamma += b * std.math.pow(usize, 2, pow);
        if (pow >= 1) { pow -= 1; }
    }
    
    pow = 11;
    // pow = 4;
    var epsilon: usize = 0;
    for (epsilon_bits) |b| {
        epsilon += b * std.math.pow(usize, 2, pow);
        if (pow >= 1) { pow -= 1; }
    }

    std.debug.print("result: {}\n", .{epsilon * gamma});
}
