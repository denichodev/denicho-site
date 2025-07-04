---
title: Regression testing page
date: 2024-04-01
tags:
  - meta
---
# This is an H1

## This is an H2

An image of Boba.
<figure>
  <img
    width="320"
    src="{{ metadata.cloudfront }}/boba.jpg"
    alt="A gray cat with long fur."
  >
  <figcaption>♥ of my life.</figcaption>
</figure>


This is a hyperlink to my [old page](https://denicho-dev-deni-chos-projects.vercel.app).


This is a JavaScript code
```js
const x = 5;

function addWith5(num) {
  return num + 5;
}

console.log(addWith5(x));
```

This is a TypeScript code.
```ts
const x: number = 5;

const addWith5 = (num: number): number => {
  return num + 5;
}

console.log(addWith5(x))
```

This is a React (JSX) + TypeScript code.
```jsx
type Props = {
  num: number;
}

const MyComponent<React.FC<Props>> = ({ num }) => {
  return <div>{num}</div>
}
```