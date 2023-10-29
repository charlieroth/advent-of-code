const std = @import("std");

const fmt = std.fmt;
const heap = std.heap;
const mem = std.mem;
const debug = std.debug;
const testing = std.testing;

const ArrayList = std.ArrayList;
const SplitIterator = mem.SplitIterator;

pub const Square = struct { num: u8, found: bool };

const Board = struct {
    won: bool = false,
    data: [5][5]Square = undefined,

    pub fn count_score(self: *Board, num: u8) usize {
        _ = self;
        _ = num;
        return 0;
    }
};

const input = @embedFile("inputs/day04.txt");

pub fn parse_nums(allocator: mem.Allocator, nums_str: []const u8) !ArrayList(i32) {
    var nums: ArrayList(i32) = ArrayList(i32).init(allocator);
    var tokens: mem.TokenIterator(u8) = mem.tokenize(u8, nums_str, ",");
    while (tokens.next()) |token| {
        const parsedToken: i32 = try fmt.parseInt(i32, token, 10);
        try nums.append(parsedToken);
    }
    return nums;
}

pub fn parse_board(board_str: []const u8) !Board {
    var board: Board = Board{};
    var board_nums = std.mem.tokenize(u8, board_str, " \n");
    var i: usize = 0;
    while (i < 5) : (i += 1) {
        var j: usize = 0;
        while (j < 5) : (j += 1) {
            board.data[i][j] = Square{
                .num = try std.fmt.parseInt(u8, board_nums.next().?, 10),
                .found = false,
            };
        }
    }
    return board;
}

pub fn parse_boards(allocator: mem.Allocator, it: SplitIterator(u8)) !ArrayList(Board) {
    var boards = std.ArrayList(Board).init(allocator);
    while (it.next()) |board_str| {
        const board = try parse_board(board_str);
        try boards.append(board);
    }
    return boards;
}

test "part one" {
    const allocator = testing.allocator;

    var it: mem.SplitIterator(u8) = mem.split(u8, input, "\n\n");
    const nums_str: []const u8 = it.next().?;

    var nums: ArrayList(i32) = try parse_nums(allocator, nums_str);
    defer nums.deinit();

    var boards: ArrayList(Board) = try parse_boards(allocator, it);
    defer boards.deint();

    try testing.expect(true);
}
