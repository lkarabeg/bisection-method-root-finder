# Bisection method root finder

Attempts to find a root of an input function within a given boundary interval, using the 
[bisection method](https://en.wikipedia.org/wiki/Bisection_method).

To work, it requires that the function values have opposite signs at each end of the boundary
interval, and that there is only one root within the interval.

## Install

````sh
npm install @lkarabeg/bisection-method
````

## Use

````typescript
import findRoot, { BisectionMethodLogLevel } from "@lkarabeg/bisection-method"

const myFunction = (x: number) => Math.log(x)

const lowerBound = 0
const upperBound = 3
const options = { logging: BisectionMethodLogLevel.results }

const result = findRoot(myFunction, lowerBound, upperBound, options)
console.log(result) // 1
````
## Options

| Option        | Type   | Default           | Comment                                                                                                    |
|---------------|--------|-------------------|------------------------------------------------------------------------------------------------------------|
| tolerance     | number | 1e-16             |                                                                                                            |
| maxIterations | number | 100               |                                                                                                            |
| logging       | enum   | none (no logging) | Set the log level to none (default), results or debug. <br/>Import the BisectionMethodLogLevel enum to use |

