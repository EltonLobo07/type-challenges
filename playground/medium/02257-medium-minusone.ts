/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

type MinusMap = {
  '0': '-1'
  '1': '0'
  '2': '1'
  '3': '2'
  '4': '3'
  '5': '4'
  '6': '5'
  '7': '6'
  '8': '7'
  '9': '8'
}

type MinusMapExceptZero = Omit<MinusMap, '0'>

type IsGenericNumber<T extends number> =
  number extends T
    ? true
    : false

type InternalMinusOne<T extends string> =
  T extends `${infer TFirst}${infer TRest}`
    ? TFirst extends keyof MinusMapExceptZero
      ? `${MinusMapExceptZero[TFirst]}${TRest}`
      : `9${InternalMinusOne<TRest>}`
    : T extends keyof MinusMap
      ? MinusMap[T]
      : never

type ToString<T extends number> = `${T}`

type ToNumber<T extends string> =
  T extends `${infer TNum extends number}`
    ? TNum
    : never

type Reverse<T extends string> =
  T extends `${infer TFirst}${infer TRest}`
    ? `${Reverse<TRest>}${TFirst}`
    : T

type InternalRemoveLeadingZeros<T extends string> =
  T extends `0${infer TRest}`
    ? InternalRemoveLeadingZeros<TRest>
    : T

type RemoveLeadingZeros<T extends string> =
  T extends '0'
    ? T
    : InternalRemoveLeadingZeros<T>

type MinusOne<T extends number> =
  IsGenericNumber<T> extends true
    ? T
    : T extends 0
      ? -1
      : ToNumber<RemoveLeadingZeros<Reverse<InternalMinusOne<Reverse<ToString<T>>>>>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
  // My test cases
  Expect<Equal<MinusOne<number>, number>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
