## Part 1

This report indicates that, scanning outward from the submarine, the sonar
sweep found depths of `199, 200, 208, 210` and so on:

```
199 (n/a)
200 (increased)
208 (increased)
210 (increased)
200 (decreased)
207 (increased)
240 (increased)
269 (increased)
260 (decreased)
263 (increased)
```

The first order of business is to figure out how quickly the
depth increases

To do this count the number of times a depth measurement increases
from the previous measurement

## Part 2

Consider sums of a three-measurement sliding window

```
199  A      
200  A B    
208  A B C  
210    B C D
200  E   C D
207  E F   D
240  E F G  
269    F G H
260      G H
263        H
```

First window, marked A (199, 200, 208); its sum is 607

Second window, marked B (200, 208, 210); its sum is 618

Your goal now is to count the number of times the sum of measurements in
this sliding window increases from the previous sum

Compare A with B, then compare B with C, then C with D, and so on stop
when there aren't enough measurements left to create a new
three-measurement sum

```
A: 607
B: 618 (increased)
C: 618 (no change)
D: 617 (decreased)
E: 647 (increased)
F: 716 (increased)
G: 769 (increased)
H: 792 (increased)

result: 5
```
