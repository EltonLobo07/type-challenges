/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```

  > View on GitHub: https://tsch.js.org/4499
*/

/* _____________ Your Code Here _____________ */

type IsEmptyTuple<T extends ReadonlyArray<unknown>> =
  T extends readonly []
    ? true
    : false

type Append<
  Input extends ReadonlyArray<unknown>,
  Value,
> = [...Input, Value]

type _Chunk<
  Input extends ReadonlyArray<unknown>,
  Limit extends number,
  Chunks extends Array<unknown> = [],
  Chunk extends Array<unknown> = [],
> =
  Input extends readonly [infer First, ...infer Rest]
    ? Chunk['length'] extends Limit
      ? _Chunk<Rest, Limit, Append<Chunks, Chunk>, [First]>
      : _Chunk<Rest, Limit, Chunks, Append<Chunk, First>>
    : IsEmptyTuple<Chunk> extends true
      ? Chunks
      : Append<Chunks, Chunk>

type Chunk<
  Input extends ReadonlyArray<unknown>,
  Limit extends number,
> = _Chunk<Input, Limit>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4499/answer
  > View solutions: https://tsch.js.org/4499/solutions
  > More Challenges: https://tsch.js.org
*/
