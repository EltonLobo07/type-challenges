/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #medium #array

  ### Question

  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

  For example:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > View on GitHub: https://tsch.js.org/459
*/

/* _____________ Your Code Here _____________ */

// My solution
type MyFlatten<
  TArr extends ReadonlyArray<any>,
  TIdx extends ReadonlyArray<unknown> = [],
  TRes extends ReadonlyArray<any> = [],
> =
  TIdx['length'] extends TArr['length']
    ? TRes
    : TArr[TIdx['length']] extends ReadonlyArray<any>
      ? [...TRes, ...MyFlatten<TArr[TIdx['length']], [], []>, ...MyFlatten<TArr, [...TIdx, unknown], []>]
      : MyFlatten<TArr, [...TIdx, unknown], [...TRes, TArr[TIdx['length']]]>

// Best solution
type Flatten<T extends ReadonlyArray<any>> =
  T extends [infer THead, ...infer TTail]
    ? THead extends ReadonlyArray<any>
      ? [...Flatten<THead>, ...Flatten<TTail>]
      : [THead, ...Flatten<TTail>]
    : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/
