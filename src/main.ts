export enum BisectionMethodLogLevel {
    'none',
    'results' ,
    'verbose',
}

export interface BisectionMethodOptions {
    tolerance: number
    maxIterations: number
    logging: BisectionMethodLogLevel
}

const defaultOptions: BisectionMethodOptions = {
    tolerance: 1e-16,
    maxIterations: 100,
    logging: BisectionMethodLogLevel.none,
}

function haveDifferentSigns(a: number, b: number): boolean {
    return (a > 0 || b > 0) && (a < 0 || b < 0)
}

/**
 * Attempts to find a root of the input function within the boundary interval, using the bisection method
 *
 * @param f the input function
 * @param lb the lower bound on the search interval
 * @param ub the upper bound on the search interval
 * @param options override the default options
 */
export default function findRoot(f: (x: number) => number, lb: number, ub: number, options?: Partial<BisectionMethodOptions>): number | null {
    if (ub <= lb) {
        throw new Error("The upper bound must be greater than the lower bound")
    }
    if (!haveDifferentSigns(f(lb), f(ub))) {
        throw new Error("The function value must have opposite signs at the given bounds")
    }

    const _options = {
        ...defaultOptions,
        ...options,
    }
    // Ensure the passed options aren't used directly by accident
    options = {} as never

    const logResult = (message: string) => {
        if (_options.logging >= BisectionMethodLogLevel.results) {
            console.log(message)
        }
    }
    const logVerbose = (message: string) => {
        if (_options.logging >= BisectionMethodLogLevel.verbose) {
            console.log(message)
        }
    }

    let iteration = 0
    let previousMiddle = lb
    while (iteration < _options.maxIterations) {
        const middle = lb + (ub - lb) / 2
        const functionValue = f(middle)
        logVerbose(`Iteration ${iteration}: lb=${lb}, ub=${ub}. Trying x=${middle}, f(x)=${functionValue}`)

        if (Math.abs(functionValue) < _options.tolerance) {
            logResult(`Converged to: x=${middle} in ${iteration} iterations (the function value was ${functionValue})`)
            return middle
        }

        if (middle === previousMiddle) {
            logResult(`Bisection method failed to converge. Stuck at x=${middle} after ${iteration} iterations. ` +
                "This occurs when the bounds cannot be bisected because the middle is indistinguishable from the " +
                "bounds due to the Javascript Number type's limited precision. " +
                "Double check that there actually exists a root in the provided interval")
            return null
        }

        if (haveDifferentSigns(f(lb), functionValue)) {
            logVerbose("\tThe root is in the lower half")
            ub = middle
        } else {
            logVerbose("\tThe root is in the upper half")
            lb = middle
        }

        previousMiddle = middle
        iteration++
    }

    logResult(`Bisection method failed to converge in ${iteration} iterations`)
    return null
}
