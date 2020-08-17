//turn polar coords to Cartesian
export function polar(radius, degrees) {
	const radians = degrees * Math.PI / 180;
	return [radius * Math.cos(radians), radius * Math.sin(radians)];
}