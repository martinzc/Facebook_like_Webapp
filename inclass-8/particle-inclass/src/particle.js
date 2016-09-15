const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
	var [accX, accY] = acceleration
	var [velX, velY] = velocity
	var [x, y] = position
	velX = velX + delta * accX
	velY = velY + delta * accY
	x = (x + velX * delta + (1/2) * accX * Math.pow(delta, 2)) % 800
	y = (y + velY * delta + (1/2) * accY * Math.pow(delta, 2)) % 800
	const newVelocity = [velX, velY]
	const newPosition = [x, y]
    return { mass: mass, acceleration: acceleration, velocity: newVelocity, position: newPosition }
}

const canvasSize = 800;

export default particle

export {canvasSize}

export { update }
