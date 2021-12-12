# Part 01

`forward X` increases the horizontal position by X units.
`down X` increases the depth by X units.
`up X` decreases the depth by X units.

horizontal and depth values start at 0

```
forward 5 (depth=0,horz=5)
down 5    (depth=5,horz=5)
forward 8 (depth=5,horz=13)
up 3      (depth=2,horz=13)
down 8    (depth=10,horz=13)
forward 2 (depth=10,horz=15)
```

The solution can be calculated by multiplying depth by horizontal position

`10 * 15 = 150`

