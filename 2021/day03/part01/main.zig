const std = @import("std");
// const input = @embedFile("example.txt");
const input = @embedFile("input.txt");

pub fn to_decimal(bits: [12]usize) usize {
    var pow: usize = 11;
    var decimal: usize = 0;
    for (bits) |b| {
        decimal += b * std.math.pow(usize, 2, pow);
        if (pow >= 1) { pow -= 1; }
    }

    return decimal;
}

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
    for (counts) |count, index| {
        if (count > 0) { gamma_bits[index] = 1; }
        else { epsilon_bits[index] = 1; }
    }

    // convert to decimal numbers
    var gamma = to_decimal(gamma_bits);
    var epsilon = to_decimal(epsilon_bits); 
    std.debug.print("result: {}\n", .{epsilon * gamma});
}
