<div align="center">
  <h1>fork-join-deep</h1>
  <p>Like RxJS forkJoin operator, but deep traversal of the source.</p>
</div>

---

[![Build Status](https://travis-ci.com/ystarlongzi/forkJoinDeep.svg?branch=main)](https://travis-ci.com/ystarlongzi/forkJoinDeep)
[![codecov](https://codecov.io/gh/ystarlongzi/forkJoinDeep/branch/main/graph/badge.svg?token=Z3JXUC3XLK)](https://codecov.io/gh/ystarlongzi/forkJoinDeep)
[![MIT license](https://img.shields.io/github/license/ystarlongzi/forkJoinDeep)](https://github.com/ystarlongzi/forkJoinDeep/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


## Installation
```
npm i --save fork-join-deep
```

## Feature
### 1. Support primitive values
#### ❌ forkJoin
``` javascript
forkJoin({
  a: 0,
}).subscribe((result) => {
  console.log(result);
  // ↓↓↓ output ↓↓↓
  // Error: You provided '0' where a stream was expected.
  // You can provide an Observable, Promise, Array, or Iterable.
});
```

#### ✅ forkJoinDeep
``` javascript
forkJoinDeep({
  a: 0,
}).subscribe((result) => {
  console.log(result);
  // ↓↓↓ output ↓↓↓
  // {a: 0}
});
```

### 2. Support nested objects
#### ❌ forkJoin
``` javascript
forkJoin({
  a: {
    a1: of(0),
  },
}).subscribe((result) => {
  console.log(result);
  // ↓↓↓ output ↓↓↓
  // Error: You provided '0' where a stream was expected.
  // You can provide an Observable, Promise, Array, or Iterable.
});
```

#### ✅ forkJoinDeep
``` javascript
forkJoinDeep({
  a: {
    a1: of(0),
  },
}).subscribe((result) => {
  console.log(result);
  // ↓↓↓ output ↓↓↓
  // {a: a1: {0}}
});
```


### 3. Support Higher-order Observables
#### ❌ forkJoin
``` javascript
forkJoin({
  a: of(of(0)),
}).subscribe((result) => {
  console.log(result);
  // ↓↓↓ output ↓↓↓
  // {a: Observable}
});
```

#### ✅ forkJoinDeep
``` javascript
forkJoinDeep({
  a: of(of(0)),
}).subscribe((result) => {
  console.log(result);
  // ↓↓↓ output ↓↓↓
  // {a: 0}
});
```

## LICENSE

MIT

