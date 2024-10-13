defmodule ChallengeResult do
  @type t :: %__MODULE__{
          part_one: number(),
          part_two: number()
        }

  @enforce_keys [:part_one, :part_two]
  defstruct [:part_one, :part_two]
end
