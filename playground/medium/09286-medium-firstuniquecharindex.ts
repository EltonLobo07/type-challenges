/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type IsPresent<
  Ch extends string,
  Str extends string,
> =
  Str extends `${infer First}${infer Rest}`
    ? First extends Ch
      ? true
      : IsPresent<Ch, Rest>
    : false

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

type _FirstUniqueCharIndex<
  T extends string,
  Seen extends string = never,
  Idx extends ReadonlyArray<1> = [],
> =
  T extends `${infer First}${infer Rest}`
    ? Or<Extends<First, Seen>, IsPresent<First, Rest>> extends true
      ? _FirstUniqueCharIndex<Rest, Seen | First, [...Idx, 1]>
      : Idx['length']
    : -1

type FirstUniqueCharIndex<T extends string> = _FirstUniqueCharIndex<T>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
