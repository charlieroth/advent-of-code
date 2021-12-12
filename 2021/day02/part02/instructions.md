## Part 02

In addition to horizontal position and depth, you'll also need to track
a third value `aim`, which starts at 0

`down X` increases your aim by X units.
`up X` decreases your aim by X units.
`forward X` does two things:
- It increases your horizontal position by X units.
- It increases your depth by your aim multiplied by X.

```
          (depth=0, horz=0, aim=0)
forward 5 (depth=0, horz=5, aim=0)
down 5    (depth=0, horz=5, aim=5)
forward 8 (depth=40, horz=13, aim=5)
up 3      (depth=40, horz=13, aim=2)
down 8    (depth=40, horz=13, aim=10)
forward 2 (depth=60, horz=15, aim=10)
```

`result = horz * depth = 15 * 60 = 900`
