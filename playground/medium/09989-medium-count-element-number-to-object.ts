/*
  9989 - Count Element Number To Object
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:

  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  // return {
  //   1: 1,
  //   2: 1,
  //   3: 1,
  //   4: 1,
  //   5: 1
  // }

  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  // return {
  //   1: 2,
  //   2: 2,
  //   3: 2,
  //   4: 1,
  //   5: 1
  // }
  ~~~

  > View on GitHub: https://tsch.js.org/9989
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

type Merge<
  T1,
  T2,
> = {
  [K in (keyof T1 | keyof T2)]: K extends keyof T2 ? T2[K] : K extends keyof T1 ? T1[K] : never
}

type Flatten<T extends ReadonlyArray<any>> =
  T extends readonly [infer First, ...infer Rest]
    ? IsNever<First> extends true
      ? [First, ...Flatten<Rest>]
      : [...(First extends ReadonlyArray<any> ? Flatten<First> : [First]), ...Flatten<Rest>]
    : T

type IsNever<T> = [T] extends [never] ? true : false

type _CountElementNumberToObject<
  T extends ReadonlyArray<any>,
  Obj extends Record<PropertyKey, number> = { },
> =
  T extends readonly [infer First, ...infer Rest extends Array<any>]
    ? IsNever<First> extends true
      ? { }
      : First extends PropertyKey
        ? _CountElementNumberToObject<Rest, Merge<Obj, Record<First, First extends keyof Obj ? AddOne<Obj[First]> : 1>>>
        : { }
    : Obj

type CountElementNumberToObject<T extends ReadonlyArray<any>> = _CountElementNumberToObject<Flatten<T>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  }
  >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/
