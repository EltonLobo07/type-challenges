/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */

type _ToLength<T extends number, TCount extends ReadonlyArray<1> = []> =
  TCount['length'] extends T
    ? TCount
    : _ToLength<T, [...TCount, 1]>

type ToLength<T extends number> = _ToLength<T>

type Add<TOp1 extends number, TOp2 extends number> =
  [...ToLength<TOp1>, ...ToLength<TOp2>]['length']

type _Fibonacci<
  T extends number,
  TCount extends ReadonlyArray<1> = [1],
  TFirst extends number = 0,
  TSecond extends number = 1,
> =
  TCount['length'] extends T
    ? TSecond
    : Add<TFirst, TSecond> extends number
      ? _Fibonacci<T, [...TCount, 1], TSecond, Add<TFirst, TSecond>>
      : never

type Fibonacci<T extends number> =
  number extends T
    ? number
    : 0 extends T
      ? 1
      : `${T}` extends `-${number}`
        ? 1
        : _Fibonacci<T>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
