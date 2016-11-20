
export function makeKey(input) {
	return input.toLowerCase().trim().replace(/\s/g, '');
}