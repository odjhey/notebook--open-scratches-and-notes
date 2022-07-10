> https://www.youtube.com/watch?v=Nrp_LZ-XGsY

problems to solve (pattern?)
1. composition
2. how to combine things (combination/aggregation)
3. iteration
4. working with effects
  - mix effects and non-effects
  - chain effects
  - working with effect in parallel
  - pulling effects out of a list

tools for problems (function names)
1. composition: `compose` (also `pipe`??)
2. how to combine things (combination/aggregation): `combine & reduce`
3. iteration: `fold`
4. working with effects
  - mix effects and non-effects: `map & return`
  - chain effects: `bind & flatMap`
  - working with effect in parallel: `apply & zip`
  - pulling effects out of a list: `sequence & traverse`

jargons
1. composition: `compose` (also `pipe`??)
2. how to combine things (combination/aggregation): `combine & reduce` --> Monoid
3. iteration: `fold`
4. working with effects
  - mix effects and non-effects: `map & return` --> Functor
  - chain effects: `bind & flatMap` --> Monad
  - working with effect in parallel: `apply & zip` --> Applicative
  - pulling effects out of a list: `sequence & traverse`



--1-- monoids

(Monoid) properties
- start with a bunch of things, and some way of combining them two at a time
- rule 1 (Closure): result of combining two things is always another one of the thing
- rule 2 (Associativity): when combining more than two things, which pairwise combination you do first doesn't matter.
- rule 3 (Identity Element): there is a special thing such that when you combine any thing with it, you get the original thing back, 0 for +, 1 for x, "" for concat, [] for list.concat


monoids
- int is a monoid
- float is a monoid
- composite pattern is a monoid
- nulll object pattern is a monoid
- composable commands is a monoid
- closure of operations (DDD) is a monoid
- int -> int is a monoid, also T -> T is a monoid???

Monoid Summary
- a set of valus and a combining function:
  combine (aka concat, plus, <>, <+>)



--2-- effects (functors)
Working with effects

```javascript
import { option, array } from "fp-ts";

const adder = (a: number) => a + 1;

const res  = option.map(adder)(option.some(2));
const res2 = array.map(adder)([1, 2, 3]);
```

Functor
- an effect type
  - e.g. Option<>, List<>, Async<>, State<>
- a `map` function that "lifts" a function to the effects world
  - map aka select, lift, fmap
- sensible implementation (aka the Functor laws)

--3-- effects (return)
moving values (not functions) between worlds with "return"
```
let x = 4
let xOption = Some x

let v = 3
let vList = [v]
```

--4-- crossing worlds with "bind" (monads)
*world crossing functions*
sampols
```
// num -> num[]
let range num = [1...num]

// CustomerId -> Option<CustomerData>
```

A monad is
1. an effect type, Option<>, List<>, Async<>
2. plus a return function aka `pure` `unit`
3. plus a `bind` function that converts a "diagonal" (world-crossing) function into a "horizontal" (E-world-only) function
   - aka `bind` `>>=` flatMap SelectMany
4. and bind/return must have sensible implementations (aka the Monad laws)
 
--5-- combining effects (applicatives)

applicative functor is
1. an effect type
2. plus a return function
3. plug a function that conbimes two effects into one
   - i.e. cartesian product of 2 arrays
4. and apply/return must have sensible implementations
  - aka the Applicative Functor laws



Q: reread on applicatives (how to implement one)
Q: DTO?


--finally sampol--
```
let processCustomerDto jsonOrError =
  jsonOrError
  |> Result.bind decodeCustomerDto
  |> Result.bind createValidCustomer

let downloadAndStoreCustomer url =
  url
  |> downloadFile
  |> Async.map processCustomerDto
  |> AsyncResult.bind storeCustomer


// my guess on the types

downloadFile url => AsyncResult<json>
decodeCustomerDto json => Result<CustomerDto>
createValidCustomer CustomerDto => Result<Customer>
storeCustomer Customer => AsyncResult<Customer>

```


A: what are DTOs? (Data Transfer Objects)
Data objects, different from DAO
from wiki: DTO does not have any behavior except for storage, retrieval, serialization and deserialization of its own data

see DAO: a data access object (DAO) is a pattern that provides an abstract interface to some type of database or other persistence mechanism. 

