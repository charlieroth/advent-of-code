## Part 02

Life Support Rating can be determined by multiplying the Oxygen
Generator Rating by the CO2 Scrubber Rating

Start with the full list of binary numbers from your diagnostic report
and consider just the first bit of those numbers:
- Keep only numbers selected by the bit criteria for the type of rating value for which you are searching. Discard numbers which do not match the bit criteria.
- If you only have one number left, stop; this is the rating value for which you are searching.
- Otherwise, repeat the process, considering the next bit to the right

Bit Criteria:
- Oxygen Generator Rating
 - Determine most common value in the current position
 - Keep only numbers with that bit in that position
 - If 0 and 1 are equally common, keep values with a 1 in the position being considered
- CO2 Scrubber Rating
 - Determine least common value in the current position
 - Keep only numbers with that bit in the position
 - If 0 and 1 are equally common, keep values with a 0 in the position being considered
