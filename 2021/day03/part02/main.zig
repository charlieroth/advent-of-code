const std = @import("std");
const input = @embedFile("example.txt");
// const input = @embedFile("input.txt");

pub fn to_decimal(bits: [5]usize) usize {
    var pow: usize = 4;
    var decimal: usize = 0;
    for (bits) |b| {
        decimal += b * std.math.pow(usize, 2, pow);
        if (pow >= 1) { pow -= 1; }
    }
    return decimal;
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    var alloc = gpa.allocator();
    var num_map = std.StringHashMap(bool).init(alloc);
    var lines = std.mem.tokenize(u8, input, "\n");
    
    // fill map with numbers and mark all as alive
    while (lines.next()) |bits| try num_map.put(bits, true);

    var alive = num_map.count();
    var curr_position = 0;
    while (alive > 1) {
        // Fix most common bit in current position evaluating

        // Remove numbers without most common bit in current position

        // Update alive count
    }
}

