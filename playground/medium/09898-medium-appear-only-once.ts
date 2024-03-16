/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，ouput: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

type Or<
  Op1 extends boolean,
  Op2 extends boolean,
> =
  Op1 extends true
    ? true
    : Op2

type Extends<
  Sub,
  Super,
> =
  Sub extends Super
    ? true
    : false

type _FindEles<
  T extends ReadonlyArray<any>,
  Res extends Array<any> = [],
  Seen = never,
> =
  T extends [...infer Rest, infer Last]
    ? _FindEles<Rest, Or<Extends<Last, Seen>, Extends<Last, Rest[number]>> extends true ? Res : [Last, ...Res], Seen | Last>
    : Res

type FindEles<T extends ReadonlyArray<any>> = _FindEles<T>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9898/answer
  > View solutions: https://tsch.js.org/9898/solutions
  > More Challenges: https://tsch.js.org
*/
