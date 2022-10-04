import { describe, expect, it } from 'vitest'
import findRoot, { BisectionMethodLogLevel } from "src/main"

describe('findZeros', () => {
    it.concurrent('Can find the root of ln(x)', async () => {
        const f = (x: number): number => Math.log(x)

        const result = findRoot(f, 0, 3)

        expect(result).to.equal(1)
    })

    it.concurrent('Can find the positive root of x**2+x-5', async () => {
        const f = (x: number): number => x**2+x-5

        const result = findRoot(f, 0, 5)

        // Expected: sqrt(21)/2 - 1/2 = 1.7912878474779200032940235968640042444922282883839859513036210619...
        expect(result).to.equal(1.79128784747792)
    })

    it.concurrent('Can find the negative root of x**2+x-5', async () => {
        const f = (x: number): number => x**2+x-5

        const result = findRoot(f, -5, 0)

        // Expected: -1/2 - sqrt(21)/2 = -2.791287847477920003294023596864004244492228288383985951303621061...
        expect(result).to.equal(-2.79128784747792)
    })

    it.concurrent("Throws when the function value doesn't' have opposite signs at the initial bounds", async () => {
        const f = (x: number): number => -x
        const expectedMessage = "The function value must have opposite signs at the given bounds"

        expect(() => findRoot(f, 1, 2)).to.throw(expectedMessage)
        expect(() => findRoot(f, -2, -1)).to.throw(expectedMessage)
        expect(() => findRoot(f, 0, 1)).to.throw(expectedMessage)
        expect(() => findRoot(f, -1, 0)).to.throw(expectedMessage)
    })

    it.concurrent("Throws when the upper bound is not greater than the lower bound", async () => {
        const f = (x: number): number => x

        expect(() => findRoot(f, 2, 1)).to
            .throw("The upper bound must be greater than the lower bound")
    })

    it.concurrent("Returns an inexact result if it's within tolerance", async () => {
        const f = (x: number): number => x - 1

        const result = findRoot(f, 0, 3, { tolerance: 1 })

        expect(result).to.equal(1.5)
    })

    it.concurrent("Returns null when it gets stuck due to insufficient precision", async () => {
        const f = (x: number): number => {
            if (x === -1) {
                return -1
            }
            if (x === 1) {
                return 1
            }
            else {
                return 2
            }
        }

        const result = findRoot(f, -1, 1)

        expect(result).to.equal(null)
    })

    it.concurrent("Returns null when it fails to converge", async () => {
        const f = (x: number): number => x

        const result = findRoot(f, -1, 1e305, { logging: BisectionMethodLogLevel.results })

        expect(result).to.equal(null)
    })
})
