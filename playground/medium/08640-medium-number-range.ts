/*
  8640 - Number Range
  -------
  by AaronGuo (@HongxuanG) #medium

  ### Question

  Sometimes we want to limit the range of numbers...
  For examples.
  ```ts
  type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  ```

  > View on GitHub: https://tsch.js.org/8640
*/

/* _____________ Your Code Here _____________ */

type ToString<T extends number> = `${T}`

type ToNum<T extends string> = T extends `${infer Num extends number}` ? Num : never

type Reverse<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : T

type AddOneMp = {
  '0': '1'
  '1': '2'
  '2': '3'
  '3': '4'
  '4': '5'
  '5': '6'
  '6': '7'
  '7': '8'
  '8': '9'
  '9': '0'
}

type _AddOne<
  T extends string,
  Carry extends string = '0',
> =
  T extends `${infer First extends keyof AddOneMp}${infer Rest}`
    ? `${AddOneMp[First]}${First extends '9' ? _AddOne<Rest, '1'> : Rest}`
    : Carry extends '0'
      ? ''
      : '1'

// Assume `T` is always a positive number
type AddOne<T extends number> = ToNum<Reverse<_AddOne<Reverse<ToString<T>>>>>

type _NumberRange<
  L extends number,
  R extends number,
  Acc extends number = never,
> =
  L extends R
    ? Acc | L
    : _NumberRange<AddOne<L>, R, Acc | L>

type NumberRange<
  L extends number,
  R extends number,
> = _NumberRange<L, R>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type Result1 = | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = | 0 | 1 | 2
type Result3 =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60
  | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70
  | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80
  | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90
  | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
  | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110
  | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120
  | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130
  | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8640/answer
  > View solutions: https://tsch.js.org/8640/solutions
  > More Challenges: https://tsch.js.org
*/
