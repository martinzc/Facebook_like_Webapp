import { expect } from 'chai'
import particle from './particle'
import canvasSize from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        const [x, y] = position
        expect(x).to.equal(1.5)
        expect(y).to.equal(0.5)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        const [x, y] = position
        expect(x).to.equal(2.0)
        expect(y).to.equal(0.0)
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5], acceleration: [1, 1] })
        const { velocity } = update(p, 1.0) // dt is different here
        const [x, y] = velocity
        expect(x).to.equal(1.5)
        expect(y).to.equal(0.5)
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        const p1 = particle({ position: [10, 801], velocity: [0, 1] })
        var { position } = update(p1, 1.0)
        var [x, y] = position
        expect(y).to.be.below(800)
        expect(y).to.be.at.least(0)

        const p2 = particle({ position: [10, -1], velocity: [0, 1] })
        var { position } = update(p2, 1.0)
        var [x, y] = position
        expect(y).to.be.below(800)
        expect(y).to.be.at.least(0)

        const p3 = particle({ position: [801, 10], velocity: [1, 0] })
        var { position } = update(p3, 1.0)
        var [x, y] = position
        expect(x).to.be.below(800)
        expect(x).to.be.at.least(0)

        const p4 = particle({ position: [-1, 10], velocity: [1, 0] })
        var { position } = update(p4, 1.0)
        var [x, y] = position
        expect(x).to.be.below(800)
        expect(x).to.be.at.least(0)
    })

})
